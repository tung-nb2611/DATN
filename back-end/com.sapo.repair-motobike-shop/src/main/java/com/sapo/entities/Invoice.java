package com.sapo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_invoices")
public class Invoice extends BaseEntity {
    @Column(name = "total", nullable = true)
    private BigDecimal total;
    
    @Column(name = "status", nullable = true)
    private int status;
    
    @Column(name = "pay_method", nullable = true)
    private int payMethod;
    @Column(name = "area_id", nullable = true)
    private Integer area_id;
    @Column(name = "note", nullable = true)
    private String note;
    
    @Column(name = "fixer_id")
    private Integer fixerId;


    public Integer getArea_id() {
        return area_id;
    }

    public void setArea_id(Integer area_id) {
        this.area_id = area_id;
    }

    @Column(name = "vehicle_customer_id")
    private Integer vehicleCustomerId;
    
    public BigDecimal getTotal() {
        return total;
    }
    
    public void setTotal(BigDecimal total) {
        this.total = total;
    }
    
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public int getPayMethod() {
        return payMethod;
    }
    
    public void setPayMethod(int payMethod) {
        this.payMethod = payMethod;
    }
    
    public String getNote() {
        return note;
    }
    
    public void setNote(String note) {
        this.note = note;
    }
    
    public Integer getFixerId() {
        return fixerId;
    }
    
    public void setFixerId(Integer fixerId) {
        this.fixerId = fixerId;
    }
    
    public Integer getVehicleCustomerId() {
        return vehicleCustomerId;
    }
    
    public void setVehicleCustomerId(Integer vehicleCustomerId) {
        this.vehicleCustomerId = vehicleCustomerId;
    }
}
