package com.atlantbh.auctionappbackend.email;

public interface EmailSender {
    void send(String subject, String content, String sender, String recipient);
}
