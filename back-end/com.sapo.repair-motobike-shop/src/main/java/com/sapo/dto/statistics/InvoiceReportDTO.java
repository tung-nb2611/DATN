package com.sapo.dto.statistics;

public class InvoiceReportDTO {
    private String areaName;
    private InvoiceTotalDTO invoiceTotalDTO;

    public InvoiceTotalDTO getInvoiceTotalDTO() {
        return invoiceTotalDTO;
    }

    public InvoiceReportDTO(String areaName, InvoiceTotalDTO invoiceTotalDTO) {
        this.areaName = areaName;
        this.invoiceTotalDTO = invoiceTotalDTO;
    }

    public void setInvoiceTotalDTO(InvoiceTotalDTO invoiceTotalDTO) {
        this.invoiceTotalDTO = invoiceTotalDTO;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }
}
