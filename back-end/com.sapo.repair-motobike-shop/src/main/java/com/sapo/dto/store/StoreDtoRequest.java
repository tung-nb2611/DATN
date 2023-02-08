package com.sapo.dto.store;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class StoreDtoRequest {
    @NotNull(message = "Tên của hàng không được để trống")
    @NotBlank(message = "Tên của hàng không được để trống")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
