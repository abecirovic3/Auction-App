package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.service.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @Value("${stripeApiKey}")
    String stripeApiKey;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping(path = "/create-checkout-session")
    public String createCheckoutSession() throws StripeException {
        Stripe.apiKey = stripeApiKey;

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency("usd")
                                                .setUnitAmount(10 * 100L)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Product")
                                                                .build())
                                                .build())
                                        .setQuantity(1L)
                                        .build())
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:3000/")
                        .setCancelUrl("http://localhost:3000/")
                        .setCustomer("cus_LZvbsYxnV4ZWks")
                        .setPaymentIntentData(
                                SessionCreateParams.PaymentIntentData.builder()
                                        .setSetupFutureUsage(SessionCreateParams.PaymentIntentData.SetupFutureUsage.ON_SESSION)
                                        .setApplicationFeeAmount(123L)
                                        .setOnBehalfOf("acct_1KsksI4IR8JOdRnp")
                                        .setTransferData(
                                                SessionCreateParams.PaymentIntentData.TransferData.builder()
                                                        .setDestination("acct_1KsksI4IR8JOdRnp")
                                                        .build())
                                        .build())
                        .build();

        Session session = Session.create(params);
        return session.getUrl();
    }

    @PostMapping(path = "/create-account-link/{id}")
    public Map<String, String> createAccountLink(@PathVariable Long id) throws StripeException {
        return paymentService.createAccountLink(id);
    }

    @PostMapping(path = "/create-account")
    public String createAccount() throws StripeException {
        Stripe.apiKey = stripeApiKey;

        Map<String, Object> cardPayments =
                new HashMap<>();
        cardPayments.put("requested", true);
        Map<String, Object> transfers = new HashMap<>();
        transfers.put("requested", true);
        Map<String, Object> capabilities =
                new HashMap<>();
        capabilities.put("card_payments", cardPayments);
        capabilities.put("transfers", transfers);
        Map<String, Object> params = new HashMap<>();
        params.put("type", "custom");
        params.put("country", "US");
        params.put("email", "jenny.rosen@example.com");
        params.put("capabilities", capabilities);

        Account account = Account.create(params);

        return account.getId();
    }
}
