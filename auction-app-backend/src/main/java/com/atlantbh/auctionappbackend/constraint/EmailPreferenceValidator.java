package com.atlantbh.auctionappbackend.constraint;

import org.apache.commons.validator.routines.EmailValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class EmailPreferenceValidator implements ConstraintValidator<EmailPreference, String> {

    @Override
    public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {
        return EmailValidator.getInstance().isValid(email);
    }
}
