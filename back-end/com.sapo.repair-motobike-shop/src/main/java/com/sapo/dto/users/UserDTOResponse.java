package com.sapo.dto.users;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTOResponse {
    private int id;
    private String code;
    private String name;
    private String phone;
    private String status;
    private  String role;

    public UserDTOResponse(int id, String code, String name, String phone, String status, String role) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.phone = phone;
        this.status = status;
        this.role = role;
    }
}
