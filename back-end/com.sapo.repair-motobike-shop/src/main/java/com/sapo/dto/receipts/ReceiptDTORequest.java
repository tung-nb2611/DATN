package com.sapo.dto.receipts;


import java.util.List;

public class ReceiptDTORequest {
    private String note;

    public int getStoreId() {
        return storeId;
    }

    public void setStoreId(int storeId) {
        this.storeId = storeId;
    }

    private  int storeId;



    private List<MaterialInputRequestDTO> materialDTOS;
    private  int type;
    public String getNote() {
        return note;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }



    public void setNote(String note) {
        this.note = note;
    }

    public List<MaterialInputRequestDTO> getMaterialDTOS() {
        return materialDTOS;
    }

    public void setMaterialDTOS(List<MaterialInputRequestDTO> materialDTOS) {
        this.materialDTOS = materialDTOS;
    }
}
