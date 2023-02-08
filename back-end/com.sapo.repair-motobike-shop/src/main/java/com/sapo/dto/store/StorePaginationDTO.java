package com.sapo.dto.store;

import com.sapo.dto.common.Pagination;

import java.util.List;

public class StorePaginationDTO     {
    private List<StoreResponse> storeDTOS;
    private Pagination pagination;

    public StorePaginationDTO(List<StoreResponse> storeDTOS, Pagination pagination) {
        this.storeDTOS = storeDTOS;
        this.pagination = pagination;
    }

    public StorePaginationDTO() {

    }

    public List<StoreResponse> getStoreDTOS() {
        return storeDTOS;
    }

    public void setStoreDTOS(List<StoreResponse> storeDTOS) {
        this.storeDTOS = storeDTOS;
    }

    public Pagination getPagination() {
        return pagination;
    }

    public void setPagination(Pagination pagination) {
        this.pagination = pagination;
    }
}
