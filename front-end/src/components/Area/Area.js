/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from "components/Pagination/limitPagination.js";
import EmployeesService from "services/employees";
import { FixedSizeList } from "react-window";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Add,
  ArrowDropDown,
  BorderTop,
  Clear,
  Delete,
  DeleteForever,
  EditAttributesTwoTone,
} from "@material-ui/icons";
// material-ui icons
import Snackbars from "../../components/Snackbar/Snackbar.js";
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
import StoreService from "services/StoreService";
import { Link } from "react-router-dom";
import AreaService from "../../services/AreaService";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableRow,
  useModal,
} from "@sapo-presentation/sapo-ui-components";
import InvoicesService from "../../services/InvoicesService";
import { toast, ToastContainer } from "react-toastify";
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
  const [add, setAdd] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setAdd(false);
  const handleClose2 = () => setOpen1(false);
  const [id, setId] = useState();
  const [areaId, setAreaId] = useState();
  const [area, setArea] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState("");
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState("");
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState("");
  const [serviceChoose, setServiceChoose] = useState([]);
  const [warningClass, setWarningClass] = useState("");
  const [warningModalClass, setWarningModalClass] = useState("");
  const [materialChoose, setMaterialChoose] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [month, setMonth] = useState("");
  const [services, setServices] = useState([]);
  const [sumServices, setSumServices] = useState(0);
  const [materitals, setMaterials] = useState([]);
  const [status, setStatus] = useState("");
  const [idInvoice, setIdInvoice] = useState(0);
  const [areaChose, setAreaChose] = useState({});
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState({
    id: 0,
    code: "",
    name: "",
    phone: "",
    licensePlate: "",
  });
  const [payMethod, setPayMethod] = useState();
  const [employee, setEmployee] = useState({
    id: 0,
    code: "",
    name: "",
    phone: "",
  });
  const [vehicle, setVehicle] = useState({
    id: 0,
    code: "",
    licensePlate: "",
  });
  const [sumMaterial, setSumMaterial] = useState(0);
  const { openModal } = useModal();
  const showButtonOther = () => {
    if (buttonOtherClass == "") {
      setButtonOtherClass("content-button");
    } else {
      setButtonOtherClass("");
    }
  };
  const editInvoice = (id) => {
    props.history.push(`/admin/invoices/edit-invoice/${id}`);
  };
  const DialogDoSomething = (id) => {
    const { closeAllModal } = useModal();
    return (
      <Dialog style={{ height: "30px" }}>
        <DialogTitle>Chỉnh sửa hóa đơn</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn chỉnh sửa hóa đơn này không?
        </DialogContent>
        <DialogActions>
          <Button destruction onClick={closeAllModal} variant="outlined">
            Thoát
          </Button>
          <Button onClick={editInvoice(id)} destruction>
            Nhận
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  function renderRow(props) {
    const { index, style } = props;

    return (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        <List component="nav" aria- label="secondary mailbox folder">
          {invoices.map(
            (x) => (
              console.log("uuuu", x.createDate),
              (
                <ListItem
                  key={x.id}
                  index
                  button
                  selected={selectedIndex === 2}
                  onClick={() => {
                    editInvoice(x.id);
                  }}
                >
                  <ListItemText primary={x.code} />
                  <ListItemText
                    primary={x.createDate}
                    style={{ marginLeft: "242px" }}
                  />
                </ListItem>
              )
            )
          )}
        </List>
      </div>
    );
  }
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    status: [1, 2],
  });
  const [filters1, setFilters1] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [1, 2],
    sort: 0,
  });

  function handlePageChange(newPage) {
    console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(newFilters) {
    console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      page: 1,
      keyword: newFilters.keyword,
    });
  }
  function handleChangeLimit(newLimit) {
    console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      page: 1,
      limit: newLimit.limit,
    });
  }
  function handleFiltersStatus(newStatus) {
    console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      status: newStatus.status,
    });
  }
  function handleFiltersRole(newRole) {
    // console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      roleIds: newRole.ids,
    });
  }
  const saveStore = (e) => {
    e.preventDefault();

    let area = { name, status };
    AreaService.postArea(area)
      .then(() => {
        props.history.push("/admin/areas");
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
  const addEmployee = () => {
    props.history.push("/admin/employees/add-employee");
  };
  const addInvoice = () => {
    props.history.push("/admin/invoices/add-invoice");


  };
  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        AreaService.listArea(filters)
          .then((res) => {
            const areas = res.data.areas;
            setArea(
              areas.map((area) => {
                return {
                  select: false,
                  id: area.id,
                  code: area.code,
                  name: area.name,
                  status: area.status,
                  invoice: area.invoice,
                };
              })
            );
            setIsLoaded(true);
          })
          .catch(function (error) {
            if (error.response.data.status == 403) {
              alert("Không có quyền truy cập!");
            }
          });
      } catch (error) {
        if (error.status == 401) {
          alert("Không quyền truy cập");
        }
        console.log("Failed to fetch employee list: ", error.message);
        setError(error);
      }
    }
    fetchEmployeeList();
  }, [filters]);
  useEffect(() => {
    async function fetchInvoicesList() {
      try {
        InvoicesService.getInvoices(filters1)
          .then((res) => {
            let invoices = res.data.invoiceListResponseDTOS;
            let pagination = res.data.pagination;
            console.log(res.data);
            setInvoices(
              invoices.map((invoice) => {
                return {
                  select: false,
                  id: invoice.id,
                  code: invoice.code,
                  licensePlate: invoice.licensePlate,
                  fixerName: invoice.fixerName,
                  status: invoice.status,
                  createDate: invoice.createDate,
                };
              })
            );
            setPagination(pagination);
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
        console.log("Failed to fetch Invoicce list: ", error.message);
        setError(error);
      }
    }
    fetchInvoicesList();
  }, [filters1]);
  const handleCreateTimeSheets = (e) => {
    e.preventDefault();
    const ids = [];
    employees.forEach((employee) => {
      if (employee.select) {
        ids.push(employee.id);
      }
    });

    if (ids.length != 0) {
      let timesheets = { ids, month };
      EmployeesService.createTimeSheets(timesheets)
        .then(() => {
          setMessageSuccess("Tạo bảng công thành công");
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setTl(false);
          }, 3000);
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
    } else {
      setMessageError("Không có lựa chọn nào! Vui lòng chọn lại!");
      setFail(true);
      // use this to make the notification autoclose
      setTimeout(function () {
        setFail(false);
      }, 3000);
    }
  };
  const changeStatus = (id, status) => {
    InvoicesService.finish(id, status)
      .then((res) => {
        setMessageSuccess("Thành công!");
        setTl(true);
        window.location.reload();
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

  const updateArea = (id) => {
    props.history.push(`/admin/areas/update-area/${id}`);
  };
  const invoice = (id) => {
    props.history.push("/admin/invoices/" + id);
  };
  const backconfirm = () => {
    setWarningClass("");
    setWarningModalClass("");
  };
  //Xóa nhân viên
  const deleteArea = () => {
    AreaService.deleteArea(areaId)
      .then(() => {
        setMessageSuccess("Xóa thành công!");
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(function () {
          setTl(false);
        }, 3000);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error.response);
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
  const okModal = (id) => {
    detailInvocie(id);
  };
  const detailInvocie = (id) => {
    try {
      console.log("oke", id);
      InvoicesService.getInvoiceById(id).then((res) => {
        let customer = {
          id: res.data.customerVehicleDTO.customerDTO.id,
          code: res.data.customerVehicleDTO.customerDTO.code,
          name: res.data.customerVehicleDTO.customerDTO.name,
          phone: res.data.customerVehicleDTO.customerDTO.phone,
        };
        let vehicle = {
          id: res.data.customerVehicleDTO.vehicleDTO.id,
          code: res.data.customerVehicleDTO.vehicleDTO.code,
          licensePlate: res.data.customerVehicleDTO.vehicleDTO.licensePlate,
        };
        let materials = res.data.materialOrderResponseDTOS;
        let services = res.data.serviceOrderResponseDTOS;
        console.log("1111", res.data);
        setStatus(res.data.status);
        setCustomer(customer);
        setAreaChose(res.data.areaDTO);
        setEmployee(res.data.userDTO);
        setVehicle(vehicle);
        setMaterialChoose(materials);
        setServiceChoose(services);
        setIdInvoice(res.data.id);
        let currentSumMaterial = 0;
        materials.map((material) => {
          currentSumMaterial =
            currentSumMaterial + material.quantityBuy * material.outputPrice;
        });
        setSumMaterial(currentSumMaterial);

        let currentSumService = 0;
        services.map((service) => {
          currentSumService = currentSumService + service.price;
        });
        setSumServices(currentSumService);
        setOpen(true);
      });
    } catch (error) {
      console.log("Failed to fetch Invoicce: ", error.message);
    }
  };
  const payment = (e) => {
    e.preventDefault();
    if (customer.id == 0) {
      alert("Không được để trống khách hàng");
    }

    let materialDTOS = [];
    let serviceDTOS = [];
    let invoice = {
      areaId: idInvoice,
      fixerId: employee.id,
      vehicleId: vehicle.id,
      customerId: customer.id,
      total: sumMaterial + sumServices,
      payMethod: payMethod,
      materialDTOS: materialDTOS,
      serviceDTOS: serviceDTOS,
    };
    InvoicesService.changeStatusInvoiceToCompletePayment(idInvoice, invoice)
      .then(() => {
        setMessageSuccess("Thanh toán thành công!")
        setTl(true)
        window.location.reload();
        props.history.push("/admin/areas");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].defaultMessage);
        } else {
          console.log(error.response.data.message);
        }
      });
  };
  const test2 = (id) => {
    setAreaId(id)
    setOpen1(true)
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid rgb(167 165 165)",
    boxShadow: 24,
    p: 4,
    borderRadius: "20px"
  };
  const addArea = () => {
    setAdd(true)
  };
  const changeName = (event) => {
    setName(event.target.value);
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
        <Modal
          open={open1}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >

          <Box sx={style}>
            <Typography variant="h5">Xóa Khu vực này ra khỏi hệ thống</Typography>
            <Box style={{ borderBottom: "1px solid #dfe4e8", borderTop: "1px solid #dfe4e8", height: "40px", padding: "10px" }}>
              <Typography

              >Bạn có chắc muồn xóa khu vực này ra khỏi hệ thống</Typography>
            </Box>
            <Button
              style={{
                background: "linear-gradient(180deg,#fff,#f9fafb)",
                color: "#182537",
                height: "40px",
                marginBottom: "10px",
                marginTop: "15px",
                border: "1px solid #c4cdd5"

              }} onClick={handleClose2}>Hủy</Button>
            <Button
              style={{
                background: "linear-gradient(180deg,#ff4d4d,#ff4d4d)",
                color: "white",
                height: "40px",
                marginBottom: "10px",
                marginTop: "15px",
                marginLeft: "12px"

              }} onClick={() => deleteArea()}>Xác nhận xóa</Button>

          </Box>

        </Modal>
        <Modal
          open={add}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {add ?
            <Box sx={style}>
              <Typography>Thêm cửa hàng</Typography>
              <TextField
                label="Tên phụ tùng"
                id="outlined-required"
                variant="outlined"
                style={{
                  width: "90%",
                }}
                size="small"
                value={name}
                onChange={changeName}
              />
              <Button
                style={{
                  background: "#218FFE",
                  color: "white",
                  height: "40px",
                  marginBottom: "10px",
                  marginTop: "15px",

                }} onClick={saveStore}>Tạo mới</Button>

            </Box>
            : ""}
        </Modal>
        <Snackbars
          place="tc"
          color="success"
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
        <div className="list-employees">
          <div className="title-employees">
            <div className="name-title">
              <span>khu vực sửa xe</span>
            </div>
            <div className="add-new-invoice">
              <button onClick={addArea} className="button-add">
                Thêm khu vực
              </button>
              <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover={false}
                toastClassName="toast-modify"
                className="toast-container"
              />
            </div>
          </div>


          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "490px",
                  bgcolor: "background.paper",
                  marginTop: "50px",
                }}
              >
                <CardHeader title="Danh sách hóa đơn chờ"></CardHeader>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={addInvoice}
                  style={{
                    width: "100%",
                    fontWeight: 600,
                    font: "icon",
                    border: 0,
                  }}
                >
                  Thêm hóa đơn
                </Button>
                <FixedSizeList
                  height={490}
                  width="100%"
                  itemSize={46}
                  itemCount={1}
                  color="red"
                  style={{ borderRadius: "10px" }}
                >
                  {renderRow}
                </FixedSizeList>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <div style={{ display: "-webkit-inline-box" }}>
                {area.map((area) => (
                  <div style={{ padding: "10px", marginTop: "40px" }}>
                    <Card style={{ maxWidth: "240px" }}>
                      <Paper elevation={3} />
                      <CardHeader title={area.name}></CardHeader>
                      <Clear
                        style={{
                          float: "right",
                          fontSize: "14px",
                          marginTop: "-59px"
                        }}
                        size="small"
                        onClick={() => test2(area.id)}
                      />
                      <CardContent style={{ padding: "8px" }}>
                        <Typography variant="body1" color="text.secondary">
                          Mã khu vực: <span>{area.code}</span>
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {area.status && area.status === 1 ? (
                            <Typography variant="body1" color="text.secondary">
                              Trạng thái: <span>Đang trống</span>
                            </Typography>
                          ) : (
                            <div>
                              <Typography variant="body1" color="text.secondary">
                                Trạng thái:{" "}
                                <span style={{ color: "red" }}>Đang sửa xe</span>
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                Tên khách: <span>{area.invoice.name}</span>
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                Biển số xe:{" "}
                                <span>{area.invoice.licensePlate}</span>
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                Mã hóa đơn: <span>{area.invoice.code}</span>
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                Nhân viên sửa:{" "}
                                <span>{area.invoice.fixerName}</span>
                              </Typography>
                            </div>
                          )}
                        </Typography>
                      </CardContent>
                      {area.status && area.status === 1 ? (
                        <CardActions>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => invoice(area.id)}
                          >
                            Danh sách phiếu
                          </Button>
                        </CardActions>
                      ) : (
                        <div>
                          <CardActions>
                            <Button
                              size="small"
                              style={{
                                background: "#218FFE",
                                color: "white",
                                height: "40px",
                                marginBottom: "10px",
                                marginTop: "15px",

                              }}
                              onClick={() => okModal(area.invoice.id)}
                            >
                              Thanh toán
                            </Button>
                            <Button
                              size="small"
                              style={{
                                background: "rgb(244, 148, 35)",
                                color: "white",
                                height: "40px",
                                marginBottom: "10px",
                                marginTop: "15px",

                              }}
                              onClick={() => editInvoice(area.invoice.id)}
                            >
                              Sửa hóa đơn
                            </Button>
                          </CardActions>
                        </div>
                      )}
                    </Card>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      {open == true ? (
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h4"
                            component="h2"
                            style={{
                              textAlign: "center", borderBottom: "1px dashed rgb(166, 170, 174)"
                            }}
                          >
                            Hóa đơn {idInvoice}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Tên khách hàng:{customer.name}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Số điện thoại:{customer.phone}
                          </Typography>
                          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Biển số xe:{vehicle.licensePlate}
                          </Typography>
                          <Box style={{
                            display: "flex", borderTop: "1px dashed rgb(166, 170, 174)"
                          }}>
                            <Typography
                              id="modal-modal-description"
                              style={{ fontSize: "15px", fontWeight: "600" }}
                              sx={{ mt: 2 }}
                            >
                              Sản phẩm
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              style={{ fontSize: "15px", fontWeight: "600", marginLeft: "225px" }}
                              sx={{ mt: 2 }}

                            >
                              số lượng
                            </Typography>
                          </Box>

                          <Box >
                            {materialChoose.map((x) => (
                              <Typography >
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                >
                                  {x.name}
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                  style={{ marginLeft: "328px", marginTop: "-18px" }}
                                >
                                  {x.quantityBuy}
                                </Typography>
                              </Typography>
                            ))}
                          </Box>
                          <Box >
                            {serviceChoose.map((x) => (
                              <div >
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}

                                >
                                  {x.name}
                                </Typography>
                                <Typography
                                  id="modal-modal-description"
                                  sx={{ mt: 2 }}
                                  style={{ marginLeft: "328px", marginTop: "-18px" }}
                                >
                                  1
                                </Typography>
                              </div>
                            ))}
                          </Box>
                          <Box style={{ display: "flex", fontSize: "15px", fontWeight: "600" }}>
                            <Typography
                              id="modal-modal-description"
                              style={{ fontSize: "15px", fontWeight: "600" }}
                              sx={{ mt: 2 }}
                            >
                              Tổng tiền
                            </Typography>
                            <Typography
                              id="modal-modal-description"
                              style={{ fontSize: "15px", fontWeight: "600", marginLeft: "240px" }}
                              sx={{ mt: 2 }}

                            >
                              {sumMaterial + sumServices}đ
                            </Typography>
                          </Box>
                          <Box
                            style={{
                              borderTop: "1px dashed rgb(166, 170, 174)"

                            }}
                          >
                            <Button
                              style={{
                                background: "#218FFE",
                                color: "white",
                                height: "40px",
                                marginBottom: "10px",
                                marginTop: "15px",

                              }} onClick={payment}>Thanh toán</Button>
                            <Button
                              style={{
                                background: "linear-gradient(180deg,#0fd186,#0fd186)",
                                color: "white",
                                height: "40px",
                                marginBottom: "10px",
                                marginTop: "15px",
                                marginLeft: "12px"

                              }}
                              onClick={() => changeStatus(idInvoice, 4)}>
                              Lưu đơn
                            </Button>
                            <Button
                              style={{
                                background: "linear-gradient(180deg,#fff,#f9fafb)",
                                color: "#182537",
                                height: "40px",
                                marginBottom: "10px",
                                marginTop: "15px",
                                border: "1px solid #c4cdd5",
                                marginLeft: "12px"
                              }}
                              onClick={handleClose}
                              autoFocus>Hủy</Button>
                          </Box>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Modal>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}
