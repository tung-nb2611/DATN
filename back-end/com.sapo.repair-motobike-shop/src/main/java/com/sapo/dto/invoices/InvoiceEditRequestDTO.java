package com.sapo.dto.invoices;

import java.math.BigDecimal;
import java.util.List;

public class InvoiceEditRequestDTO {

        private Integer customerId;
        private Integer vehicleId;
        private Integer fixerId;
    private Integer areaId;
    private String areaName;
        private String note;
        private BigDecimal total;
        private int payMethod;
        private List<MaterialOrderRequestDTO> materialDTOS;
        private List<ServiceOrderRequestDTO> serviceDTOS;
private int confirm;


    public int getConfirm() {
        return confirm;
    }

    public void setConfirm(int confirm) {
        this.confirm = confirm;
    }

    public InvoiceEditRequestDTO(String areaName, Integer areaId, Integer customerId, Integer vehicleId, Integer fixerId, String note, BigDecimal total, int payMethod, List<MaterialOrderRequestDTO> materialDTOS, List<ServiceOrderRequestDTO> serviceDTOS, int confirm) {
        this.customerId = customerId;
        this.vehicleId = vehicleId;
        this.fixerId = fixerId;
        this.note = note;
        this.total = total;
        this.payMethod = payMethod;
        this.materialDTOS = materialDTOS;
        this.serviceDTOS = serviceDTOS;
        this.areaId=areaId;
        this.areaName=areaName;
        this.confirm=confirm;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Integer vehicleId) {
        this.vehicleId = vehicleId;
    }

    public Integer getFixerId() {
        return fixerId;
    }

    public void setFixerId(Integer fixerId) {
        this.fixerId = fixerId;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public int getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(int payMethod) {
        this.payMethod = payMethod;
    }

    public List<MaterialOrderRequestDTO> getMaterialDTOS() {
        return materialDTOS;
    }

    public void setMaterialDTOS(List<MaterialOrderRequestDTO> materialDTOS) {
        this.materialDTOS = materialDTOS;
    }

    public List<ServiceOrderRequestDTO> getServiceDTOS() {
        return serviceDTOS;
    }

    public void setServiceDTOS(List<ServiceOrderRequestDTO> serviceDTOS) {
        this.serviceDTOS = serviceDTOS;
    }
    public Integer getAreaId() {
        return areaId;
    }

    public void setAreaId(Integer areaId) {
        this.areaId = areaId;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }
}
