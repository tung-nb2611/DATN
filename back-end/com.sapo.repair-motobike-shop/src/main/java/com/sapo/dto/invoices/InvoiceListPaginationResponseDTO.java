package com.sapo.dto.invoices;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class InvoiceListPaginationResponseDTO {
    private List<InvoiceResponse> invoiceListResponseDTOS;
    private Pagination pagination;

    public InvoiceListPaginationResponseDTO(List<InvoiceResponse> invoiceListResponseDTOS, Pagination pagination) {
        this.invoiceListResponseDTOS = invoiceListResponseDTOS;
        this.pagination = pagination;
    }

    public List<InvoiceResponse> getInvoiceListResponseDTOS() {
        return invoiceListResponseDTOS;
    }

    public void setInvoiceListResponseDTOS(List<InvoiceResponse> invoiceListResponseDTOS) {
        this.invoiceListResponseDTOS = invoiceListResponseDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}
