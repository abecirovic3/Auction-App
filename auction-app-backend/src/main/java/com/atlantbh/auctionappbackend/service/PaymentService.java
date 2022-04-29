package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.Product;
import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.atlantbh.auctionappbackend.request.PayIntentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.Customer;
import com.stripe.model.checkout.Session;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {
    private final UserRepository userRepository;
    private final ProductService productService;

    @Value("${STRIPE_API_KEY}")
    String stripeApiKey;

    @Value("${CLIENT_BASE_URL}")
    String clientBaseUrl;

    @Autowired
    public PaymentService(UserRepository userRepository, ProductService productService) {
        this.userRepository = userRepository;
        this.productService = productService;
    }

    public Map<String, String> createAccountLink(Long id) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User with id " + id + " doesn't exist"
            );
        }

        User user = userOptional.get();

        Account account = findOrCreateStripeAccount(user);

        AccountLinkCreateParams params =
                AccountLinkCreateParams
                        .builder()
                        .setAccount(account.getId())
                        .setRefreshUrl(clientBaseUrl + "/stripe-onboarding-refresh")
                        .setReturnUrl(clientBaseUrl + "/stripe-onboarding-return")
                        .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                        .setCollect(AccountLinkCreateParams.Collect.EVENTUALLY_DUE)
                        .build();

        AccountLink accountLink = AccountLink.create(params);

        Map<String, String> res = new HashMap<>();
        res.put("url", accountLink.getUrl());

        return res;
    }

    private Account findOrCreateStripeAccount(User user) throws StripeException {
        Account account;

        if (user.getStripeAccId() == null) {
            AccountCreateParams params =
                    AccountCreateParams
                            .builder()
                            .setType(AccountCreateParams.Type.EXPRESS)
                            .setEmail(user.getEmail())
                            .setCountry("US")
                            .build();

            account = Account.create(params);

            user.setStripeAccId(account.getId());
            userRepository.save(user);
        } else {
            account = Account.retrieve(user.getStripeAccId());
        }

        return account;
    }

    public Map<String, Boolean> isOnboardingProcessComplete(Long id) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Optional<User> userOptional = userRepository.findById(id);

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User with id " + id + " doesn't exist"
            );
        }

        User user = userOptional.get();

        if (user.getStripeAccId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "User with id " + id + " doesn't have Stripe account"
            );
        }

        Account account = Account.retrieve(user.getStripeAccId());

        account.getDetailsSubmitted();

        Map<String, Boolean> res = new HashMap<>();
        res.put("charges-enabled", account.getChargesEnabled());
        res.put("details-submitted", account.getDetailsSubmitted());

        return res;
    }

    public Map<String, String> createCheckoutSession(PayIntentRequest payIntentRequest) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Product product = productService.getProductOverview(payIntentRequest.getProduct().getId());

        validateProduct(product, payIntentRequest);

        Optional<User> userOptional = userRepository.findById(payIntentRequest.getBuyer().getId());

        if (userOptional.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Buyer doesn't exist"
            );
        }

        User buyer = userOptional.get();

        Customer customer = findOrCreateStripeCustomer(buyer);

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount((long) (product.getHighestBid() * 100))
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(product.getName())
                                                                .build())
                                                .build())
                                        .setQuantity(1L)
                                        .build())
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/shop/product-overview/" + product.getId() + "?session_id={CHECKOUT_SESSION_ID}")
                        .setCancelUrl("http://localhost:3000/shop/product-overview/" + product.getId())
                        .setCustomer(customer.getId())
                        .setPaymentIntentData(
                                SessionCreateParams.PaymentIntentData.builder()
                                        .putMetadata("product_id", product.getId().toString())
                                        .setSetupFutureUsage(SessionCreateParams.PaymentIntentData.SetupFutureUsage.ON_SESSION)
                                        .setOnBehalfOf(product.getSeller().getStripeAccId())
                                        .setTransferData(
                                                SessionCreateParams.PaymentIntentData.TransferData.builder()
                                                        .setDestination(product.getSeller().getStripeAccId())
                                                        .build())
                                        .build())
                        .build();

        Session session = Session.create(params);

        Map<String, String> res = new HashMap<>();
        res.put("url", session.getUrl());
        return res;
    }

    private Customer findOrCreateStripeCustomer(User buyer) throws StripeException {
        Customer customer;
        if (buyer.getStripeCusId() == null) {
            Map<String, Object> params = new HashMap<>();
            params.put("email", buyer.getEmail());
            params.put("name", buyer.getFullName());

            customer = Customer.create(params);

            buyer.setStripeCusId(customer.getId());
            userRepository.save(buyer);
        } else {
            customer = Customer.retrieve(buyer.getStripeCusId());
        }
        return customer;
    }

    private void validateProduct(Product product, PayIntentRequest payIntentRequest) {
        if (!product.getHighestBidder().getId().equals(payIntentRequest.getBuyer().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Buyer must be highest bidder"
            );
        }

        if (product.getEndDate().isAfter(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Auction is still active"
            );
        }

        if (product.getSeller().getStripeAccId() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Seller didn't provide payment info"
            );
        }
    }

    public Map<String, String> getPaymentSessionStatus(String sessionId) throws StripeException {
        Stripe.apiKey = stripeApiKey;

        List<String> expandList = new ArrayList<>();
        expandList.add("payment_intent");

        Map<String, Object> expandParams = new HashMap<>();
        expandParams.put("expand", expandList);

        Session session = Session.retrieve(sessionId, expandParams, null);

        Map<String, String> res = new HashMap<>();
        res.put("payment_status", session.getPaymentIntentObject().getStatus());

        return res;
    }
}
