package com.sapo.dto.statistics;

import com.sapo.dto.invoices.InvoiceResponse;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class CustomerStatic {
    private String code;
    private String name;
    private String phone;
    private String licensePlate;
    private BigDecimal totalPrice;
    private int countInvoice;
    private List<InvoiceResponse> invoices;

}
