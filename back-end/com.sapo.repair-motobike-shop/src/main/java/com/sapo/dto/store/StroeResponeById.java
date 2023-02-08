package com.sapo.dto.store;

public class StroeResponeById {
    private int id;
    private String code;
    private String name;
    private String address;
    private String createDate;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public StroeResponeById(int id, String code, String name, String address , String createDate) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.address = address;
        this.createDate = createDate;
    }

}
