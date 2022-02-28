package com.atlantbh.auctionappbackend.constraint;

import java.lang.annotation.Documented;
import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = EmailPreferenceValidator.class)
@Documented
public @interface EmailPreference {
    String message() default "Email is not valid";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
