package com.sapo.controllers.staff;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.dto.invoices.*;
import com.sapo.entities.Invoice;
import com.sapo.entities.User;
import com.sapo.services.InvoiceService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:3000")
public class InvoicesController {
    private final InvoiceService invoiceService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    public InvoicesController(InvoiceService invoiceService,UserService userService, JwtProvider jwtProvider) {
        this.invoiceService = invoiceService;
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
    //API lấy list hóa đơn đang xử lý và chờ xử lý
    @GetMapping("/list")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    public ResponseEntity<InvoiceListPaginationResponseDTO> listInvoice(@RequestParam int page, @RequestParam int limit, @RequestParam String keyword, @RequestParam List<Integer> status, @RequestParam int sort,HttpServletRequest request){
        val store_id = getstoreId(request);
        InvoiceListPaginationResponseDTO invoiceDTO = invoiceService.findAllInvoiceByStatus( store_id, page, limit, keyword, status, sort);
        return ResponseEntity.ok(invoiceDTO);
    }
    //API lấy list hóa đơn đang xử lý và chờ xử lý
    @GetMapping("/list/fixer")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    public InvoiceResponse Invoicefixer(HttpServletRequest request){
        val store_id = getstoreId(request);
        String tokenBearer = request.getHeader("Authorization");
        String[] splits = tokenBearer.split(" ");
        String username = jwtProvider.getUserNameFromJwtToken(splits[1]);
        User user = userService.findUserByUsername(username);
        InvoiceResponse invoice = invoiceService.findInvoiceByfixer( user.getId(),user.getName());
        return invoice;
    }


    //API tạo hóa đơn mới
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    @PostMapping
    public ResponseEntity<Void> addNewInvoice(@Valid  @RequestBody InvoiceAddRequestDTO invoiceAddRequestDTO,HttpServletRequest request) {
        val store_id = getstoreId(request);
        invoiceAddRequestDTO.setStore_id(store_id);
        invoiceService.saveInvoice(invoiceAddRequestDTO);
        return ResponseEntity.ok().build();
    }

    //API tìm invoice theo id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    public ResponseEntity<InvoiceEditResponseDTO> getInvoiceById(@PathVariable("id") int id){
        InvoiceEditResponseDTO invoiceEditResponseDTO = invoiceService.findInvoiceById(id);
        return ResponseEntity.ok(invoiceEditResponseDTO);
    }

    //API sửa hóa đơn
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    public ResponseEntity<Void> getInvoiceById(@PathVariable("id") int id,@RequestBody InvoiceEditRequestDTO invoiceEditRequestDTO){
        invoiceService.editInvoice(id,invoiceEditRequestDTO);
        return ResponseEntity.ok().build();
    }
    //API sửa hóa đơn
    @PutMapping("/fixer/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')")
    public ResponseEntity<Void> getInvoiceId(@PathVariable("id") int id,@RequestBody InvoiceEditRequestDTO invoiceEditRequestDTO){
        invoiceService.editInvoice1(id,invoiceEditRequestDTO);
        return ResponseEntity.ok().build();
    }
    //API sửa trạng thái của material-order và service-order
    @PutMapping("/status/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> changeStatusOrderInvoice(@PathVariable("id") int id,@RequestBody StatusInvoiceRequestDTO statusInvoiceRequestDTO){
        invoiceService.changeStatusOrderInvoice(id,statusInvoiceRequestDTO.getAgreement());
        return ResponseEntity.ok().build();
    }

    //API list phiếu sửa chữa chưa có nhân viên nhận
    @GetMapping("/list-invoices-no-fixer")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') ")
    public ResponseEntity<InvoiceListPaginationResponseDTO> listInvoiceNoFixer(@RequestParam int page,@RequestParam int limit,@RequestParam String keyword){
        System.out.println("Input: " +page +" " +limit +" ");
        InvoiceListPaginationResponseDTO invoiceDTO = invoiceService.findAllInvoiceNoFixer(page, limit, keyword);
        return ResponseEntity.ok(invoiceDTO);
    }

    //API nhận phiếu sửa chữa của nhân viên sửa chữa
    @PutMapping("/{user_id}/invoices-fixer/{id}")
    public ResponseEntity<Void> getVoteByFixer(@PathVariable("user_id") int userId,@PathVariable("id") int id){
        invoiceService.getVoteFixer(userId, id);
        return ResponseEntity.ok().build();
    }

    //API lấy list hóa đơn đang xử lý và chờ xử lý
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')" )
    @GetMapping("/list/status")
    public ResponseEntity<List<Invoice>> listInvoiceByStatus(){
        List<Invoice> invoices = invoiceService.findAllInvoiceByStatusOfStaff();
        return ResponseEntity.ok(invoices);
    }

    //API xác nhận phiếu từ nhân viên sửa chữa(chuyển trạng thái từ 2->3)
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIXER')" )
    @PutMapping("/status-confirmation/{id}")
    public ResponseEntity<Void> confirmFixer(@PathVariable("id") int id){
        invoiceService.receiptInvoiceByFixer(id);
        return ResponseEntity.ok().build();
    }
    //API chuyển trạng thái phiếu và nhân viên
    @PreAuthorize("hasRole('ADMIN') or hasRole('FIXER')" )
    @PutMapping("/status-finishing/{id}")
    public ResponseEntity<Void> changerstatus(@PathVariable("id") int id,@RequestParam  int status, @RequestParam int  confirm, @RequestParam String note)
    {
        invoiceService.finishInvoiceByFixer(id, status,confirm,note);
        return ResponseEntity.ok().build();
    }

    //API lấy list hóa đơn 1,2,7
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')" )
    @GetMapping("/list-can-delete")
    public ResponseEntity<InvoiceListPaginationResponseDTO> listInvoiceCanDelete(@RequestParam int page,@RequestParam int limit,@RequestParam String keyword){
        InvoiceListPaginationResponseDTO invoiceDTO = invoiceService.findAllInvoiceCanDelete(page, limit, keyword);
        return ResponseEntity.ok(invoiceDTO);
    }

    //API so sánh số lượng
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR') or hasRole('FIXER')" )
    @GetMapping("/comparison")
    public ResponseEntity<Void> compareQuantityMaterialInvoice(@RequestParam int id, @RequestParam int quantity){
        invoiceService.compareQuantityMaterial(id,quantity);
        return ResponseEntity.ok().build();
    }

    //API tạo phiếu mua phụ kiện
    @PostMapping("/materials")
    @PreAuthorize("hasRole('ADMIN') or hasRole('COORDINATOR')")
    public ResponseEntity<Void> addNewInvoiceMaterial(@Valid  @RequestBody InvoiceBuyMaterialRequest invoiceBuyMaterialRequest) {
        invoiceService.saveInvoiceMaterial(invoiceBuyMaterialRequest);
        return ResponseEntity.ok().build();
    }

}
