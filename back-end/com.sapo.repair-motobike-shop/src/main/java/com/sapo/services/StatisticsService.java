package com.sapo.services;

import com.sapo.dto.statistics.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public interface StatisticsService {

    List<InvoiceReportDTO> selectInvoiceReport (int store_id,String dateStart, String dateEnd)throws ParseException;

    List<StatisticsCustomerDTO> selectCustomerAndInvoiceInfo(int stroeId,String dateStart, String dateEnd) throws ParseException;

    List<StatisticMaterialDTO> selectMaterialAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException;

    List<StatisticServiceDTO> selectServiceAndInvoiceInfo(int storeId,String dateStart, String dateEnd) throws ParseException;

    List<SalaryDTO> selectSalary(int monthS, int monthE) throws ParseException;

    List<RevuneDTO> selectRevune( String dateStart, String dateEnd) throws ParseException;
    NumberStatic selectNumber( int storeId,String dateStart, String dateEnd) throws ParseException;

    List<InputMaterialDTO> selectInput(String dateStart, String dateEnd) throws ParseException;

    List<RevenuePerDayDTO> selectRevenuePerDay(int storeId,String dateStart, String dateEnd) throws ParseException;
}
