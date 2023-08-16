package com.AMS.AssetManagement.serviceImpl;

import com.AMS.AssetManagement.entity.ForgotPassword;
import com.AMS.AssetManagement.entity.User;
import com.AMS.AssetManagement.repository.UserRepository;
import com.AMS.AssetManagement.utils.EmailUtil;
import com.AMS.AssetManagement.utils.OtpUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ForgotPasswordService {
    @Autowired
    private OtpUtil otpUtil;
    @Autowired
    private EmailUtil emailUtil;
    @Autowired
    private UserRepository userRepository;


    private final PasswordEncoder passwordEncoder;


    public String resetPassword(ForgotPassword forgotPassword) {
        String otp = otpUtil.generateOtp();
         User user = userRepository.findByEmail(forgotPassword.getEmail())
            .orElseThrow(
                       () -> new RuntimeException("User not found with this email: " + forgotPassword.getEmail()));

        if (forgotPassword.getEmail().equals(user.getEmail())) {
            try {
                emailUtil.sendOtpEmail(forgotPassword.getEmail(), otp);
            } catch (MessagingException e) {
                throw new RuntimeException("Unable to send otp please try again");
            }

            user.setOtp(otp);
            user.setOtpGeneratedTime(LocalDateTime.now());
            userRepository.save(user);
            return "Verify your Email Id within one minute";
        }
        return "Enter Correct Details";
    }

    public String verifyAccount(ForgotPassword userres) {
        User user = userRepository.findByEmail(userres.getEmail())
                .orElseThrow(() ->  new RuntimeException ("User not found with this email: " + userres.getEmail()));
        if (user.getOtp().equals(userres.getOtp()) && Duration.between(user.getOtpGeneratedTime(),
                LocalDateTime.now()).getSeconds() < (1 * 300)) {
             String encodepass = passwordEncoder.encode(userres.getNewPassword());
            user.setPassword(encodepass);
            userRepository.save(user);
            return "OTP verified and Password Updated";
        }
        return "Please regenerate otp and try again";
    }

    public String regenerateOtp(ForgotPassword forgotPassword) {
      User user = userRepository.findByEmail(forgotPassword.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + forgotPassword.getEmail()));
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(forgotPassword.getEmail(), otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        userRepository.save(user);
        return "Email sent... please verify account within 5 minute";
    }

//    public String login(LoginDto loginDto) {
//        User user = userRepository.findByEmail(loginDto.getEmail())
//                .orElseThrow(
//                        () -> new RuntimeException("User not found with this email: " + loginDto.getEmail()));
//        if (!loginDto.getPassword().equals(user.getPassword())) {
//            return "Password is incorrect";
//        } else if (!user.isActive()) {
//            return "your account is not verified";
//        }
//        return "Login successful";
//    }
}
