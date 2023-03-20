package com.sapo.controllers.admin;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.dto.Area.AreaDtoRequest;
import com.sapo.dto.Area.AreaResponeById;
import com.sapo.dto.Area.AreasResponse;
import com.sapo.entities.User;
import com.sapo.services.AreaService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/areas")
@PreAuthorize("hasRole('ADMIN') or hasRole('FIXER') or hasRole('COORDINATOR') or hasRole('SUPER_ADMIN')")
public class AdminAreasController {

    private final AreaService areaService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    public AdminAreasController(AreaService areaService,UserService userService, JwtProvider jwtProvider) {
        this.areaService = areaService;
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

    @GetMapping("/list")
    public ResponseEntity<AreasResponse> searchArea( @RequestParam List<Integer> status ,HttpServletRequest request ){
        val store_id = getstoreId(request);
        AreasResponse areasResponse =  areaService.findAllAreaBystatus(store_id,status);
        return ResponseEntity.ok(areasResponse);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AreaResponeById> searchAreaById(@PathVariable("id") int id ){
        AreaResponeById areaResponeById   = areaService.findAreaDTOById(id);
        return ResponseEntity.ok(areaResponeById);
    }

    // tao khu vực  mới
    @PostMapping
    public ResponseEntity<AreaDtoRequest> addArea(@Valid @RequestBody AreaDtoRequest areaDtoRequest,HttpServletRequest request) throws IOException {
        val store_id = getstoreId(request);
        areaDtoRequest.setStore_id(store_id);
        areaService.saveArea(areaDtoRequest);
        return ResponseEntity.ok(areaDtoRequest);
    }

    // sửa khu vực
    @PutMapping("/{id}")
    public ResponseEntity<AreaDtoRequest> updateArea(@PathVariable("id") int id, @Valid @RequestBody AreaDtoRequest areaDtoRequest,HttpServletRequest request) throws IOException {
        val store_id = getstoreId(request);
        areaDtoRequest.setStore_id(store_id);
        areaService.updateArea(id,areaDtoRequest );
        return ResponseEntity.ok(areaDtoRequest);
    }

    //xóa store
    @PutMapping("/delete/{id}")
    public ResponseEntity<Void> deleteArea(@PathVariable("id") int id){
        areaService.deleteArea(id);
        return ResponseEntity.ok().build();
    }
}
