package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class InvoiceTotalDTO {
   private BigDecimal totalPrice;
   private int countInvoice;

   public InvoiceTotalDTO(BigDecimal totalPrice, int countInvoice) {
      this.totalPrice = totalPrice;
      this.countInvoice = countInvoice;
   }
   public BigDecimal getTotalPrice() {
      return totalPrice;
   }

   public void setTotalPrice(BigDecimal totalPrice) {
      this.totalPrice = totalPrice;
   }

   public int getCountInvoice() {
      return countInvoice;
   }

   public void setCountInvoice(int countInvoice) {
      this.countInvoice = countInvoice;
   }


}
