package com.sapo.services.impl;

import com.sapo.common.Common;
import com.sapo.dao.jpa.StoreDao;
import com.sapo.dto.common.Pagination;
import com.sapo.dto.store.StoreDtoRequest;
import com.sapo.dto.store.StorePaginationDTO;
import com.sapo.dto.store.StoreResponse;
import com.sapo.dto.store.StroeResponeById;
import com.sapo.dto.users.UserDTOResponseById;
import com.sapo.entities.Store;
import com.sapo.repositories.StoreRepository;
import com.sapo.services.StoreService;
import com.sapo.validate.InputValidate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class StoreServiceImpl implements StoreService {
    private final StoreRepository storeRepository;
    private final StoreDao storeDao;

    private static final Logger LOGGER = LoggerFactory.getLogger(StoreServiceImpl.class.toString());

    public StoreServiceImpl(StoreRepository storeRepository, StoreDao storeDao) {
        this.storeRepository = storeRepository;
        this.storeDao = storeDao;
    }
    @Override
    public List<Store> findAllStore(){
        List<Store> stores = storeDao.findAllStore();
        return stores;
    }
    @Override
    public StroeResponeById findUserDTOById(int id) {
        Store store = storeDao.findStoreById(id);
        StroeResponeById stroeResponeById = new StroeResponeById(store.getId(), store.getCode(),store.getName(), store.getAddress(),Common.getDateByMilliSeconds(store.getCreatedAt()));
        return stroeResponeById;
    }
    @Override
    public Store findstoreById(int id) {
        Store store = storeDao.findStoreById(id);
        return store;
    }

    // thêm store
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void saveStore(StoreDtoRequest storeDTO) {
        Store store = new Store();
        List<Store> stores = storeDao.findAllStore();
        InputValidate.validateStoreName(storeDTO.getName(), stores);

        store.setCode(Common.GenerateCodeStore());
        store.setName(storeDTO.getName());
        store.setAddress(storeDTO.getAddress());
        store.setCreatedAt();
        saveStoreRepository(store);
    }

    // sửa Service
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void updateStore(int id, StoreDtoRequest StoreDtoRequest) {
        Store store = storeDao.findStoreById(id);

        if (StoreDtoRequest.getName() != null) {
            store.setName(StoreDtoRequest.getName());
        }
        if (StoreDtoRequest.getAddress() != null) {
            store.setAddress(StoreDtoRequest.getAddress());
        }


        store.setUpdatedAt();
        saveStoreRepository(store);

    }

    //Hàm lưu store bằng ServiceRepository
    private void saveStoreRepository(Store store) {
        try {
            storeRepository.save(store);
        } catch (Exception e) {
            LOGGER.error("ERROR: {} | Save service", store);
        }
    }
    //Hàm xóa user
    @Override
    public void deleteStore(int id){
        Store store = findstoreById(id);

            store.setDeletedAt();
        saveStoreRepository(store);

    }
    private StorePaginationDTO findAllStorePaginationDTO (int page, int limit, List<StoreResponse> storeDTOS){
        List<StoreResponse> storeDTOList = new ArrayList<StoreResponse>();
        if ((storeDTOS.size() - (page * limit - limit)) > limit) {
            for (int i = page * limit - limit; i < page * limit; i++) {
                storeDTOList.add(storeDTOS.get(i));
            }
        } else {
            for (int i = page * limit - limit; i < storeDTOS.size(); i++) {
                storeDTOList.add(storeDTOS.get(i));
            }
        }
        Pagination pagination = new Pagination(page, limit, storeDTOS.size());
        StorePaginationDTO storePaginationDTO = new StorePaginationDTO(storeDTOList, pagination);
        return storePaginationDTO;
    }
    // Chuyển store sang storeDTO
    private List<StoreResponse> transferStoreToServiceDTO(List<Store> stores){
        List<StoreResponse> storeDTOS = new ArrayList<>();
        stores.forEach(store -> {
            StoreResponse storeDTO= new StoreResponse(store.getId(), store.getCode(), store.getName() , store.getAddress());
            storeDTOS.add(storeDTO);
        });
        return storeDTOS;
    }
    private StorePaginationDTO findAllStoreDTO(int page, int limit, List<Store> stores){
        List<StoreResponse> storeDTOS = transferStoreToServiceDTO(stores);
        StorePaginationDTO storePaginationDTO = findAllStorePaginationDTO(page,  limit, storeDTOS);
        return storePaginationDTO;
    }
    @Override
    public StorePaginationDTO searchStoreOrder(int page, int limit) {
        List<Store> stores = storeDao.findAllStore();
        StorePaginationDTO storePaginationDTO = findAllStoreDTO(page,limit,stores);

        return storePaginationDTO;
    }
}
