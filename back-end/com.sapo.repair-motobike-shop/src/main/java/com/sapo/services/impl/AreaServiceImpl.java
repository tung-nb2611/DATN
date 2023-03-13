package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.common.ConstantVariableCommon;
import com.sapo.dao.jpa.*;
import com.sapo.dto.Area.AreaDtoRequest;
import com.sapo.dto.Area.AreaResponeById;
import com.sapo.dto.Area.AreaResponse;
import com.sapo.dto.Area.AreasResponse;
import com.sapo.dto.invoices.InvoiceMaterialResponseDTO;
import com.sapo.entities.*;
import com.sapo.repositories.AreaRepository;
import com.sapo.services.AreaService;
import lombok.val;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class AreaServiceImpl implements AreaService {
    private final AreaRepository areaRepository;
    private final AreaDao areaDao;
    private final InvoiceDAO invoiceDAO;
    private final VehicleDAO vehicleDAO;
    private final CustomerDAO customerDAO;
    private final UserDAO userDAO;

    private static final Logger LOGGER = LoggerFactory.getLogger(AreaServiceImpl.class.toString());

    public AreaServiceImpl(AreaRepository areaRepository, AreaDao areaDao,UserDAO userDAO,InvoiceDAO invoiceDAO,VehicleDAO vehicleDAO,CustomerDAO customerDAO) {
        this.areaRepository = areaRepository;
        this.areaDao = areaDao;
        this.invoiceDAO=invoiceDAO;
        this.vehicleDAO=vehicleDAO;
        this.userDAO=userDAO;
        this.customerDAO=customerDAO;
    }
    @Override
    public AreasResponse findAllArea(int store_id){
        val areas = areaDao.findAllArea(store_id);
        List<AreaResponse> areasResponse = new ArrayList<>();
        List<Integer> list = new ArrayList<Integer>();
        list.add(3);
        for (val test : areas ){
            AreaResponse area = new AreaResponse();
            if(test.getStatus() == 2)
            {
                val test1 = invoiceDAO.findAllInvoiceInProcess(test.getId()); InvoiceMaterialResponseDTO invoiceListResponseDTOS = transferInvoiceToInvoiceMaterialDTO(test1);
                area.setInvoice(invoiceListResponseDTOS);
                area.setCode(test.getCode());
            }
            area.setName(test.getName());
            area.setStatus(test.getStatus());
            area.setId(test.getId());
            area.setCode(test.getCode());
            areasResponse.add(area);
        }
        return new AreasResponse(areasResponse);
    }
    @Override
    public AreasResponse findAllAreaBystatus(int store_id,  List<Integer> status){
        val areas = areaDao.findAllAreaByStatus(store_id,status);
        List<AreaResponse> areasResponse = new ArrayList<>();
        List<Integer> list = new ArrayList<Integer>();
        list.add(3);
        for (val test : areas ){
            AreaResponse area = new AreaResponse();
            if(test.getStatus() == 2)
            {
                val test1 = invoiceDAO.findAllInvoiceInProcess(test.getId());
                InvoiceMaterialResponseDTO invoiceListResponseDTOS = transferInvoiceToInvoiceMaterialDTO(test1);
                if(test1 != null){
                area.setInvoice(invoiceListResponseDTOS);
                area.setCode(test.getCode());
                }
            }
            area.setName(test.getName());
            area.setStatus(test.getStatus());
            area.setId(test.getId());
            area.setCode(test.getCode());
            areasResponse.add(area);
        }
        return new AreasResponse(areasResponse);
    }
    @Override
    public AreaResponeById findAreaDTOById(int id) {
        Areas areas = areaDao.findAreaById(id);
        AreaResponeById areaResponeById = new AreaResponeById(areas.getId(), areas.getCode(),areas.getName(), areas.getStatus());
        return areaResponeById;
    }
    @Override
    public Areas findAreaById(int id) {
        Areas areas = areaDao.findAreaById(id);
        return areas;
    }

    // thêm khu vuc
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveArea(AreaDtoRequest areaDTO) {
        Areas areas = new Areas();
         areas.setCode(Common.GenerateAreaStore());
        areas.setName(areaDTO.getName());
        areas.setStatus(1);
        areas.setCreatedAt();
        areas.setStore(areaDTO.getStore_id());
        saveAreaRepository(areas);
    }

    // sửa Service
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateArea(int id, AreaDtoRequest areaDtoRequest) {
        Areas areas = areaDao.findAreaById(id);

        if (areaDtoRequest.getName() != null) {
            areas.setName(areaDtoRequest.getName());
        }
        if (areaDtoRequest.getStatus() != 1) {
            areas.setStatus(areaDtoRequest.getStatus());
        }


        areas.setUpdatedAt();
        saveAreaRepository(areas);

    }
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void changeStatusArea(int id, int status){
        Areas areas = areaDao.findAreaById(id);
        areas.setStatus(status);
        saveAreaRepository(areas);
    }


    //Hàm lưu store bằng ServiceRepository
    private void saveAreaRepository(Areas areas) {
        try {
            areaRepository.save(areas);
        } catch (Exception e) {
            LOGGER.error("ERROR: {} | Save service", areas);
        }
    }
    //Hàm xóa user
    @Override
    public void deleteArea(int id){
        Areas areas = findAreaById(id);
        areas.setDeletedAt();
        areas.setStatus(3);
        saveAreaRepository(areas);

    }
    private InvoiceMaterialResponseDTO  transferInvoiceToInvoiceMaterialDTO(Invoice invoice)
    {
        InvoiceMaterialResponseDTO invoiceListResponseDTOS;


            Customer customer = customerDAO.findCustomerById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getCustomerId());
            if(invoice.getFixerId() ==null )
            {
                if(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId() == null){
                    InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(), "","", customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                    invoiceListResponseDTOS=invoiceResponseDTO;
                }else {
                    Vehicle vehicle = vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId());
                    InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(), vehicle.getLicensePlate(),"", customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                    invoiceListResponseDTOS=invoiceResponseDTO;
                }

            } else{
                Vehicle vehicle = vehicleDAO.findVehicleById(vehicleDAO.findVehicleCustomerById(invoice.getVehicleCustomerId()).getVehicleId());
                User user = userDAO.findUserById(invoice.getFixerId());
                InvoiceMaterialResponseDTO invoiceResponseDTO = new InvoiceMaterialResponseDTO(invoice.getId(), invoice.getCode(),vehicle.getLicensePlate(),user.getName(), customer.getName(), customer.getPhone(), ConstantVariableCommon.statusInvoiceIntToString(invoice.getStatus()));
                invoiceListResponseDTOS = invoiceResponseDTO;
            }


        return invoiceListResponseDTOS;
    }
