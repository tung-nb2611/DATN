package com.sapo.controllers.admin;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.dto.receipts.ReceiptDTORequest;
import com.sapo.dto.receipts.ReceiptDTOResponse;
import com.sapo.dto.receipts.ReceiptPaginationDTO;
import com.sapo.dto.receipts.ViewReceiptDTOResponse;
import com.sapo.entities.Receipt;
import com.sapo.entities.User;
import com.sapo.services.ReceiptService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/receipts")
@PreAuthorize("hasRole('ADMIN') or hasRole('FIXER') or hasRole('COORDINATOR') or hasRole('SUPER_ADMIN')")
public class AdminReceiptController {
    private final ReceiptService receiptService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    public AdminReceiptController(ReceiptService receiptService,UserService userService, JwtProvider jwtProvider) {
        this.receiptService = receiptService;
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
    // API Tìm tất cả Receipt và phân trang
    @GetMapping("/list")
    public ResponseEntity<ReceiptPaginationDTO> listReceipt(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam String type,HttpServletRequest request){
        val store_id = getstoreId(request);
        ReceiptPaginationDTO receiptPaginationDTO = receiptService.searchReceipt(store_id,page, limit, keyword, type);
        return ResponseEntity.ok(receiptPaginationDTO);
    }

    // API Tạo Receipt
    @PostMapping
    public ResponseEntity<Void> addReceipt(@RequestBody ReceiptDTORequest receipt,HttpServletRequest request)  {
        val store_id = getstoreId(request);
        receipt.setStoreId(store_id);
        receiptService.saveReceipt(receipt);
        return ResponseEntity.ok().build();
    }

    //API Tìm Thông tin Receipt bằng id
    @GetMapping("/{id}")
    public ResponseEntity<Receipt> findReceiptById(@PathVariable("id") int id){
        Receipt receipt = receiptService.findReceiptById(id);
        return ResponseEntity.ok(receipt);
    }

    //API đổi trạng thái receipt
    @PutMapping("/{id}/status")
    public ResponseEntity<ReceiptDTOResponse> changeStatusReceipt(@PathVariable int id){
        ReceiptDTOResponse receiptDTOResponse = receiptService.changeStatusReceipt(id);
        return ResponseEntity.ok(receiptDTOResponse);
    }

    // Xóa receipt
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReceipt(@PathVariable("id") int id){
        receiptService.deleteReceipt(id);
        return ResponseEntity.ok().build();
    }

    //API Tìm Thông tin Receipt DTO bằng id
    @GetMapping("/detail/{id}")
    public ResponseEntity<ViewReceiptDTOResponse> getReceiptById(@PathVariable("id") int id){
        ViewReceiptDTOResponse receiptDTO = receiptService.findReceiptDetailById(id);
        return ResponseEntity.ok(receiptDTO);
    }

}
