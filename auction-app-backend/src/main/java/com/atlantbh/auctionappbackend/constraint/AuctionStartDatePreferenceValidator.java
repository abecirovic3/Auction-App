package com.atlantbh.auctionappbackend.constraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.time.LocalDateTime;

public class AuctionStartDatePreferenceValidator implements ConstraintValidator<AuctionStartDatePreference, LocalDateTime> {

    @Override
    public boolean isValid(LocalDateTime startDate, ConstraintValidatorContext constraintValidatorContext) {
        return startDate != null && startDate.isAfter(LocalDateTime.now().minusDays((long) 1));
    }
}
