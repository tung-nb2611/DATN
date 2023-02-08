package com.sapo.entities;

import javax.persistence.*;

@Entity
@Table(name = "tbl_areas")
public class Areas extends BaseEntity{
    @Column(name = "name", length = 100, nullable = true)
    private String name;
    @Column(name = "store_id", nullable = true)
    private Integer store;

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Column(name = "status", nullable = true)
    private int status;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStore() {
        return store;
    }

    public void setStore(Integer store) {
        this.store = store;
    }


}
