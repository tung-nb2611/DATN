package com.sapo.controllers.admin;

import com.sapo.config.sercurity.jwt.JwtProvider;
import com.sapo.controllers.BaseController;
import com.sapo.dto.statistics.*;
import com.sapo.entities.User;
import com.sapo.services.StatisticsService;
import com.sapo.services.UserService;
import lombok.val;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/statistics")
@PreAuthorize("hasRole('ADMIN')")
public class    AdminStatisticsController {
    private final StatisticsService statisticsService;
    private final UserService userService;
    private final JwtProvider jwtProvider;
    public AdminStatisticsController(StatisticsService statisticsService,UserService userService, JwtProvider jwtProvider) {
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.statisticsService = statisticsService;
    }
    public Integer getstoreId(HttpServletRequest request){
        String tokenBearer = request.getHeader("Authorization");
        String[] splits = tokenBearer.split(" ");
        String username = jwtProvider.getUserNameFromJwtToken(splits[1]);
        User user = userService.findUserByUsername(username);

        return user.getStore().getId();
    }
    // Api thống kê số đơn hàng
    @GetMapping("/invoice")
    public ResponseEntity<List<InvoiceReportDTO>> selectInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd, HttpServletRequest request) throws ParseException {
       val store_id = getstoreId(request);
        List<InvoiceReportDTO> invoiceReportDTOS = statisticsService.selectInvoiceReport(store_id,dateStart, dateEnd);
        return ResponseEntity.ok(invoiceReportDTOS);
    }
    // Api thống kê số đơn hàng và tổng số tiền từng khách hàng
    @GetMapping("/customers")
    public ResponseEntity<List<StatisticsCustomerDTO>> selectCustomerAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd,HttpServletRequest request) throws ParseException {
        val store_id = getstoreId(request);
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsService.selectCustomerAndInvoiceInfo(store_id,dateStart, dateEnd);
        return ResponseEntity.ok(statisticsCustomerDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng phụ tùng
    @GetMapping("/materials")
    public ResponseEntity<List<StatisticMaterialDTO>> selectMaterialAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd,HttpServletRequest request) throws ParseException {
        val store_id = getstoreId(request);
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsService.selectMaterialAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticMaterialDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng dich vu
    @GetMapping("/services")
    public ResponseEntity<List<StatisticServiceDTO>> selectServiceAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd,HttpServletRequest request) throws ParseException {
        val store_id = getstoreId(request);
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsService.selectServiceAndInvoiceInfo(store_id,dateStart, dateEnd);
        return ResponseEntity.ok(statisticServiceDTOS);
    }

    // Api thống kê doanh thu
    @GetMapping("/revunes")
    public ResponseEntity<List<RevuneDTO>> selectRevune(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<RevuneDTO> revuneDTOS = statisticsService.selectRevune(dateStart, dateEnd);
        return ResponseEntity.ok(revuneDTOS);
    }
    // Api thống kê số lượng
    @GetMapping("/number")
    public ResponseEntity<NumberStatic> selectNumber(@RequestParam String dateStart, @RequestParam String dateEnd,HttpServletRequest request) throws ParseException {
        val store_id = getstoreId(request);
        NumberStatic numberStatics = statisticsService.selectNumber(store_id,dateStart, dateEnd);
        return ResponseEntity.ok(numberStatics);
    }

    // Api thống kê luong nhan vien
    @GetMapping("/salary")
    public ResponseEntity<List<SalaryDTO>> selectSalary(@RequestParam int monthS, @RequestParam int monthE) throws ParseException {
        List<SalaryDTO> salaryDTOS = statisticsService.selectSalary(monthS, monthE);
        return ResponseEntity.ok(salaryDTOS);
    }

    // Api thống kê số nhap hang
    @GetMapping("/input")
    public ResponseEntity<List<InputMaterialDTO>> selectInput(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsService.selectInput(dateStart, dateEnd);
        return ResponseEntity.ok(inputMaterialDTOS);
    }

    // Api thống kê doanh thu theo ngày
    @GetMapping("/invoices")
    public ResponseEntity<List<RevenuePerDayDTO>> selectInvoice(@RequestParam String dateStart, @RequestParam String dateEnd,HttpServletRequest request) throws ParseException {
        val store_id = getstoreId(request);
        List<RevenuePerDayDTO> revenuePerDayDTOS = statisticsService.selectRevenuePerDay(store_id,dateStart, dateEnd);
        return ResponseEntity.ok(revenuePerDayDTOS);
    }
}
