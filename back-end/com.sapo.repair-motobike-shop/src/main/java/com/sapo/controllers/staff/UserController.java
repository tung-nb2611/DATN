package com.sapo.controllers.staff;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.entities.User;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RequestMapping("/api/user")
@CrossOrigin("http://localhost:3000")
@RestController

public class UserController {
    private final UserService userService;
    private final JwtProvider jwtProvider;
    
    public UserController(UserService userService, JwtProvider jwtProvider) {
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    //Hàm tạo avatar
    @GetMapping("/avatar/{id}")
    public ResponseEntity<Void> changeAvatar(@PathVariable int id, MultipartFile avatar) throws IOException {
        userService.saveAvatar(id, avatar);
        return ResponseEntity.ok().build();
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER') or hasRole('SUPER_ADMIN')")
    //Hàm tìm list user đang rảnh
    @GetMapping("/ready")
    public ResponseEntity<List<User>> findAllUserReadyFix(@RequestParam String keyword,HttpServletRequest request){
        val store_id = getstoreId(request);
        List<User> users = userService.findAllUserReadyFix(store_id,keyword);
        return ResponseEntity.ok(users);
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    //Hàm tìm list user
    @GetMapping()
    public ResponseEntity<List<User>> findAllUser(){
        List<User> users = userService.findAllListUser();
        return ResponseEntity.ok(users);
    }
    
    //Hàm tìm list user theo id
    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable("id") int id){
        User user = userService.findUserById(id);
        return ResponseEntity.ok(user);
    }
    //Hàm tìm user theo jwt
    @GetMapping("/info")
    public ResponseEntity<User> findUserById(HttpServletRequest request){
        String tokenBearer = request.getHeader("Authorization");
        String[] splits = tokenBearer.split(" ");
        String username = jwtProvider.getUserNameFromJwtToken(splits[1]);
        User user = userService.findUserByUsername(username);

        return ResponseEntity.ok(user);
    }
    
}
