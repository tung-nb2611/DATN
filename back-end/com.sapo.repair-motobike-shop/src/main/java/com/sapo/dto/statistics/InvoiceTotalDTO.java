package com.sapo.dto.statistics;

import java.math.BigDecimal;

public class InvoiceTotalDTO {
   private int totalPrice;
   private int countInvoice;

   public InvoiceTotalDTO(int totalPrice, int countInvoice) {
      this.totalPrice = totalPrice;
      this.countInvoice = countInvoice;
   }
   public int getTotalPrice() {
      return totalPrice;
   }

   public void setTotalPrice(int totalPrice) {
      this.totalPrice = totalPrice;
   }

   public int getCountInvoice() {
      return countInvoice;
   }

   public void setCountInvoice(int countInvoice) {
      this.countInvoice = countInvoice;
   }


}
