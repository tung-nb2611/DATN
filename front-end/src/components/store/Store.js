/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from "components/Pagination/limitPagination.js";
import EmployeesService from "services/employees";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  ArrowDropDown,
  Create,
  Delete,
  DeleteForever,
  EditAttributesTwoTone,
} from "@material-ui/icons";
// material-ui icons
import Snackbars from "components/Snackbar/Snackbar.js";
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
import StoreService from "../../services/StoreService";
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
};

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
  const [id, setId] = useState();
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState("");
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState("");
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState("");
  const [warningClass, setWarningClass] = useState("");
  const [warningModalClass, setWarningModalClass] = useState("");
  const [limit, setLimit] = useState("");
  const [total, setTotal] = useState("");

  const showButtonOther = () => {
    if (buttonOtherClass == "") {
      setButtonOtherClass("content-button");
    } else {
      setButtonOtherClass("");
    }
  };
  const [page, setPage] = useState({
    id: 1,
    limit: 10,
    total: 12,
  });
  const handlePageChange = (id, limit) =>
    setPage((prev) => ({
      ...prev,
      id: id,
      limit: limit,
    }));

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });

  // function handlePageChange(newPage) {
  //   console.log("new page: ", newPage);
  //   setFilters({
  //     ...filters,
  //     page: newPage,
  //   });
  // }
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

  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        StoreService.listStore(filters)
          .then((res) => {
            console.log("rrrr", res);
            const stores = res.data.storeDTOS;
            const pagination = res.data.pagination;

            setEmployees(
              stores.map((store) => {
                return {
                  select: false,
                  id: store.id,
                  code: store.code,
                  name: store.name,
                  address: store.address,
                };
              })
            );
            setPagination(pagination);
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

  const updateStore = (id) => {
    props.history.push(`/admin/store/update-store/${id}`);
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
    if (modalSalaryDayClass == "") {
      setModalSalaryDayClass("modal-salaryday");
    }
  };

  const timesheet = () => {
    props.history.push("/admin/employees/time-sheets");
  };
  const datEmployee = () => {
    props.history.push("/admin/roles");
  };

  const hiddenFormRole = () => {
    setModalTimeSheetClass("");
  };

  const hiddenFormSalaryDay = () => {
    setEmployeeId("");
    setSalaryDay("");
    setModalSalaryDayClass("");
  };

  const showCreateTimesheet = () => {
    if (modalTimeSheetClass == "") {
      setModalTimeSheetClass("modal-timesheet");
    }
  };

  const changeCreateTimeSheet = (e) => {
    setMonth(e.target.value);
  };

  const backconfirm = () => {
    setWarningClass("");
    setWarningModalClass("");
  };

  const deleteS = (id) => {
    if (warningModalClass == "") {
      setWarningModalClass("warning-modal");
      setId(id);
    }
  };
  //Xóa nhân viên
  const deleteAStore = (id) => {
    StoreService.deleteStore(id)
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
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  }))(TableCell);

  const addStore = () => {
    props.history.push("/admin/store/add-store");
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <Container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Typography
            variant="h4"
            style={{
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            Thông tin cửa hàng
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
          variant="outlined"
          startIcon={<Add />}
          onClick={addStore}
        >
          Thêm cửa hàng
        </Button>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2, minHeight: "100px" }}>
            <TextField
              id="filled-search"
              label="Tìm kiếm cửa hàng"
              type="search"
              variant="outlined"
              style={{
                marginLeft: "30px",
                width: "93%",
                marginTop: "20px",
              }}
              size="small"
            />

            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <TableHead variant="h6">
                  <TableRow>
                    <TableHeaderCell variant="h6">Mã cửa hàng</TableHeaderCell>
                    <TableHeaderCell align="center">
                      Tên cửa hàng
                    </TableHeaderCell>
                    <TableHeaderCell align="center">Đại chỉ</TableHeaderCell>
                    <TableHeaderCell></TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((row, index) => {
                    return (
                      <TableRow>
                        <TableCell component="th">
                          {" "}
                          <Link to={`/admin/store/detail-store/${row.id}`}>
                            {row.code}
                          </Link>
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.address}</TableCell>

                        <TableCell align="left">
                          <Create
                            size="small"
                            onClick={() => updateStore(row.id)}
                          ></Create>
                          <Clear
                            style={{ marginLeft: "10px" }}
                            size="small"
                            onClick={() => deleteAStore(row.id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <TablePagination
              rowsPerPageOptions={[10, 25]}
              component="div"
              count={pagination.totalRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </Paper>
        </Box>
      </Container>

      // <>
      //     <Button size="regular" style={{ marginBottom: "10px", marginLeft: "auto", marginTop: "-20px", fontSize: "1rem", height: "45px" }} onClick={<Alert severity="success">
      //         Một năm mới thành công!
      //     </Alert>}>
      //         Thêm cửa hàng
      //     </Button>

      //     <Box
      //         padding={4}
      //         shadow="regular"
      //         minHeight="520px"
      //     >
      //         <Table
      //             fontSize={"12px"}
      //             total={pagination.totalRows}
      //             items={
      //                 employees.map((employee) => (
      //                     {
      //                         code: employee.code,
      //                         name: employee.name,
      //                         address: employee.address,
      //                         id: employee.id,
      //                     }))}
      //             selectable
      //             sortDirection="desc"
      //             theme="light"
      //             selectedItems={selectedItems}
      //             onSelectionChange={setSelectedItems}
      //             page={pagination.page}
      //             limit={pagination.limit}
      //             onPageChange={handlePageChange}
      //             tableSize="small"
      //             style={{
      //                 fontSize: "12px",
      //                 backgroundColor: "#F6F6FA"

      //             }}

      //         >
      //             <TableHead style={{ fontSize: "12px" }}>
      //                 <TableRow style={{ fontSize: "12px" }}>
      //                     <TableCellBulkAction
      //                         textSelected={(num, isSelectedAll) =>
      //                             (isSelectedAll ? "Đã chọn tất cả trên trang này" : `Đã chọn ${num} trên trang này`)}>
      //                         {selectedItems => (
      //                             <React.Fragment>
      //                                 <Button ml={4} variant="text" onClick={() => { openModal(DialogDoSomething) }}>
      //                                     Xóa cửa hàng
      //                                 </Button>
      //                             </React.Fragment>
      //                         )}
      //                     </TableCellBulkAction>
      //                     <TableHeadCell field="code" fontSize="12px" style={{ fontSize: "12px" }}>
      //                         Mã Cửa Hàng
      //                     </TableHeadCell>
      //                     <TableHeadCell
      //                         align="center"
      //                         field="name"
      //                         size="small"
      //                         style={{ fontSize: "12px" }}
      //                     >
      //                         Tên cửa hàng
      //                     </TableHeadCell>
      //                     <TableHeadCell
      //                         align="center"
      //                         field="address"
      //                         style={{ fontSize: "12px" }}
      //                     >
      //                         Địa chỉ
      //                     </TableHeadCell>
      //                 </TableRow>
      //             </TableHead>
      //             <TableBody>
      //                 <TableRow>
      //                     <TableCell style={{ fontSize: "1rem" }} field="code">{(item) => <Link to={`/admin/store/detail-store/${item.id}`} >{item.code}</Link>}</TableCell>
      //                     <TableCell
      //                         style={{ fontSize: "12px" }}

      //                         field="name"

      //                     ></TableCell>
      //                     <TableCell
      //                         style={{ fontSize: "1rem" }}
      //                         align="center"
      //                         field="address"
      //                     />
      //                 </TableRow>
      //             </TableBody>
      //         </Table>
      //     </Box>
      // </>
    );
  }
}