//    private StorePaginationDTO findAllStorePaginationDTO (int page, int limit, List<StoreResponse> storeDTOS){
//        List<StoreResponse> storeDTOList = new ArrayList<StoreResponse>();
//        if ((storeDTOS.size() - (page * limit - limit)) > limit) {
//            for (int i = page * limit - limit; i < page * limit; i++) {
//                storeDTOList.add(storeDTOS.get(i));
//            }
//        } else {
//            for (int i = page * limit - limit; i < storeDTOS.size(); i++) {
//                storeDTOList.add(storeDTOS.get(i));
//            }
//        }
//        Pagination pagination = new Pagination(page, limit, storeDTOS.size());
//        StorePaginationDTO storePaginationDTO = new StorePaginationDTO(storeDTOList, pagination);
//        return storePaginationDTO;
//    }
//    // Chuyển store sang storeDTO
//    private List<StoreResponse> transferStoreToServiceDTO(List<Store> stores){
//        List<StoreResponse> storeDTOS = new ArrayList<>();
//        stores.forEach(store -> {
//            StoreResponse storeDTO= new StoreResponse(store.getId(), store.getCode(), store.getName() , store.getAddress());
//            storeDTOS.add(storeDTO);
//        });
//        return storeDTOS;
//    }
//    private StorePaginationDTO findAllStoreDTO(int page, int limit, List<Store> stores){
//        List<StoreResponse> storeDTOS = transferStoreToServiceDTO(stores);
//        StorePaginationDTO storePaginationDTO = findAllStorePaginationDTO(page,  limit, storeDTOS);
//        return storePaginationDTO;
//    }
//    @Override
//    public StorePaginationDTO searchStoreOrder(int page, int limit) {
//        List<Store> stores = storeDao.findAllStore();
//        StorePaginationDTO storePaginationDTO = findAllStoreDTO(page,limit,stores);
//
//        return storePaginationDTO;
//    }
}
