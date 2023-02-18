package com.sapo.dto.receipts;


import java.util.List;

public class ReceiptDTOResponse {
    private int id;
    private String code;
    private String createDate;
    private String status;
    private String total;
    private int type;
    private List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs;



    public ReceiptDTOResponse(int id, String code, String createDate, String status, String total,int type, List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs) {
        this.id = id;
        this.code = code;
        this.createDate = createDate;
        this.status = status;
        this.total = total;
        this.type=type;
        this.receiptMaterialResponseDTOs=receiptMaterialResponseDTOs;
    }
    
    public ReceiptDTOResponse(int id, String code, String createDate, String status) {
        this.id = id;
        this.code = code;
        this.createDate = createDate;
        this.status = status;
    }
    
    public ReceiptDTOResponse() {
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
    
    public String getTotal() {
        return total;
    }
    
    public void setTotal(String total) {
        this.total = total;
    }
    public List<ReceiptMaterialResponseDTO> getReceiptMaterialResponseDTOs() {
        return receiptMaterialResponseDTOs;
    }

    public void setReceiptMaterialResponseDTOs(List<ReceiptMaterialResponseDTO> receiptMaterialResponseDTOs) {
        this.receiptMaterialResponseDTOs = receiptMaterialResponseDTOs;
    }
}
