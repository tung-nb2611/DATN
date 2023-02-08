/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../FiltersForm/search.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
import EmployeesService from "services/employees";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { ArrowDropDown, Delete, DeleteForever, EditAttributesTwoTone } from "@material-ui/icons";
// material-ui icons
import Snackbars from 'components/Snackbar/Snackbar.js';
import Edit from "@material-ui/icons/Edit";
import EmployeeFilters from "components/FiltersForm/EmployeeFilters";
import RoleFilters from "components/FiltersForm/RoleFilters";
import StoreService from "services/StoreService";
import { Link } from "react-router-dom";
import AreaService from "services/AreaService";
import { Button, Card, CardActions, CardContent, CardHeader, Paper, Typography } from "@material-ui/core";
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
  const [id, setId] = useState();
  const [area, setArea] = useState([]);
  const [employeeId, setEmployeeId] = useState();
  const [salaryDay, setSalaryDay] = useState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState('');
  const [modalTimeSheetClass, setModalTimeSheetClass] = useState('');
  const [modalSalaryDayClass, setModalSalaryDayClass] = useState('');
  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');
  const [month, setMonth] = useState('');
  const showButtonOther = () => {
    if (buttonOtherClass == '') {
      setButtonOtherClass('content-button');
    } else {
      setButtonOtherClass('');
    }
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
  const classes = useStyles();

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

        <div style={{ display: "-webkit-inline-box" }}>

          {area.map((area) =>
          (
            <div style={{ marginRight: "20px", marginLeft: "20px", padding: "20px", marginTop: "40px" }}
            >
              <Card
                style={{ maxWidth: "200px" }}>
                <Paper elevation={3} />
                <CardHeader
                  title={area.name}>
                </CardHeader>
                <CardContent>
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
                      </div>
                    }
                  </Typography>

                  {/* {(() => {
                      debugger
                      if (area.status === 1) {
                        return (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              trạng thái: <span>Đang trống</span>
                            </Typography>

                          </>

                        )

                      }
                      else {
                        return (
                          <>
                            <Typography variant="body2" color="text.secondary">
                              trạng thái: <span>Đang sửa xe</span>

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
                            <CardActions>
                              <Button size="small" color="primary">
                                Share
                              </Button>
                            </CardActions>

                          </>
                        )
                      }

                    })} */}
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
                    <Button size="small" color="primary">
                      Thanh toán
                    </Button>
                    <Button size="small" color="primary">
                      Sửa hóa đơn
                    </Button>
                  </CardActions>
                  </div>
                }
              </Card>
            </div>))}
        </div>
      </div >

    );
  }
}
