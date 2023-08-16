package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.registration.token.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface VerificationTokenRepository extends JpaRepository<VerificationToken,Long> {
    VerificationToken findByToken(String token);

   VerificationToken findByTokenId(Long token_id);
  VerificationToken findByUserId(Long id);
}
