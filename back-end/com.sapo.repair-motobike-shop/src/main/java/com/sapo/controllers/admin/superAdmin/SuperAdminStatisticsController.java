package com.sapo.controllers.admin.superAdmin;

import com.sapo.dto.statistics.*;
import com.sapo.services.StatisticsAdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admins/statistics/")
@PreAuthorize("hasRole('SUPER_ADMIN')")
public class SuperAdminStatisticsController {
    private final StatisticsAdminService statisticsAdminService;

    public SuperAdminStatisticsController(StatisticsAdminService statisticsAdminService) {
        this.statisticsAdminService = statisticsAdminService;
    }


    // Api thống kê số đơn hàng và tổng số tiền từng khách hàng
    @GetMapping("/customers")
    public ResponseEntity<List<StatisticsCustomerDTO>> selectCustomerAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsAdminService.selectCustomerAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticsCustomerDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng phụ tùng
    @GetMapping("/materials")
    public ResponseEntity<List<StatisticMaterialDTO>> selectMaterialAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsAdminService.selectMaterialAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticMaterialDTOS);
    }

    // Api thống kê số đơn hàng và tổng số tiền từng dich vu
    @GetMapping("/services")
    public ResponseEntity<List<StatisticServiceDTO>> selectServiceAndInvoiceInfo(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsAdminService.selectServiceAndInvoiceInfo(dateStart, dateEnd);
        return ResponseEntity.ok(statisticServiceDTOS);
    }

    // Api thống kê doanh thu
    @GetMapping("/revunes")
    public ResponseEntity<List<RevuneDTO>> selectRevune(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<RevuneDTO> revuneDTOS = statisticsAdminService.selectRevune(dateStart, dateEnd);
        return ResponseEntity.ok(revuneDTOS);
    }
    // Api thống kê số lượng
    @GetMapping("/number")
    public ResponseEntity<NumberStatic> selectNumber(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        NumberStatic numberStatics = statisticsAdminService.selectNumber(dateStart, dateEnd);
        return ResponseEntity.ok(numberStatics);
    }



    // Api thống kê số nhap hang
    @GetMapping("/input")
    public ResponseEntity<List<InputMaterialDTO>> selectInput(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsAdminService.selectInput(dateStart, dateEnd);
        return ResponseEntity.ok(inputMaterialDTOS);
    }

    // Api thống kê doanh thu theo ngày
    @GetMapping("/invoices")
    public ResponseEntity<List<RevenuePerDayDTO>> selectInvoice(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<RevenuePerDayDTO> revenuePerDayDTOS = statisticsAdminService.selectRevenuePerDay(dateStart, dateEnd);
        return ResponseEntity.ok(revenuePerDayDTOS);
    }
    // Api thống kê doanh store thu theo ngày
    @GetMapping("/store")
    public ResponseEntity<List<StoreStacticRepones>> selectStore(@RequestParam String dateStart, @RequestParam String dateEnd) throws ParseException {
        List<StoreStacticRepones> storeStacticRepones = statisticsAdminService.selectValueStore(dateStart, dateEnd);
        return ResponseEntity.ok(storeStacticRepones);
    }
}
