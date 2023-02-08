package com.sapo.dto.Area;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class AreaDtoRequest {
    @NotNull(message = "Tên của hàng không được để trống")
    @NotBlank(message = "Tên của hàng không được để trống")
    private String name;
    private int status;
private  int store_id;
    public String getName() {
        return name;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStore_id() {
        return store_id;
    }

    public void setStore_id(int store_id) {
        this.store_id = store_id;
    }

    public void setName(String name) {
        this.name = name;
    }

}
