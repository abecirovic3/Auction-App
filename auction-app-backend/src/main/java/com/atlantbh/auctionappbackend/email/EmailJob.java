package com.atlantbh.auctionappbackend.email;

import com.atlantbh.auctionappbackend.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
public class EmailJob extends QuartzJobBean {
    private final EmailService emailService;

    @Autowired
    public EmailJob(EmailService emailService) {
        this.emailService = emailService;
    }

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        log.info("Executing Job with key {} at {}", context.getJobDetail().getKey(), LocalDateTime.now());

        JobDataMap jobDataMap = context.getMergedJobDataMap();
        String subject = jobDataMap.getString("subject");
        String content = jobDataMap.getString("content");
        String sender = jobDataMap.getString("sender");
        String recipient = jobDataMap.getString("recipient");

        emailService.send(subject, content, sender, recipient);

        log.info("Email sent to {}", recipient);
    }
}
