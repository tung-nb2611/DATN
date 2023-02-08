package com.sapo.services;
import com.sapo.dto.store.StoreDtoRequest;
import com.sapo.dto.store.StorePaginationDTO;
import com.sapo.dto.store.StroeResponeById;
import com.sapo.dto.users.UserDTOResponseById;
import com.sapo.entities.Store;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public interface StoreService {
    // Tạo store
    @Transactional(rollbackOn = Exception.class)
    void saveStore(StoreDtoRequest storeDtoRequest) throws IOException;
    // sửa store
    @Transactional(rollbackOn = Exception.class)
    void updateStore(int id, StoreDtoRequest storeDtoRequest) throws IOException;
    //Hàm tìm store bằng id
    Store findstoreById(int id);
    StroeResponeById findUserDTOById(int id);
    List<Store> findAllStore();
    // xoa store
    void deleteStore(int id);
    StorePaginationDTO searchStoreOrder(int page, int limit );
}
