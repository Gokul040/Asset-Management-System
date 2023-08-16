package com.AMS.AssetManagement.repository;

import com.AMS.AssetManagement.entity.RefreshToken;
import com.AMS.AssetManagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
   RefreshToken findByUserId(Long id);

    @Modifying
    int deleteByUser(User user);


}
