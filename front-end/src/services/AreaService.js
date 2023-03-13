/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const AREA_API_URL = "http://localhost:8080/api/admin/areas";

let jwt = window.sessionStorage.getItem('jwt')
axios.defaults.headers.common['Authorization'] = jwt;

const listArea = (filters) => {
    const paramsString = queryString.stringify(filters);
    return axios.get(AREA_API_URL + `/list?${paramsString}`, filters);
}
const postArea = (area) => {
    return axios.post(AREA_API_URL, area);
};
const updateArea = (id, area) => {
    return axios.put(AREA_API_URL + "/" + id, area);
};


const deleteArea = (id) => {
    return axios.put(AREA_API_URL + "/delete/" + id);
}
const getAreaById = (area_id) => {
    return axios.get(AREA_API_URL + "/" + area_id);
};


export default {
    listArea,
    postArea,
    updateArea,
    deleteArea,
    getAreaById
}

