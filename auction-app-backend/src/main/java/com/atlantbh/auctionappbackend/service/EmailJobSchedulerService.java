package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.email.EmailJob;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleScheduleBuilder;
import org.quartz.Trigger;
import org.quartz.TriggerBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
public class EmailJobSchedulerService {
    @Value("${CLIENT_BASE_URL}")
    String clientBaseUrl;

    private final Scheduler scheduler;
    private final EmailService emailService;

    @Autowired
    public EmailJobSchedulerService(Scheduler scheduler, EmailService emailService) {
        this.scheduler = scheduler;
        this.emailService = emailService;
    }

    public void scheduleSellerReviewEmail(String recipientName, String recipientEmail, String productId) {
        try {
            JobDetail jobDetail = buildJobDetail(
                    "Review Seller",
                    emailService.buildSellerReviewEmail(
                            recipientName,
                            clientBaseUrl + "/shop/product-overview/" + productId + "/review"),
                    "auction.app.bs@gmail.com",
                    recipientEmail
            );
            Trigger trigger = buildJobTrigger(jobDetail, LocalDateTime.now().plusMinutes(3L));
            scheduler.scheduleJob(jobDetail, trigger);
        } catch (SchedulerException ex) {
            log.error("Error scheduling email", ex);
        }
    }

    private Trigger buildJobTrigger(JobDetail jobDetail, LocalDateTime dateTime) {
        return TriggerBuilder.newTrigger()
                .forJob(jobDetail)
                .withIdentity(jobDetail.getKey().getName(), "email-triggers")
                .withDescription("Send Email Trigger")
                .startAt(Date.from(dateTime.atZone(ZoneId.systemDefault()).toInstant()))
                .withSchedule(SimpleScheduleBuilder.simpleSchedule().withMisfireHandlingInstructionFireNow())
                .build();
    }

    private JobDetail buildJobDetail(String subject, String content, String sender, String recipient) {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("subject", subject);
        jobDataMap.put("content", content);
        jobDataMap.put("sender", sender);
        jobDataMap.put("recipient", recipient);

        return JobBuilder.newJob(EmailJob.class)
                .withIdentity(UUID.randomUUID().toString(), "email-jobs")
                .withDescription("Send Email Job")
                .usingJobData(jobDataMap)
                .storeDurably()
                .build();
    }
}
