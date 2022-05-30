package com.atlantbh.auctionappbackend.controller;

import com.atlantbh.auctionappbackend.service.EmailJobSchedulerService;
import com.atlantbh.auctionappbackend.service.ProductService;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping(path = "${application.api.prefix}/stripe")
public class StripeController {
    @Value("${STRIPE_API_KEY}")
    String stripeApiKey;

    @Value("${STRIPE_WEBHOOK_SECRET}")
    String stripeWebhookSecret;

    private final ProductService productService;
    private final EmailJobSchedulerService emailJobSchedulerService;

    public StripeController(ProductService productService, EmailJobSchedulerService emailJobSchedulerService) {
        this.productService = productService;
        this.emailJobSchedulerService = emailJobSchedulerService;
    }

    @PostMapping(path = "/payment-intent-webhook")
    public void handleStripePostWebhook(HttpServletRequest request, HttpServletResponse response) {
        Stripe.apiKey = stripeApiKey;

        // Replace this endpoint secret with your endpoint's unique secret
        // If you are testing with the CLI, find the secret by running 'stripe listen'
        // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
        // at https://dashboard.stripe.com/webhooks
        String endpointSecret = stripeWebhookSecret;

        try {
            String payload = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));

            Event event = null;

            String sigHeader = request.getHeader("Stripe-Signature");
            if(endpointSecret != null && sigHeader != null) {
                try {
                    event = Webhook.constructEvent(
                            payload, sigHeader, endpointSecret
                    );
                } catch (SignatureVerificationException e) {
                    // Invalid signature
                    response.setStatus(400);
                }
            }

            // Deserialize the nested object inside the event
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            StripeObject stripeObject = null;
            if (dataObjectDeserializer.getObject().isPresent()) {
                stripeObject = dataObjectDeserializer.getObject().get();
            } else {
                response.setStatus(400);
            }

            // Handle the event
            if ("payment_intent.succeeded".equals(event.getType())) {
                PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                log.info("Payment for product {} succeded", paymentIntent.getMetadata().get("product_id"));
                productService.setProductToSold(Long.parseLong(paymentIntent.getMetadata().get("product_id")));
                emailJobSchedulerService.scheduleSellerReviewEmail(
                        paymentIntent.getMetadata().get("buyer_name"),
                        paymentIntent.getMetadata().get("buyer_email"),
                        paymentIntent.getMetadata().get("product_id")
                );
            } else if ("payment_intent.payment_failed".equals(event.getType())) {
                // TODO handle payment fail, maybe send email or smt
            }
            response.setStatus(200);

        } catch (Exception e) {
            response.setStatus(500);
        }
    }
}
