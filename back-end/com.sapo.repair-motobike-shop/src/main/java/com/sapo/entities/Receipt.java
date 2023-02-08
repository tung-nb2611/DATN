package com.sapo.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "tbl_receipts")
public class Receipt extends BaseEntity {

    @Column(name = "note", length = 500, nullable = true)
    private String note;

    @Column(name = "status", nullable = true)
    private int status;
    @Column(name = "store_id", nullable = true)
    private int store_id;

    public int getStore_id() {
        return store_id;
    }

    public void setStore_id(int store_id) {
        this.store_id = store_id;
    }



    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
