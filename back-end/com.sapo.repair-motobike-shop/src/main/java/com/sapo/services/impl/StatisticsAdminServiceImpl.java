package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.dao.jpa.*;
import com.sapo.dto.statistics.*;
import com.sapo.entities.Areas;
import com.sapo.entities.Invoice;
import com.sapo.entities.Store;
import com.sapo.services.StatisticsAdminService;
import com.sapo.services.StatisticsService;
import lombok.val;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class StatisticsAdminServiceImpl implements StatisticsAdminService {
    private final StatisticsAdminDAO statisticsAdminDAO;
    private final AreaDao areaDao;
    private  final VehicleCustomerDAO vehicleCustomerDAO;
    private  final CustomerDAO customerDAO;
    private  final  StoreDao storeDao;

    public StatisticsAdminServiceImpl(StoreDao storeDao,StatisticsAdminDAO statisticsAdminDAO, AreaDao areaDao, VehicleCustomerDAO vehicleCustomerDAO, CustomerDAO customerDAO) {
        this.storeDao=storeDao;
        this.statisticsAdminDAO = statisticsAdminDAO;
        this.areaDao = areaDao;
        this.vehicleCustomerDAO=vehicleCustomerDAO;
        this.customerDAO = customerDAO;

    }

    //Hàm thống số hóa đơn và tổng tiền các hóa đơn của khách hàng
    @Override
    public List<StatisticsCustomerDTO> selectCustomerAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {


        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<StatisticsCustomerDTO> statisticsCustomerDTOS = statisticsAdminDAO.selectCustomerAndInvoicesInfo(dateStart1, dateEnd1);
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
        List<StatisticMaterialDTO> statisticMaterialDTOS = statisticsAdminDAO.selectMaterialAndInvoiceInfo(dateStart1,dateEnd1);
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
    public List<StatisticServiceDTO> selectServiceAndInvoiceInfo(String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<StatisticServiceDTO> statisticServiceDTOS = statisticsAdminDAO.selectServiveAndInvoiceInfo(dateStart1,dateEnd1);
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
    public List<RevuneDTO> selectRevune(String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
        List<RevuneDTO> revuneDTOS = statisticsAdminDAO.selectRevune();
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
    public NumberStatic selectNumber(String dateStart, String dateEnd) throws ParseException {
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd) +86400000;
        BigDecimal valueInvoice = statisticsAdminDAO.valueInvoice(dateStart1,dateEnd1);
        Integer countInvice = statisticsAdminDAO.countInvoice(dateStart1,dateEnd1);
        Integer coutRecipt = statisticsAdminDAO.countRecipt(dateStart1,dateEnd1);
        Integer coutPayment = statisticsAdminDAO.countPayment(dateStart1,dateEnd1);
        NumberStatic numberStatic = new NumberStatic();
        numberStatic.setCountInvoice(countInvice);
        numberStatic.setValeInvoice(valueInvoice);
        numberStatic.setCountPayment(coutPayment);
        numberStatic.setCountRecipt(coutRecipt);
        return numberStatic;
    }

    @Override
    public List<InputMaterialDTO> selectInput(String dateStart, String dateEnd) throws ParseException {
        List<InputMaterialDTO> inputMaterialDTOS = statisticsAdminDAO.selectInput();
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
    public List<RevenuePerDayDTO> selectRevenuePerDay(String dateStart, String dateEnd) throws ParseException {
        List<RevenuePerDayDTO> revenuePerDayDTOS = new ArrayList<>();
        List<Invoice> invoices = statisticsAdminDAO.findAllInvoiceByDate(Common.getMilliSeconds(dateStart), Common.getMilliSeconds(dateEnd));

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
                if( i-invoices.get(j).getEndAt()  <=86400000 && i -invoices.get(j).getEndAt()  >=0 ){
                    sum = sum.add(invoices.get(j).getTotal());

                }
            }
            revenuePerDayDTO.setTotalOutput(sum);
            revenuePerDayDTOS.add(revenuePerDayDTO);
        }

        return revenuePerDayDTOS;
    }

    @Override
    public List<StoreStacticRepones> selectValueStore(String dateStart, String dateEnd) throws ParseException {
        List<StoreStacticRepones> storeStacticRepones = new ArrayList<>();
        long dateStart1 = Common.getMilliSeconds(dateStart);
        long dateEnd1 = Common.getMilliSeconds(dateEnd);
List<Store> stores = storeDao.findAllStore();
for(val store : stores){
    val count = statisticsAdminDAO.getCountInbvoice(store.getId(),dateStart1,dateEnd1);
    val price = statisticsAdminDAO.getSumInbvoice(store.getId(),dateStart1,dateEnd1);
    StoreStacticRepones storeStacticRepones1 = new StoreStacticRepones();
    if(price ==null)
    {    storeStacticRepones1.setPirce(BigDecimal.valueOf(0));
        storeStacticRepones1.setCount(count);
        storeStacticRepones1.setName(store.getName());
        storeStacticRepones.add(storeStacticRepones1);
    }else {
        storeStacticRepones1.setCount(count);
        storeStacticRepones1.setPirce(price);
        storeStacticRepones1.setName(store.getName());
        storeStacticRepones.add(storeStacticRepones1);
    }

}
    return storeStacticRepones;

    }


}
