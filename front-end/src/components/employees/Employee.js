/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from "components/Pagination/limitPagination.js";
import EmployeesService from "services/employees";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  ArrowDropDown,
  Delete,
  DeleteForever,
  EditAttributesTwoTone,
} from "@material-ui/icons";
// material-ui icons
import Snackbars from "components/Snackbar/Snackbar.js";
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
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
  const [id, setId] = useState();
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState("");
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState("");
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState("");
  const [warningClass, setWarningClass] = useState("");
  const [warningModalClass, setWarningModalClass] = useState("");
  const [month, setMonth] = useState("");
  const showButtonOther = () => {
    if (buttonOtherClass == "") {
      setButtonOtherClass("content-button");
    } else {
      setButtonOtherClass("");
    }
  };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: 1,
    roleIds: [2, 3],
  });

  function handlePageChange(newPage) {
    console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(e) {
    const value = e.target.value;
    setFilters({
      ...filters,
      page: 1,
      keyword: value,
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
        EmployeesService.listEmployees(filters)
          .then((res) => {
            const employees = res.data.userDTOS;
            const pagination = res.data.pagination;

            setEmployees(
              employees.map((employee) => {
                return {
                  select: false,
                  id: employee.id,
                  code: employee.code,
                  name: employee.name,
                  phone: employee.phone,
                  role: employee.role,
                  status: employee.status,
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

  const putSalaryDay = (e) => {
    e.preventDefault();

    EmployeesService.changeSalaryDay(employeeId, filters)
      .then(() => {
        setFilters({
          ...filters,
        });
        setMessageSuccess("Điều chỉnh lương thành công!");
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(function () {
          setTl(false);
        }, 3000);
        setModalSalaryDayClass("");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage);
          setTl(true);
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
  const updateCategory = (id) => {
    props.history.push(`/admin/employees/update-employee/${id}`);
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
  const listRoles = () => {
    props.history.push("/admin/roles");
  };
  const classes = useStyles();

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
  const deleteEmployee = (e) => {
    EmployeesService.deleteEmployee(id)
      .then(() => {
        setFilters({
          ...filters,
        });
        setWarningModalClass("");
        setMessageSuccess("Xóa thành công!");
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(function () {
          setTl(false);
        }, 3000);
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
  const colorStatusInvoice = (status) => {
    if (status.localeCompare("Sẵn sàng sửa xe") == 0) {
      return (
        <span
          style={{
            color: "rgb(255 255 255)",
            background: "rgb(102, 184, 255)",
            borderRadius: "20px",
            width: "fit-content",
            margin: "auto",
            padding: "2px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      );
    } else if (status.localeCompare("Đang làm việc") == 0) {
      return (
        <span
          style={{
            color: "rgb(255, 174, 6)",
            background: "rgb(255, 239, 205)",
            borderRadius: "20px",
            width: "fit-content",
            margin: "auto",
            padding: "2px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      );
    }
  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <>
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

        {/* // <div id="warning-modal" className={warningModalClass}>
        //   <div id="warning" className={warningClass}>
        //     <div className="title-warning">
        //       <span>Xóa nhân viên?</span>
        //     </div>
        //     <div className="content-warning">
        //       <div className="text-warning">
        //         <span>
        //           Bạn có chắc muốn xóa nhân viên này? Thao tác này không thể
        //           khôi phục.
        //         </span>
        //       </div>
        //       <div className="button-warning">
        //         <button className="delete-permission" onClick={deleteEmployee}>
        //           <span>Xóa</span>
        //         </button>
        //         <div className="back" onClick={backconfirm}>
        //           <span>Thoát</span>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div> */}

        <Container>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography
              variant="h4"
              style={{
                marginBottom: "15px",
                marginTop: "15px",
              }}
            >
              Thông tin nhân viên
            </Typography>
            {/* <Tabs
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tabs label="Item One" value="1" />
                <TabTwoTone label="Item Two" value="2" />
                <TabTwoTone label="Item Three" value="3" />
              </Tabs> */}
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
            onClick={addEmployee}
            variant="outlined"
            startIcon={<Add />}
          >
            Thêm Nhân viên
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
                        Mã nhân viên
                      </TableHeaderCell>
                      <TableHeaderCell align="center">
                        Họ và tên{" "}
                      </TableHeaderCell>
                      <TableHeaderCell align="center">
                        Số điện thoại
                      </TableHeaderCell>
                      <TableHeaderCell align="center">
                        Chức vụ
                      </TableHeaderCell>
                      <TableHeaderCell align="center">
                        Trạng thái
                      </TableHeaderCell>
                      <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employees.map((row, index) => {
                      return (
                        <TableRow>
                          <TableCell component="th">
                            {" "}
                            <Link onClick={() => updateCategory(row.id)}>
                              {row.code}
                            </Link>
                          </TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.phone}</TableCell>
                          <TableCell align="center">{row.role}</TableCell>
                          <TableCell align="center">
                            {" "}
                            {colorStatusInvoice(row.status)}
                          </TableCell>
                          <TableCell align="left">
                            <Clear
                              size="small"
                              onClick={() => deleteEmployee(row.id)}
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
