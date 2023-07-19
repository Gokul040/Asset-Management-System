package com.AMS.AssetManagement.controller.jwt;


import com.AMS.AssetManagement.entity.RefreshToken;
import com.AMS.AssetManagement.entity.User;
import com.AMS.AssetManagement.exception.TokenRefreshException;
import com.AMS.AssetManagement.repository.UserRepository;
import com.AMS.AssetManagement.security.TokenRefreshRequest;
import com.AMS.AssetManagement.security.TokenRefreshResponse;
import com.AMS.AssetManagement.serviceImpl.RefreshTokenservice;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/authenticate")
@CrossOrigin(origins ="http://localhost:4200")
public class JWTController {

    @Autowired
    private final JWTService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RefreshTokenservice refreshTokenService;
    private  PasswordEncoder passwordEncoder;

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";


    @PostMapping
    public void getTokenForAuthenticatedUser(@RequestBody JWTAuthenticationRequest authRequest, HttpServletResponse response) throws BadCredentialsException, DisabledException, UsernameNotFoundException, IOException, ServletException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(),authRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Incorrect username or password", e);
        }
        catch (DisabledException disabledException){
            response.sendError(HttpServletResponse.SC_NOT_ACCEPTABLE, "User Is Not Activated");
            return;
        }
        User user = userRepository.findFirstByEmail(authRequest.getUserName());

            final UserDetails userDetails = jwtService.loadUserByUserName(authRequest.getUserName());

            final String jwt = jwtService.getGeneratedToken(userDetails.getUsername());
            final RefreshToken refresh = refreshTokenService.createRefreshToken(authRequest.getUserName());

            response.getWriter().write(new JSONObject()
                    .put("userId", user.getId())
                    .put("role", user.getRole())
                    .put("email",user.getEmail())
                    .put("refreshToken",refresh.getToken())
                    .put("ExpiryDate",refresh.getExpiryDate())
                            .put("token",jwt)
                    .toString()
            );
            response.addHeader( "Content-Type","application/json"+response);
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + jwt);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken( @RequestBody TokenRefreshRequest request) throws ExpiredJwtException {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.getGeneratedToken(user.getEmail());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

}
