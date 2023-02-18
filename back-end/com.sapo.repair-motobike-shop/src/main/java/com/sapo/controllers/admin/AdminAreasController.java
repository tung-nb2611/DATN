package com.sapo.controllers.admin;

import com.sapo.dto.Area.AreaDtoRequest;
import com.sapo.dto.Area.AreaResponeById;
import com.sapo.dto.Area.AreasResponse;
import com.sapo.services.AreaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/areas")
@PreAuthorize("hasRole('ADMIN')")
public class AdminAreasController {

    private final AreaService areaService;

    public AdminAreasController(AreaService areaService) {
        this.areaService = areaService;
    }

    // tim tat ca cac khu vực va phan trang
    @GetMapping("/list")
    public ResponseEntity<AreasResponse> searchArea(@RequestParam int store_id, @RequestParam List<Integer> status  ){
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
    public ResponseEntity<AreaDtoRequest> addArea(@Valid @RequestBody AreaDtoRequest areaDtoRequest) throws IOException {
        areaService.saveArea(areaDtoRequest);
        return ResponseEntity.ok(areaDtoRequest);
    }

    // sửa khu vực
    @PutMapping("/{id}")
    public ResponseEntity<AreaDtoRequest> updateArea(@PathVariable("id") int id, @Valid @RequestBody AreaDtoRequest areaDtoRequest) throws IOException {
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
