package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.registration.password.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PasswordResetRepository extends JpaRepository<PasswordResetToken,Long> {
    PasswordResetToken findByToken(String theToken);
    PasswordResetToken findByTokenId(Long id);
   PasswordResetToken findByUserId(Long id);
}
