/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import EmployeesService from "services/employees";
import { FixedSizeList } from 'react-window';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Add, ArrowDropDown, Delete, DeleteForever, EditAttributesTwoTone } from "@material-ui/icons";
// material-ui icons
import Snackbars from 'components/Snackbar/Snackbar.js';
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
import StoreService from "services/StoreService";
import { Link } from "react-router-dom";
import AreaService from "services/AreaService";
import { Box, Button, Card, CardActions, CardContent, CardHeader, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Modal, Paper, Table, TableBody, TableCell, TableHead, Typography } from "@material-ui/core";
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, TableRow, useModal } from "@sapo-presentation/sapo-ui-components";
import InvoicesService from "../../services/InvoicesService";
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

  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [tl, setTl] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [id, setId] = useState();
  const [area, setArea] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState('');
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState('');
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState('');
  const [serviceChoose, setServiceChoose] = useState([]);
  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');
  const [materialChoose, setMaterialChoose] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [month, setMonth] = useState('');
  const [services, setServices] = useState([]);
  const [sumServices, setSumServices] = useState(0);
  const [materitals, setMaterials] = useState([]);
  const [status, setStatus] = useState('');
  const [idInvoice, setIdInvoice] = useState(0);
  const [areaChose, setAreaChose] = useState({});
  const [customer, setCustomer] = useState({
    id: 0,
    code: '',
    name: '',
    phone: '',
    licensePlate: ''
  });
  const [payMethod, setPayMethod] = useState();
  const [employee, setEmployee] = useState({
    id: 0,
    code: '',
    name: '',
    phone: ''
  });
  const [vehicle, setVehicle] = useState({
    id: 0,
    code: '',
    licensePlate: ''
  });
  const [sumMaterial, setSumMaterial] = useState(0);
  const { openModal } = useModal();
  const showButtonOther = () => {
    if (buttonOtherClass == '') {
      setButtonOtherClass('content-button');
    } else {
      setButtonOtherClass('');
    }
  }
  const editInvoice = (id) => {
    props.history.push(`/admin/invoices/edit-invoice/${id}`)
  }
  const DialogDoSomething = (id) => {
    const { closeAllModal } = useModal();
    return (
      <Dialog style={{ height: "30px" }} >
        <DialogTitle >
          Chỉnh sửa hóa đơn
        </DialogTitle>
        <DialogContent>Bạn có chắc muốn chỉnh sửa hóa đơn này không?</DialogContent>
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
        <List component="nav" aria- label="secondary mailbox folder" >
          {invoices.map((x) => (
            <ListItem
              key={x.id}
              index
              button
              selected={selectedIndex === 2}
              onClick={() => { editInvoice(x.id) }}
            >
              <ListItemText primary={x.code} />
            </ListItem>
          ))}
        </List >
      </div>

    );
  }
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    store_id: 1,
    status: [1, 2]
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
  const addEmployee = () => {
    props.history.push("/admin/employees/add-employee");
  };
  const addInvoice = () => {
    props.history.push("/admin/invoices/add-invoice");
  }
  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        AreaService.listArea(filters).then((res) => {
          const areas = res.data.areas;
          setArea(
            areas.map((area) => {
              return {
                select: false,
                id: area.id,
                code: area.code,
                name: area.name,
                status: area.status,
                invoice: area.invoice
              }
            }))
          setIsLoaded(true);
        }).catch(function (error) {
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        if (error.status == 401) {
          alert("Không quyền truy cập")
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
        InvoicesService.getInvoices(filters1).then((res) => {
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
              }
            }))
          setPagination(pagination);
          console.log(pagination);
          setIsLoaded(true);
        }).catch(function (error) {
          console.log("ERROR: " + error.response.data.status)
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
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
    employees.forEach(employee => {
      if (employee.select) {
        ids.push(employee.id);
      }
    });

    if (ids.length != 0) {
      let timesheets = { ids, month }
      EmployeesService.createTimeSheets(timesheets)
        .then(() => {
          setMessageSuccess("Tạo bảng công thành công")
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        })
        .catch(function (error) {
          if (error.response.data.errors) {
            setMessageError(error.response.data.errors[0].defaultMessage)
            setFail(true);
            // use this to make the notification autoclose
            setTimeout(
              function () {
                setFail(false)
              },
              3000
            );
          } else {
            setMessageError(error.response.data.message)
            setFail(true);
            // use this to make the notification autoclose
            setTimeout(
              function () {
                setFail(false)
              },
              3000
            );
          }
        });
    } else {
      setMessageError("Không có lựa chọn nào! Vui lòng chọn lại!")
      setFail(true);
      // use this to make the notification autoclose
      setTimeout(
        function () {
          setFail(false)
        },
        3000
      );
    }
  }

  const putSalaryDay = (e) => {
    e.preventDefault();

    EmployeesService.changeSalaryDay(employeeId, filters)
      .then(() => {
        setFilters({
          ...filters
        })
        setMessageSuccess("Điều chỉnh lương thành công!")
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(
          function () {
            setTl(false)
          },
          3000
        );
        setModalSalaryDayClass('');
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );
        } else {
          setMessageError(error.response.data.message)
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );
        }
      });
  }
  const updateArea = (id) => {
    props.history.push(`/admin/areas/update-area/${id}`);
  };

  const changeSalaryDayAdjustment = (event) => {
    setFilters({
      ...filters,
      salary: event.target.value,
    });
  };

  const updateSalaryDay = (employee) => {
    setEmployeeId(employee.id);
    EmployeesService.getEmployeeById(employee.id).then((res) => {
      let user = res.data;
      console.log(user);
      setSalaryDay(user.salaryDay);
    });
    if (modalSalaryDayClass == '') {
      setModalSalaryDayClass('modal-salaryday')
    }
  }


  const timesheet = () => {
    props.history.push('/admin/employees/time-sheets')
  }
  const invoice = (id) => {
    props.history.push('/admin/invoices/' + id)
  }
  const listRoles = () => {
    props.history.push('/admin/roles')
  }

  const hiddenFormRole = () => {
    setModalTimeSheetClass('')
  }

  const hiddenFormSalaryDay = () => {
    setEmployeeId('')
    setSalaryDay('')
    setModalSalaryDayClass('')
  }

  const showCreateTimesheet = () => {
    if (modalTimeSheetClass == '') {
      setModalTimeSheetClass('modal-timesheet')
    }
  }

  const changeCreateTimeSheet = (e) => {
    setMonth(e.target.value)
  }

  const backconfirm = () => {
    setWarningClass('');
    setWarningModalClass('');
  }

  const deleteS = (id) => {
    if (warningModalClass == '') {
      setWarningModalClass('warning-modal')
      setId(id)
    }
  }

  //Xóa nhân viên
  const deleteEmployee = (e) => {
    EmployeesService.deleteEmployee(id)
      .then(() => {
        setFilters({
          ...filters
        })
        setWarningModalClass('')
        setMessageSuccess("Xóa thành công!")
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(
          function () {
            setTl(false)
          },
          3000
        );
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage)
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );
        } else {
          setMessageError(error.response.data.message)
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setFail(false)
            },
            3000
          );
        }
      });
  }
  const okModal = (id) => {
    detailInvocie(id)


  }
  const detailInvocie = (id) => {
    try {
      console.log("oke", id)
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
        }
        let materials = res.data.materialOrderResponseDTOS;
        let services = res.data.serviceOrderResponseDTOS;
        console.log("1111", res.data);
        setStatus(res.data.status)
        setCustomer(customer);
        setAreaChose(res.data.areaDTO)
        setEmployee(res.data.userDTO);
        setVehicle(vehicle);
        setMaterialChoose(materials)
        setServiceChoose(services)
        setIdInvoice(res.data.id)
        let currentSumMaterial = 0;
        materials.map((material) => {
          currentSumMaterial = currentSumMaterial + material.quantityBuy * material.outputPrice;
        })
        setSumMaterial(currentSumMaterial)


        let currentSumService = 0;
        services.map((service) => {
          currentSumService = currentSumService + service.price;
        })
        setSumServices(currentSumService)
        setOpen(true);
      });

    } catch (error) {
      console.log("Failed to fetch Invoicce: ", error.message);
    }
  }
  const payment = (e) => {
    e.preventDefault();
    if (customer.id == 0) {
      alert("Không được để trống khách hàng")
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
    }
    InvoicesService.changeStatusInvoiceToCompletePayment(idInvoice, invoice)
      .then(() => {
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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid rgb(167 165 165)',
    boxShadow: 24,
    p: 4,
  };
  const addArea = () => {
    props.history.push("/admin/areas/add-area");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-employees">
        <div className="title-employees">
          <div className="name-title"><span>Danh sách khu vực sửa xe</span></div>
          <div className="add-new-invoice"><button onClick={addArea} className="button-add">Thêm khu vực</button></div>
        </div>


        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
            <div className="title-warning">
              <span>Xóa nhân viên?</span>
            </div>
            <div className="content-warning">
              <div className="text-warning"><span>Bạn có chắc muốn xóa nhân viên này? Thao tác này không thể khôi phục.</span></div>
              <div className="button-warning">
                <button className="delete-permission" onClick={deleteEmployee}><span>Xóa</span></button>
                <div className="back" onClick={backconfirm}><span>Thoát</span></div>
              </div>
            </div>
          </div>
        </div>


        {/* <div className="content-employees">
          <table className="table">
            <thead>
              <tr>

                <th className="th-2">
                  <span>STT</span>
                </th>
                <th className="th-3">
                  <span>Mã khu vực</span>
                </th>
                <th className="th-4">
                  <span>Tên khu vực</span>
                </th>
                <th className="th-5">
                  <span>Trạng thái</span>
                </th>
                <th className="th-7">
                  <span></span>
                </th>
              </tr>
            </thead>
            <tbody>
              {area.map((area) => (
                <tr key={area.id}>
                  {/* <td className="td-1">
                    <input
                      type="checkbox"
                      checked={employee.select}
                      onChange={e => {
                        let value = e.target.checked;
                        setEmployees(
                          employees.map(employeeCheck => {
                            if (employeeCheck.id === employee.id) {
                              employeeCheck.select = value;
                            }
                            return employeeCheck;
                          })
                        );
                      }}
                    /> */}
        {/* </td> */}
        {/* <td className="td-2">
          <span>{area.id}</span>
        </td>
        <td className="td-3">
          <span>{area.code}</span>
        </td>
        <Link to={`/admin/invoices/${area.id}`}>
          <td className="td-4">
            <span>{area.name}</span>
          </td>
        </Link>
        <td className="td-5">
          <span>{area.status}</span>
        </td>
        <td className="td-7">
          <button
            className="button-icon"
            onClick={() => updateArea(area.id)}
          >
            <Edit style={{ width: "15px" }} /><div className="info-button" ><span>Sửa thông cửa hàng</span></div>
          </button> */}
        {/* <button
                      className="button-icon"
                      onClick={() => updateSalaryDay(employee)}
                    >
                      <EditAttributesTwoTone style={{ width: "15px" }} /><div className="info-button"><span>Điều chỉnh lương nv</span></div>
                    </button> */}
        {/* <button
            className="button-icon"
          // onClick={() => deleteS(employee.id)}
          >
            <DeleteForever style={{ width: "15px" }} /><div className="info-button"><span>Xóa cửa hàng</span></div>
          </button>
        </td>
        <td></td>
      </tr>
    ))
  }
            </tbody >
          </table > */}

        {/* <div className="pagination-limit"> */}
        {/* <div className="limit">
              <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span style={{ marginTop: "21px" }}> kết quả</span>
            </div> */}
        {/* <div className="pagination">
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div> */}
        {/* </div > * /}
    < div > */}

        <Grid container spacing={2} >
          <Grid item xs={4} >

            <Box
              sx={{ width: '100%', height: "100%", maxHeight: "490px", bgcolor: 'background.paper', marginTop: "50px" }}
            >
              <Button variant="outlined" startIcon={<Add />} onClick={addInvoice}>Thêm hóa đơn</Button>
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

              {area.map((area) =>
              (
                <div style={{ padding: "10px", marginTop: "40px" }}
                >
                  <Card
                    style={{ maxWidth: "200px" }}>
                    <Paper elevation={3} />
                    <CardHeader
                      title={area.name}>
                    </CardHeader>
                    <CardContent style={{ padding: "8px" }}>
                      <Typography variant="body2" color="text.secondary">
                        mã khu vực: <span>{area.code}</span>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {area.status && area.status === 1
                          ? <Typography variant="body2" color="text.secondary">
                            trạng thái: <span>Đang trống</span>
                          </Typography>
                          :
                          <div><Typography variant="body2" color="text.secondary">
                            trạng thái: <span style={{ color: "red" }}>Đang sửa xe</span>
                          </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Tên khách: <span>{area.invoice.name}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Biển số xe: <span>{area.invoice.licensePlate}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Mã hóa đơn: <span>{area.invoice.code}</span>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Nhân viên sửa: <span>{area.invoice.fixerName}</span>
                            </Typography>
                          </div>
                        }
                      </Typography>
                    </CardContent>
                    {area.status && area.status === 1
                      ?
                      <CardActions>
                        <Button size="small" color="primary" onClick={() => invoice(area.id)}>
                          Danh sách phiếu
                        </Button>
                      </CardActions>
                      :
                      <div><CardActions>
                        <Button size="small" color="primary" onClick={() => okModal(area.invoice.id)} >
                          Thanh toán
                        </Button>
                        <Button size="small" color="primary" onClick={() => editInvoice(area.invoice.id)}>
                          Sửa hóa đơn
                        </Button>
                      </CardActions>
                      </div>
                    }
                  </Card>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    {open == true ? (
                      <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h1" component="h2">
                          Hóa đơn {idInvoice}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Tên khách hàng:{customer.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          số điện thoại:{customer.phone}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Biển số xe:{vehicle.licensePlate}
                        </Typography>
                        <Box style={{ display: "flex" }} >
                          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
                            Sản phẩm
                          </Typography>
                          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} style={{ marginLeft: "110px" }}>
                            số lượng
                          </Typography>
                        </Box>

                        <Box style={{ display: "flex" }} >
                          {materialChoose.map((x) => (
                            <div style={{ display: "flex" }}>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {x.name}
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ marginLeft: "110px" }} >
                                {x.quantityBuy}
                              </Typography>
                            </div>
                          ))}
                        </Box>
                        <Box style={{ display: "flex" }} >
                          {serviceChoose.map((x) => (
                            <div style={{ display: "flex" }}  >
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {x.name}
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{ marginLeft: "110px" }}>
                                1
                              </Typography>
                            </div>
                          ))}
                        </Box>
                        <Box style={{ display: "flex" }}>
                          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
                            Tổng tiền
                          </Typography>
                          <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }} style={{ marginLeft: "110px" }}>
                            {sumMaterial + sumServices}đ
                          </Typography>
                        </Box>
                        <Button onClick={payment}>Thanh toán</Button>
                        <Button autoFocus>
                          Hủy
                        </Button>
                      </Box>
                    )
                      :
                      ("")}
                  </Modal>
                </div>))}
            </div>
          </Grid>
        </Grid>
      </div >

    );
  }
}
