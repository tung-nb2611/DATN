package com.sapo.controllers.admin;

import com.sapo.common.ConstantVariableCommon;
import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.dto.invoices.InvoiceAddRequestDTO;
import com.sapo.dto.invoices.InvoiceEditResponseDTO;
import com.sapo.dto.invoices.InvoiceMaterialPaginationResponseDTO;
import com.sapo.entities.User;
import com.sapo.services.AreaService;
import com.sapo.services.InvoiceService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/admin/invoices")
@CrossOrigin(origins = "http://localhost:3000")
@PreAuthorize("hasRole('ADMIN')")
public class AdminInvoicesController {
  private final InvoiceService invoiceService;
  private final AreaService areaService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
  public AdminInvoicesController(InvoiceService invoiceService , AreaService areaService, UserService userService, JwtProvider jwtProvider) {
    this.invoiceService = invoiceService;
    this.areaService =areaService;
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
  //API lấy list hóa đơn chờ thanh toán và đã thanh toán
  @GetMapping("/list")
  public ResponseEntity<InvoiceMaterialPaginationResponseDTO> listInvoiceInProcess(@RequestParam int aera_id,@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam List<Integer> status,HttpServletRequest request){
      val store_id = getstoreId(request);
    int sort = 0;
    InvoiceMaterialPaginationResponseDTO invoiceDTO = invoiceService.findAllInvoiceAndBuyMaterialByStatus(store_id,aera_id,page, limit, keyword, status, sort);
    return ResponseEntity.ok(invoiceDTO);
  }
  
  //API hoàn thành thanh toán hóa đơn
  @PutMapping("/{id}")
  public ResponseEntity<Void> changeStatusInvoiceToCompletePayment (@PathVariable("id") int id, @RequestBody InvoiceAddRequestDTO invoiceAddRequestDTO){
   invoiceService.changeStatusInvoice(id, ConstantVariableCommon.STATUS_INVOICE_5 , invoiceAddRequestDTO);
 return ResponseEntity.ok().build();
  }

  //API hủy hóa đơn 1,2,7
  @PutMapping("/delete/{id}")
  public ResponseEntity<Void> deleteInvoice(@PathVariable("id") int id) {
    invoiceService.deleteInvoice(id);
    return ResponseEntity.ok().build();
  }
  //API tìm invoice và phụ kiện dịch vụ đã kh dc xác nhận theo id
  @GetMapping("/{id}")
  @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
  public ResponseEntity<InvoiceEditResponseDTO> getInvoiceById(@PathVariable("id") int id){
    InvoiceEditResponseDTO invoiceEditResponseDTO = invoiceService.findInvoiceById(id);
    return ResponseEntity.ok(invoiceEditResponseDTO);
  }


}
