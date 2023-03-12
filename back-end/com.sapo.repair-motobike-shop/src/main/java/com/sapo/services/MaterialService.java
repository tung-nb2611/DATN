package com.sapo.services;

import com.sapo.dto.materials.*;
import com.sapo.entities.Material;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;

@Service
public interface MaterialService {

    //hàm tìm tất cả phụ kiện đang sử dụng
     List<Material> findAllMaterialUsing(int store_id,String keyword);

    // Hàm lưu material
    @Transactional(rollbackOn = Exception.class)
    void saveMaterial(MaterialDTORequest materialDTO) throws IOException;

    @Transactional(rollbackOn = Exception.class)
    void saveImage(int id, MultipartFile image) throws IOException;

    //Hàm tìm material bằng id
    Material findMaterialById(int id);


    //Hàm update Material
    @Transactional(rollbackOn = Exception.class)
    void updateMaterial(int id, MaterialDTOUpdateRequest materialDTOUpdateRequest);

    //Hàm đổi trạng thái
    MaterialDTOResponse changeStatusMaterial(int id);

    //Hàm search Material
    MaterialPaginationDTO searchMaterial(int store_id,int page, int limit, String keyword, int status);

    // hàm delete Material
    MaterialDTOResponse deleteMaterial(int id);
    // hàm delete list Material
    List<MaterialDTOResponse>deleteListMaterial(List <Integer> ids);

    //hàm tạo mới phụ kiện ở phiếu nhập
    void saveMaterialInReceipt (MaterialNewDTO material);
}
