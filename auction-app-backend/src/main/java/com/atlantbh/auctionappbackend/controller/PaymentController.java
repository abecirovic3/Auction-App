package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.request.PayIntentRequest;
import com.atlantbh.auctionappbackend.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping(path = "${application.api.prefix}/payment")
public class PaymentController {
    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping(path = "/create-checkout-session")
    public Map<String, String> createCheckoutSession(@RequestBody PayIntentRequest payIntentRequest) throws StripeException {
        return paymentService.createCheckoutSession(payIntentRequest);
    }

    @PostMapping(path = "/create-account-link/{id}")
    public Map<String, String> createAccountLink(@PathVariable Long id) throws StripeException {
        return paymentService.createAccountLink(id);
    }

    @GetMapping(path = "/onboarding-process-complete/{id}")
    public Map<String, Boolean> isOnboardingProcessComplete(@PathVariable Long id) throws StripeException {
        return paymentService.isOnboardingProcessComplete(id);
    }

    @GetMapping(path = "/session-status/{id}")
    public Map<String, String> getSessionStatus(@PathVariable String id) throws StripeException {
        return paymentService.getPaymentSessionStatus(id);
    }
}
