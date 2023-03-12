/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "../../components/Pagination/pagination";
import "../../assets/css/services/service.css";
import FiltersForm from "../FiltersForm/ServiceSearch.js";
import LimitPagination from "components/Pagination/limitPagination.js";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from "../../components/Snackbar/Snackbar.js";
import ServicesService from "services/ServicesService";
// core components

import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  spanRight: {
    textAlign: "right",
    marginRight: "0",
  },
};

const useStyles = makeStyles(styles);

export default function (props) {
  React.useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setTl of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const [messageSuccess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [tl, setTl] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changePrice = (event) => {
    setPrice(event.target.value);
  };
  const [page, setPage] = React.useState(0);
  const [id, setId] = useState("");

  const [services, setServices] = useState([]);

  const [serviceId, setServiceId] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalServiceClass, setModalServiceClass] = useState("");

  const [warningClass, setWarningClass] = useState("");
  const [warningModalClass, setWarningModalClass] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
  });

  function handlePageChange(newPage) {
    // console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(e) {
    // console.log("New filters: ", newFilters);
    const value = e.target.value;
    setFilters({
      ...filters,
      _page: 1,
      keyword: value,
    });
  }
  function handleChangeLimit(newLimit) {
    // console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      _page: 1,
      limit: newLimit.limit,
    });
  }
  const handleChangePage = (event, newPage) => {
    setFilters({
      ...filters,
      page: newPage + 1,
    });
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const pauseService = () => {
    props.history.push("/admin/services/pause-service");
  };

  const getlistServiceCanReturn = () => {
    props.history.push("/admin/services/return-service");
  };

  useEffect(() => {
    async function fetchServiceList() {
      try {
        ServicesService.getListService(filters)
          .then((res) => {
            const data = res.data.serviceDTOS;
            const pagination = res.data.pagination;

            setServices(
              data.map((service) => {
                return {
                  select: false,
                  id: service.id,
                  code: service.code,
                  name: service.name,
                  description: service.description,
                  price: service.price,
                  status: service.status,
                };
              })
            );
            setPagination(pagination);
            console.log(data);
            console.log(pagination);
            setIsLoaded(true);
          })
          .catch(function (error) {
            console.log("ERROR: " + error.response.data.status);
            if (error.response.data.status == 403) {
              alert("Không có quyền truy cập!");
            }
          });
      } catch (error) {
        console.log("Failed to fetch service list: ", error.message);
        setError(error);
      }
    }
    fetchServiceList();
  }, [filters]);

  const putService = (e) => {
    e.preventDefault();
    let service = { name, description, price };
    console.log("service => " + JSON.stringify(service));
    ServicesService.updateService(serviceId, service)
      .then(() => {
        window.location.reload();
        setModalServiceClass("");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessage(error.response.data.errors[0].defaultMessage);
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setTl(false);
          }, 3000);
        } else {
          setMessage(error.response.data.message);
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setTl(false);
          }, 3000);
        }
      });
  };

  const deleteService = () => {
    ServicesService.deleteService(id)
      .then(() => {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].defaultMessage);
        } else {
          console.log(error.response.data.message);
        }
      });
  };

  const saveService = (e) => {
    e.preventDefault();

    let service = { name, description, price };
    console.log("service => " + JSON.stringify(service));
    ServicesService.postService(service)
      .then(() => {
        setFilters({
          ...filters,
        });
        setModalServiceClass("");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        } else {
          setMessageError(error.response.data.message);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        }
      });
  };

  const updateService = (service) => {
    ServicesService.getServiceId(service.id)
      .then((res) => {
        setServiceId(res.data.id);
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        } else {
          setMessageError(error.response.data.message);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        }
      });

    if (modalServiceClass == "") {
      setModalServiceClass("modal-update-service");
    }
  };

  const deleteS = (id) => {
    if (warningModalClass == "") {
      setWarningModalClass("warning-modal");
      setId(id);
    }
  };

  const backconfirm = () => {
    setWarningClass("");
    setWarningModalClass("");
  };

  const addService = () => {
    if (modalServiceClass == "") {
      setModalServiceClass("modal-service");
    }
  };

  const hiddenFormService = () => {
    setName("");
    setDescription("");
    setPrice("");
    setModalServiceClass("");
  };
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  }))(TableCell);
  const classes = useStyles();

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
        <div className="list-services">
          <Snackbars
            place="tc"
            color="info"
            message={messageSuccess}
            open={tl}
            closeNotification={() => setTl(false)}
            close
          />
          <Snackbars
            place="tc"
            color="danger"
            message={messageError}
            open={fail}
            closeNotification={() => setFail(false)}
            close
          />

          <div id="warning-modal" className={warningModalClass}>
            <div id="warning" className={warningClass}>
              <div className="title-warning">
                <span>Xóa dịch vụ?</span>
              </div>
              <div className="content-warning">
                <div className="text-warning">
                  <span>
                    Bạn có chắc muốn xóa dịch vụ này? Thao tác này không thể
                    khôi phục.
                  </span>
                </div>
                <div className="button-warning">
                  <button className="delete-permission" onClick={deleteService}>
                    <span>Xóa</span>
                  </button>
                  <div className="back" onClick={backconfirm}>
                    <span>Thoát</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-services">
            <Snackbars
              place="tc"
              color="warning"
              message={messageSuccess}
              open={tl}
              closeNotification={() => setTl(false)}
              close
            />

            <div id="modal-service" className={modalServiceClass}>
              <div className="create-service">
                <div className="title-add-service">
                  <div className="title-service">
                    <span>Thêm dịch vụ mới</span>
                  </div>{" "}
                  <div className="close">
                    <span onClick={hiddenFormService}>&times;</span>
                  </div>
                </div>
                <div className="content-service">
                  <div className="form-group">
                    <label>
                      Tên dịch vụ<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Điền tên dịch vụ"
                      name="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={changeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô ta dịch vụ</label>
                    <br />
                    <input
                      placeholder="Mô ta dịch vụ"
                      name="description"
                      className="form-control"
                      value={description}
                      onChange={changeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá</label>
                    <br />
                    <input
                      placeholder="Điền giá dịch vụ"
                      name="price"
                      className="form-control"
                      value={price}
                      onChange={changePrice}
                    />
                  </div>
                </div>
                <button onClick={saveService}>Tạo</button>
              </div>
            </div>

            <div id="modal-update-service" className={modalServiceClass}>
              <div className="create-update-service">
                <div className="title-update-service">
                  <div className="title-update-service">
                    <span>Sửa thông tin dịch vụ</span>
                  </div>{" "}
                  <div className="close">
                    <span onClick={hiddenFormService}>&times;</span>
                  </div>
                </div>
                <div className="content-update-service">
                  <div className="form-group">
                    <label>
                      Tên dịch vụ<span style={{ color: "red" }}>*</span>
                    </label>
                    <br />
                    <input
                      placeholder="Điền tên dịch vụ"
                      name="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={changeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mô ta dịch vụ</label>
                    <br />
                    <input
                      placeholder="Mô ta dịch vụ"
                      name="description"
                      className="form-control"
                      value={description}
                      onChange={changeDescription}
                    />
                  </div>
                  <div className="form-group">
                    <label>Giá</label>
                    <br />
                    <input
                      placeholder="Điền giá dịch vụ"
                      name="price"
                      className="form-control"
                      value={price}
                      onChange={changePrice}
                    />
                  </div>
                </div>
                <button onClick={putService}>Tạo</button>
              </div>
            </div>
          </div>
        </div>
        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography
              variant="h4"
              style={{
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              Thông tin dịch vụ
            </Typography>
          </Box>
          <Button
            style={{
              background: "#218FFE",
              color: "white",
              height: "40px",
              marginBottom: "10px",
              marginTop: "15px",
              float: "right",
              marginRight: "10px",
            }}
            onClick={addService}
            variant="outlined"
            startIcon={<Add />}
          >
            Thêm dịch vụ
          </Button>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2, minHeight: "100px" }}>
              <TextField
                id="filled-search"
                label="Tìm kiếm dịch vụ"
                type="search"
                variant="outlined"
                style={{
                  marginLeft: "30px",
                  width: "93%",
                  marginTop: "20px",
                }}
                size="small"
                onChange={handleFiltersChange}
              />

              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <TableHead variant="h6">
                    <TableRow>
                      <TableHeaderCell variant="h6">
                        Tên dịch vụ{" "}
                      </TableHeaderCell>
                      <TableHeaderCell align="center">Mô tả </TableHeaderCell>
                      <TableHeaderCell align="center">Đơn giá</TableHeaderCell>
                      <TableHeaderCell align="center">
                        Trạng thái
                      </TableHeaderCell>
                      <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {services.map((row, index) => {
                      return (
                        <TableRow>
                          <TableCell component="th">
                            {" "}
                            <Link onClick={() => updateService(row)}>
                              {row.name}
                            </Link>
                          </TableCell>
                          <TableCell align="center">
                            {row.description}
                          </TableCell>
                          <TableCell align="center">{row.price}</TableCell>

                          {row.status ? (
                            <TableCell
                              style={{
                                color: "#66B8FF",
                                fontWeight: "bool",
                              }}
                              align="center"
                            >
                              phục vụ
                            </TableCell>
                          ) : (
                            <TableCell
                              style={{
                                color: "red",
                                fontWeight: "bool",
                              }}
                              align="center"
                            >
                              sắp hết hàng
                            </TableCell>
                          )}
                          <TableCell align="left">
                            <Clear
                              size="small"
                              onClick={() => deleteS(row.id)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25]}
                component="div"
                count={pagination.totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Container>
      </>
    );
  }
}
