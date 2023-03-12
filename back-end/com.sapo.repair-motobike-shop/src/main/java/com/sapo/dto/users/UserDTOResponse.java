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


}
