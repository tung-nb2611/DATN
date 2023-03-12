package com.sapo.controllers.staff;


import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.entities.Material;
import com.sapo.entities.User;
import com.sapo.services.MaterialService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/api/materials")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('COORDINATOR')" )
public class MaterialController {
    private final MaterialService materialService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    public MaterialController(MaterialService materialService,UserService userService, JwtProvider jwtProvider) {
        this.materialService = materialService;
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

    //API lấy list phụ kiện
    @GetMapping
    public ResponseEntity<List<Material>> listMaterial(@RequestParam String keyword, HttpServletRequest request){
        val store_id = getstoreId(request);
        List<Material> materials = materialService.findAllMaterialUsing(store_id,keyword);
        return ResponseEntity.ok(materials);
    }
}
