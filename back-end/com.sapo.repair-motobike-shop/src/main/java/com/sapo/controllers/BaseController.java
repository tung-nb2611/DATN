package com.sapo.controllers;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.entities.User;
import com.sapo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

public class BaseController {

    private final UserService userService;
    private final JwtProvider jwtProvider;

    public BaseController(UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }
    public Integer getstoreId(HttpServletRequest request){
        String tokenBearer = request.getHeader("Authorization");
        String[] splits = tokenBearer.split(" ");
        String username = jwtProvider.getUserNameFromJwtToken(splits[1]);
        User user = userService.findUserByUsername(username);

        return user.getStore().getId();
    }
}
