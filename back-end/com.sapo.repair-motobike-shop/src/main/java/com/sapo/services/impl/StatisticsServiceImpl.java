package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.dao.jpa.AreaDao;
import com.sapo.dao.jpa.CustomerDAO;
import com.sapo.dao.jpa.StatisticsDAO;
import com.sapo.dao.jpa.VehicleCustomerDAO;
import com.sapo.dto.statistics.*;
import com.sapo.entities.*;
import com.sapo.services.StatisticsService;
import lombok.val;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private final StatisticsDAO statisticsDAO;
    private final AreaDao areaDao;
    private  final VehicleCustomerDAO vehicleCustomerDAO;
    private  final CustomerDAO customerDAO;

    public StatisticsServiceImpl(StatisticsDAO statisticsDAO, AreaDao areaDao,VehicleCustomerDAO vehicleCustomerDAO, CustomerDAO customerDAO) {
        this.statisticsDAO = statisticsDAO;
        this.areaDao = areaDao;
        this.vehicleCustomerDAO=vehicleCustomerDAO;
        this.customerDAO = customerDAO;

    }
    @Override
    public List<InvoiceReportDTO> selectInvoiceReport(int store_id,String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<InvoiceReportDTO> invoiceReportDTOS = new ArrayList<>();
        List<Areas> areas = areaDao.findAllArea(store_id);

        if(areas.size() >0) {
            for (val area : areas) {
                Integer count = statisticsDAO.getCountInbvoice(store_id,area.getId(),dateStart1,dateEnd1);
                Integer sum = statisticsDAO.getSumInbvoice(store_id,area.getId(),dateStart1,dateEnd1);
                if(sum!=null && count !=null){
                    InvoiceTotalDTO invoiceTotalDTO = new InvoiceTotalDTO(sum,count) ;
                    InvoiceReportDTO invoiceReportDTO = new InvoiceReportDTO(area.getName(),invoiceTotalDTO);
                    invoiceReportDTOS.add(invoiceReportDTO);
                }
                if(sum== null){
                    InvoiceTotalDTO invoiceTotalDTO = new InvoiceTotalDTO(0,count) ;
                    InvoiceReportDTO invoiceReportDTO = new InvoiceReportDTO(area.getName(),invoiceTotalDTO);
                    invoiceReportDTOS.add(invoiceReportDTO);
                }
                if(count== null){
                    InvoiceTotalDTO invoiceTotalDTO = new InvoiceTotalDTO(sum,0) ;
                    InvoiceReportDTO invoiceReportDTO = new InvoiceReportDTO(area.getName(),invoiceTotalDTO);
                    invoiceReportDTOS.add(invoiceReportDTO);
                }


            } }
        return invoiceReportDTOS;
    }

    //Hàm thống số hóa đơn và tổng tiền các hóa đơn của khách hàng
    @Override
    public List<StatisticsCustomerDTO> selectCustomerAndInvoiceInfo( int storeId,String dateStart, String dateEnd) throws ParseException {


        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsDAO.selectCustomerAndInvoicesInfo(dateStart1, dateEnd1);
            List<StatisticsCustomerDTO> statisticsCustomerList = transferArraysToArrayList(statisticsCustomerDTOS, dateStart1, dateEnd1);
        return statisticsCustomerList;
    }

    //Hàm chuyển từ arrays sang arraylist và điều kiện date
    private List<StatisticsCustomerDTO> transferArraysToArrayList(List<StatisticsCustomerDTO> statisticsCustomerDTOS, long dateStart, long dateEnd){
        List<StatisticsCustomerDTO> statisticsCustomerList = new ArrayList<>();
        Iterator itr = statisticsCustomerDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            String phone = String.valueOf(obj[3]);
            String licensePlate = String.valueOf(obj[4]);
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[5]));
            int numberPurchases = Integer.parseInt(String.valueOf(obj[6]));
            long createAt = Long.parseLong(String.valueOf(obj[7]));

            StatisticsCustomerDTO statisticsCustomerDTO = new StatisticsCustomerDTO(id, code, name, phone, licensePlate, totalPurchased, numberPurchases, createAt);

                statisticsCustomerList.add(statisticsCustomerDTO);

        }
            return statisticsCustomerList;
    }

    @Override
    public List<StatisticMaterialDTO> selectMaterialAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsDAO.selectMaterialAndInvoiceInfo(dateStart1,dateEnd1);
        List<StatisticMaterialDTO> statisticMaterialList = new ArrayList<>();


        Iterator itr = statisticMaterialDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String name = String.valueOf(obj[1]);
            String code = String.valueOf(obj[2]);
            int numberInvoices = Integer.parseInt(String.valueOf(obj[3]));
            int numberPurchases = Integer.parseInt(String.valueOf(obj[4]));
            int numberInventory = Integer.parseInt(String.valueOf(obj[5]));
            BigDecimal outPutPrice = new BigDecimal(String.valueOf(obj[6]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[7]));
            long createAt = Long.parseLong(String.valueOf(obj[8]));

            StatisticMaterialDTO statisticMaterialDTO = new StatisticMaterialDTO(id, name, code, numberInvoices, numberPurchases, numberInventory,outPutPrice, totalPurchased, createAt);


                statisticMaterialList.add(statisticMaterialDTO);

        }
        return statisticMaterialList;
    }


    @Override
    public List<StatisticServiceDTO> selectServiceAndInvoiceInfo(int storeId,String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsDAO.selectServiveAndInvoiceInfo(storeId,dateStart1,dateEnd1);
        List<StatisticServiceDTO> statisticServiceList = new ArrayList<>();


        Iterator itr = statisticServiceDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String name = String.valueOf(obj[1]);
            String code = String.valueOf(obj[2]);
            BigDecimal price = new BigDecimal(String.valueOf(obj[3]));
            int numberInvoices = Integer.parseInt(String.valueOf(obj[4]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[5]));
            long createAt = Long.parseLong(String.valueOf(obj[6]));

            StatisticServiceDTO statisticServiceDTO = new StatisticServiceDTO(id, name, code , price, numberInvoices, totalPurchased, createAt);


                statisticServiceList.add(statisticServiceDTO);

        }
        return statisticServiceList;
    }

    @Override
    public List<SalaryDTO> selectSalary(int monthS, int monthE) throws ParseException {
        List<SalaryDTO> salaryDTOS = statisticsDAO.selectSalary();
        List<SalaryDTO> salaryDTOList = new ArrayList<>();

        Iterator itr = salaryDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            BigDecimal salaryDay = new BigDecimal(String.valueOf(obj[3]));
            int month1 = Integer.parseInt(String.valueOf(obj[4]));
            int numberShiftWork = Integer.parseInt(String.valueOf(obj[5]));
            int numberShiftLateWork = Integer.parseInt(String.valueOf(obj[6]));
            BigDecimal totalPurchased = new BigDecimal(String.valueOf(obj[7]));

            SalaryDTO salaryDTO = new SalaryDTO(id, code, name , salaryDay, month1, numberShiftWork, numberShiftLateWork, totalPurchased );

            if (salaryDTO.getMonth() >= monthS && salaryDTO.getMonth() <= monthE){
                salaryDTOList.add(salaryDTO);
            }
        }
        return salaryDTOList;
    }

    @Override
    public List<RevuneDTO> selectRevune(String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<RevuneDTO> revuneDTOS = statisticsDAO.selectRevune();
        List<RevuneDTO> revuneDTOList = new ArrayList<>();


        Iterator itr = revuneDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            long createAt = Long.parseLong(String.valueOf(obj[0]));
            BigDecimal totalOutput = new BigDecimal(String.valueOf(obj[1]));

            RevuneDTO revuneDTO = new RevuneDTO(createAt, totalOutput);

            if (revuneDTO.getCreateAt() >= dateStart1 && revuneDTO.getCreateAt() <= dateEnd1){
                revuneDTOList.add(revuneDTO);
            }
        }
        return revuneDTOList;
    }
    @Override
    public NumberStatic selectNumber(int storeId,String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        BigDecimal valueInvoice = statisticsDAO.valueInvoice(storeId,dateStart1,dateEnd1);
        Integer countInvice = statisticsDAO.countInvoice(storeId,dateStart1,dateEnd1);
        Integer coutRecipt = statisticsDAO.countRecipt(storeId,dateStart1,dateEnd1);
        Integer coutPayment = statisticsDAO.countPayment(storeId,dateStart1,dateEnd1);
        NumberStatic numberStatic = new NumberStatic();
        numberStatic.setCountInvoice(countInvice);
        numberStatic.setValeInvoice(valueInvoice);
        numberStatic.setCountPayment(coutPayment);
        numberStatic.setCountRecipt(coutRecipt);
        return numberStatic;
    }

    @Override
    public List<InputMaterialDTO> selectInput(String dateStart, String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsDAO.selectInput();
        List<InputMaterialDTO> inputMaterialDTOList = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);

        Iterator itr = inputMaterialDTOS.iterator();
        while(itr.hasNext()){
            Object[] obj = (Object[]) itr.next();

            int id = Integer.parseInt(String.valueOf(obj[0]));
            String code = String.valueOf(obj[1]);
            String name = String.valueOf(obj[2]);
            BigDecimal inputPrice = new BigDecimal(String.valueOf(obj[3]));
            int quanity = Integer.parseInt(String.valueOf(obj[4]));
            BigDecimal totalMoney = new BigDecimal(String.valueOf(obj[5]));
            long createAt = Long.parseLong(String.valueOf(obj[6]));

            InputMaterialDTO inputMaterialDTO = new InputMaterialDTO(id,code,name, inputPrice, quanity, totalMoney, createAt);

            if (inputMaterialDTO.getCreateAt() >= dateStart1 && inputMaterialDTO.getCreateAt() <= dateEnd1){
                inputMaterialDTOList.add(inputMaterialDTO);
            }
        }
        return inputMaterialDTOList;
    }

    @Override
    public List<RevenuePerDayDTO> selectRevenuePerDay(int storeId,String dateStart, String dateEnd) throws ParseException {
        List<RevenuePerDayDTO> revenuePerDayDTOS = new ArrayList<>();
        List<Invoice> invoices = statisticsDAO.findAllInvoiceByDate(storeId,Common.getMilliSeconds(dateStart), Common.getMilliSeconds(dateEnd));

        //Chuyển create_at thành ngày/tháng/năm (không có thời gian)
        for (Invoice invoice : invoices){
            invoice.setCreatedAt(Common.getMilliSeconds1(Common.getDateByMilliSecond(invoice.getCreatedAt())));
        }


        val test1 = Common.getMilliSeconds(dateStart);
        val test2 = Common.getMilliSeconds(dateEnd);

        //Thêm list
        for (long i = test1 ; i <= test2; i += 86400000 ){
            RevenuePerDayDTO revenuePerDayDTO = new RevenuePerDayDTO();
            revenuePerDayDTO.setCreateAt(i);
            BigDecimal sum = new BigDecimal(0);
            for(int j = 0; j< invoices.size(); j++ ){
                if( i -invoices.get(j).getEndAt()  <=86400000 && i- invoices.get(j).getEndAt()  >=0 ){
                    sum = sum.add(invoices.get(j).getTotal());

                }
            }
            revenuePerDayDTO.setTotalOutput(sum);
            revenuePerDayDTOS.add(revenuePerDayDTO);
        }

        return revenuePerDayDTOS;
    }


}
