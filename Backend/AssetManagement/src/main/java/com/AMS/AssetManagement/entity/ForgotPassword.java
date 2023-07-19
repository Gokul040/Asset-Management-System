package com.AMS.AssetManagement.entity;

import lombok.Data;

@Data
public class ForgotPassword {
    private String email;
    private String newPassword;
    private String otp;
}
