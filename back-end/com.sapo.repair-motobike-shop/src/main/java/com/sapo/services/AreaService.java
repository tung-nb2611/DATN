package com.sapo.services;

import com.sapo.dto.Area.AreaDtoRequest;
import com.sapo.dto.Area.AreaResponeById;
import com.sapo.dto.Area.AreasResponse;
import com.sapo.entities.Areas;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public interface AreaService {
    // Tạo khu vực
    @Transactional(rollbackOn = Exception.class)
    void saveArea(AreaDtoRequest areaDtoRequest) throws IOException;
    // sửa khu vưc
    @Transactional(rollbackOn = Exception.class)
    void updateArea(int id, AreaDtoRequest areaDtoRequest) throws IOException;

    @Transactional(rollbackOn = Exception.class)
    void changeStatusArea(int id,int status) throws IOException;
    //Hàm tìm khu vuc bằng id
    Areas findAreaById(int id);
    AreaResponeById findAreaDTOById(int id);
     AreasResponse findAllArea(int store_id);
    AreasResponse findAllAreaBystatus(int store_id, List<Integer> status);
    // xoa khu vuc
    void deleteArea(int id);
//    StorePaginationDTO searchStoreOrder(int page, int limit );
}
