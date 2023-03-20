/* eslint-disable no-unused-vars */
import axios from "axios";
import queryString from "query-string";

const STORE_API_URL = "http://localhost:8080/api/admin/stores";

let jwt = window.sessionStorage.getItem("jwt");
axios.defaults.headers.common["Authorization"] = jwt;

const listStore = (filters) => {
  const paramsString = queryString.stringify(filters);
  return axios.get(STORE_API_URL + `/list?${paramsString}`, filters);
};
const postStore = (store) => {
  return axios.post(STORE_API_URL, store);
};
const updateStore = (id, store) => {
  return axios.put(STORE_API_URL + "/" + id, store);
};

const deleteStore = (id) => {
  return axios.put(STORE_API_URL + "/delete/" + id);
};
const getStoreById = (store_id) => {
  return axios.get(STORE_API_URL + "/" + store_id);
};

export default {
  listStore,
  postStore,
  updateStore,
  deleteStore,
  getStoreById,
};
