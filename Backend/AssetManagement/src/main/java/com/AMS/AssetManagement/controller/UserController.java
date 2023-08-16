package com.AMS.AssetManagement.controller;

import com.AMS.AssetManagement.entity.User;
import com.AMS.AssetManagement.serviceImpl.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<User> getUser(){
        return userService.getUsers();
    }
    @GetMapping("/all")
    public List<User> getALlUsers(){
        return userService.getUsers();
    }
    @GetMapping("/one")
    public List<User> getUsers(){
        return userService.getUsers();
    }
}
