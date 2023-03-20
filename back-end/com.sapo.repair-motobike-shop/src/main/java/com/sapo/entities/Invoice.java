package com.sapo.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;
@Getter
@Setter
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
    @Column(name = "store_id")
    private Integer stroeId;
    @Column(name = "end_at")
    private Long endAt;
    @Column(name = "confirm")
    private int confirm;


    @Column(name = "vehicle_customer_id")
    private Integer vehicleCustomerId;


}
