package com.sapo.dto.invoices;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class InvoiceResponseDTO {
    private int id;
    private String code;
    private String licensePlate;
    private String fixerName;
    private String status;

    public InvoiceResponseDTO(int id, String code, String licensePlate, String fixerName, String status) {
        this.id = id;
        this.code = code;
        this.licensePlate = licensePlate;
        this.fixerName = fixerName;
        this.status = status;

    }


}
