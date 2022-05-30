package com.atlantbh.auctionappbackend.constraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = AuctionStartDatePreferenceValidator.class)
@Documented
public @interface AuctionStartDatePreference {
    String message() default "Auction start date can't be in past";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
