package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.domain.User;
import com.atlantbh.auctionappbackend.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PaymentService {
    private final UserRepository userRepository;

    @Value("${stripeApiKey}")
    String stripeApiKey;

    @Value("${clientBaseUrl}")
    String clientBaseUrl;

    @Autowired
    public PaymentService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
}
