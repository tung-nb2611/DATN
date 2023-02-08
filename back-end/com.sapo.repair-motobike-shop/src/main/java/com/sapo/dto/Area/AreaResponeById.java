package com.sapo.dto.Area;

public class AreaResponeById {
    private int id;
    private String code;
    private String name;
    private int  status;

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

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public AreaResponeById(int id, String code, String name, int  status ) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.status = status;

    }

}
