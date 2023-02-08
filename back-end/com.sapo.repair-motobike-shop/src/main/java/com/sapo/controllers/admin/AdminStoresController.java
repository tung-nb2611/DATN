package com.sapo.controllers.admin;

import com.sapo.dto.store.StoreDtoRequest;
import com.sapo.dto.store.StorePaginationDTO;
import com.sapo.dto.store.StoreResponse;
import com.sapo.dto.store.StroeResponeById;
import com.sapo.services.StoreService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/stores")
@PreAuthorize("hasRole('ADMIN')")
public class AdminStoresController {

    private final StoreService storeService;

    public AdminStoresController(StoreService storeService) {
        this.storeService = storeService;
    }

    // tim tat ca cac store order va phan trang
    @GetMapping("/list")
    public ResponseEntity<StorePaginationDTO> searchStore(@RequestParam int page, @RequestParam int limit ){
        StorePaginationDTO storePaginationDTO = storeService.searchStoreOrder(page, limit);
        return ResponseEntity.ok(storePaginationDTO);
    }
    @GetMapping("/{id}")
    public ResponseEntity<StroeResponeById> searchStoreById(@PathVariable("id") int id ){
        StroeResponeById StroeResponeById   = storeService.findUserDTOById(id);
        return ResponseEntity.ok(StroeResponeById);
    }
    // tao store mới
    @PostMapping
    public ResponseEntity<StoreDtoRequest> addStore(@Valid @RequestBody StoreDtoRequest storeDtoRequest) throws IOException {
        storeService.saveStore(storeDtoRequest);
        return ResponseEntity.ok(storeDtoRequest);
    }

    // sửa store
    @PutMapping("/{id}")
    public ResponseEntity<StoreDtoRequest> updateStore(@PathVariable("id") int id, @Valid @RequestBody StoreDtoRequest storeDtoRequest) throws IOException {
        storeService.updateStore(id,storeDtoRequest );
        return ResponseEntity.ok(storeDtoRequest);
    }

    //xóa store
    @PutMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable("id") int id){
        storeService.deleteStore(id);
        return ResponseEntity.ok().build();
    }
}
