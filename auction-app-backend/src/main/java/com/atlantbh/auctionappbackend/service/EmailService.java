package com.atlantbh.auctionappbackend.service;

import com.atlantbh.auctionappbackend.email.EmailSender;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Slf4j
@Service
@AllArgsConstructor
public class EmailService implements EmailSender {

    private final JavaMailSender mailSender;

    @Override
    @Async
    public void send(String subject, String content, String sender, String recipient) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(content, true);
            helper.setTo(recipient);
            helper.setSubject(subject);
            helper.setFrom(sender);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new IllegalStateException("Failed to send email");
        }
    }

    public String buildSellerReviewEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\"> \n" +
                "   \n" +
                "  <span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span> \n" +
                "   \n" +
                "    <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\"> \n" +
                "      <tbody><tr> \n" +
                "        <td width=\"100%\" height=\"53\" bgcolor=\"#8367D8\"> \n" +
                "           \n" +
                "          <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\"> \n" +
                "            <tbody><tr> \n" +
                "              <td width=\"70\" bgcolor=\"#8367D8\" valign=\"middle\"> \n" +
                "                  <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\"> \n" +
                "                    <tbody><tr> \n" +
                "                      <td style=\"padding-left:10px\"> \n" +
                "                     \n" +
                "                      </td> \n" +
                "                      <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\"> \n" +
                "                        <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Auction Application</span> \n" +
                "                      </td> \n" +
                "                    </tr> \n" +
                "                  </tbody></table> \n" +
                "                </a> \n" +
                "              </td> \n" +
                "            </tr> \n" +
                "          </tbody></table> \n" +
                "           \n" +
                "        </td> \n" +
                "      </tr> \n" +
                "    </tbody></table> \n" +
                "\n" +
                "   \n" +
                "    <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\"> \n" +
                "      <tbody><tr> \n" +
                "        <td height=\"30\"><br></td> \n" +
                "      </tr> \n" +
                "      <tr> \n" +
                "        <td width=\"10\" valign=\"middle\"><br></td> \n" +
                "        <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\"> \n" +
                "           \n" +
                "              <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hi " + name + ",</p>\n" +
                "              <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Did your item find a way to you? <br> If yes, let us know if you like it. </p>\n" +
                "              \n" +
                "              <a href=\"" + link + "\" target=\"_blank\" style=\"box-sizing: border-box;display: inline-block;font-family:arial,helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #8367d8; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;\">\n" +
                "                <span style=\"display:block;padding:10px 20px;line-height:120%;\"><span style=\"font-size: 14px;\">Review Seller</span></span>\n" +
                "              </a>\n" +
                "           \n" +
                "        </td> \n" +
                "        <td width=\"10\" valign=\"middle\"><br></td> \n" +
                "      </tr> \n" +
                "      <tr> \n" +
                "        <td height=\"30\"><br></td> \n" +
                "      </tr> \n" +
                "    </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\"> \n" +
                "   \n" +
                "  </div></div>";
    }
}
