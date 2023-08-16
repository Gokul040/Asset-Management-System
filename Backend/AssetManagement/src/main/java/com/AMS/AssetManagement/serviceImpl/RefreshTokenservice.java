package com.AMS.AssetManagement.serviceImpl;

import com.AMS.AssetManagement.entity.RefreshToken;
import com.AMS.AssetManagement.entity.User;
import com.AMS.AssetManagement.exception.TokenRefreshException;
import com.AMS.AssetManagement.repository.RefreshTokenRepository;
import com.AMS.AssetManagement.repository.UserRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenservice {
    @Value("${spring.jwt.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(String userName) {
        RefreshToken refreshToken = new RefreshToken();
        User user = userRepository.findFirstByEmail(userName);
        refreshToken.setId(user.getId());
        refreshToken.setUser(user);
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }
        return token;
    }

    @Transactional
    public int deleteByUserId(String userName) {
        return refreshTokenRepository.deleteByUser(userRepository.findByEmail(userName).get());
    }
}
