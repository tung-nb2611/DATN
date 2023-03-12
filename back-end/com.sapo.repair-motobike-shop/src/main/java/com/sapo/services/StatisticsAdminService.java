package com.sapo.services;

import com.sapo.dto.statistics.*;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public interface StatisticsAdminService {


    List<StatisticsCustomerDTO> selectCustomerAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException;

    List<StatisticMaterialDTO> selectMaterialAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException;

    List<StatisticServiceDTO> selectServiceAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException;


    List<RevuneDTO> selectRevune( String dateStart, String dateEnd) throws ParseException;
    NumberStatic selectNumber(String dateStart, String dateEnd) throws ParseException;

    List<InputMaterialDTO> selectInput(String dateStart, String dateEnd) throws ParseException;

    List<RevenuePerDayDTO> selectRevenuePerDay(String dateStart, String dateEnd) throws ParseException;
    List<StoreStacticRepones> selectValueStore(String dateStart, String dateEnd) throws ParseException;
}
