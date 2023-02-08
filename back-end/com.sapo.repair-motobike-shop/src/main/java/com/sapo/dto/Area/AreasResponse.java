package com.sapo.dto.Area;

import com.sapo.dto.common.Pagination;
import com.sapo.dto.store.StoreResponse;

import java.util.List;

public class AreasResponse {
    private List<AreaResponse> areas;
    public AreasResponse(List<AreaResponse> areas) {
        this.areas = areas;

    }

    public List<AreaResponse> getAreas() {
        return areas;
    }

    public void setAreas(List<AreaResponse> areas) {
        this.areas = areas;
    }
}
