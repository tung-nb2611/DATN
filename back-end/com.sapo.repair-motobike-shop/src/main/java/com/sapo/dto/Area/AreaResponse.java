package com.sapo.dto.Area;


import com.sapo.dto.invoices.InvoiceMaterialResponseDTO;

public class AreaResponse {
    private int id;
    private String code;
    private String name;

    public Long getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Long updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(Long deletedAt) {
        this.deletedAt = deletedAt;
    }
    private InvoiceMaterialResponseDTO invoice ;

    private Integer status;

    public InvoiceMaterialResponseDTO getInvoice() {
        return invoice;
    }

    public void setInvoice(InvoiceMaterialResponseDTO invoice) {
        this.invoice = invoice;
    }

    private Long updatedAt;
    private Long deletedAt;

//    public AreaResponse(int id, String code, String name, int status, List<InvoiceMaterialResponseDTO> invoice) {
//        this.id = id;
//        this.code = code;
//        this.name = name;
//        this.status = status;
//        this.invoice = invoice;
//    }

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

    public String getName() {
        return name;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public void setName(String name) {
        this.name = name;
    }


}
