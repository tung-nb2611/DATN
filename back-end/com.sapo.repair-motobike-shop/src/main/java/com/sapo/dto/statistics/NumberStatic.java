package com.sapo.dto.statistics;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class NumberStatic {
    private BigDecimal valeInvoice;
    private int countRecipt;
    private int countPayment;
    private int countInvoice;

}
