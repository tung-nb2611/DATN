package com.sapo.dto.invoices;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InvoiceResponse {
    private int id;
    private String code;
    private String licensePlate;
    private String fixerName;
    private String status;
    private String createDate;
    private int confirm;
    private List<MaterialOrderResponseDTO> materialOrderResponseDTOS;
    private List<ServiceOrderResponseDTO> serviceOrderResponseDTOS;


    public InvoiceResponse(int id, String code, String licensePlate, String fixerName, String status,String createDate,int confirm, List<MaterialOrderResponseDTO> materialOrderResponseDTOS, List<ServiceOrderResponseDTO> serviceOrderResponseDTOS ) {
        this.id = id;
        this.code = code;
        this.licensePlate = licensePlate;
        this.fixerName = fixerName;
        this.status = status;
        this.createDate=createDate;
        this.confirm= confirm;
        this.materialOrderResponseDTOS = materialOrderResponseDTOS;
        this.serviceOrderResponseDTOS = serviceOrderResponseDTOS;
    }


}
