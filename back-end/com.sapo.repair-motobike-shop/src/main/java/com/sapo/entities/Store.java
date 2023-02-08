package com.sapo.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_stores")
public class Store extends BaseEntity{
    @Column(name = "name", length = 100, nullable = true)
    private String name;
    @Column(name = "address", length = 100, nullable = true)
    private String address;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "store"
            , fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<User>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


}
