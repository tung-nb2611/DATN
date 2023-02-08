/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import queryString from "query-string";
import "../../assets/css/employees/employee.css";
import FiltersForm from "../../components/FiltersForm/search";
import LimitPagination from 'components/Pagination/limitPagination.js';
import employeesService from "services/materialService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from 'components/Snackbar/Snackbar.js';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import { People } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";

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

export default function Material(props) {

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
  const [tl, setTl] = React.useState(false);

  const [employees, setEmployees] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
    roleIds: [2,3],
  });

  function handlePageChange(newPage) {
    // console.log("new page: ", newPage);
    setFilters({
      ...filters,
      page: newPage,
    });
  }
  function handleFiltersChange(newFilters) {
    // console.log("New filters: ", newFilters);
    setFilters({
      ...filters,
      _page: 1,
      keyword: newFilters.keyword,
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
  function handleFiltersStatus(newStatus) {
    // console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      _page: 1,
      status: newStatus.status,
    });
  }
  function handleFiltersRole(newRole) {
    // console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      _page: 1,
      roleIds: newRole.ids,
    });
  }
  const addEmployee = () => {
    props.history.push("/admin/employees/add-employee");
  };

  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://localhost:8080/api/admin/users/list?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const data = responseJSON.userDTOS;
        const pagination = responseJSON.pagination;

        setEmployees(
          data.map((employee) => {
            return {
              select: false,
              id: employee.id,
              code: employee.code,
              name: employee.name,
              phone: employee.phone,
              status: employee.status,
            }
          }))
        setPagination(pagination);

        setIsLoaded(true);
      } catch (error) {
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
    var month = 0;
    while (month < 1 || month > 12) {
      month = prompt("Nhập Tháng từ 1 -> 12");
    }

    if (ids.length != 0 && month != 0) {
      let timesheets = { ids, month }
      employeesService.createTimeSheets(timesheets)
        .then(() => {
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            6000
          );
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error.response)
          if (error.response.data.errors) {
            alert(error.response.data.errors[0].defaultMessage);
          } else {
            alert(error.response.data.message);
          }
        });
    } else {
      alert("Không có lựa chọn nào! Vui lòng chọn lại!")
    }
  }
  const updateCategory = (id) => {
    props.history.push(`/admin/materials/update-material/${id}`);
  };
  const updateSalaryDay = (id) => {
    props.history.push(`/admin/employees/change-salary-day/${id}`)
  }


  const timesheet = () => {
    props.history.push('/admin/employees/time-sheets')
  }
  const handleAddMaterial = () => {
    props.history.push('/admin/materials/add-material');
    // props.history.push("/admin/employees/add-employee");
  }

  const classes = useStyles();



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Danh sách phụ tùng</h4>
              <p className={classes.cardCategoryWhite}>
                Danh sách phụ tùng trong cửa hàng sửa chữa xe máy
              </p>
            </CardHeader>
            <CardBody>
              <div>
                <div className="filter">
                  <FiltersForm onSubmit={handleFiltersChange} />
                  <div className="select">
                    {/*<EmployeeFilters onSubmit={handleFiltersStatus} />*/}
                  </div>
                  <div className="select-role">
                    {/*<RoleFilters onSubmit={handleFiltersRole} />*/}
                  </div>
                  <div className="add-employee">
                    <span style={{textAlign: "center"}} onClick={handleAddMaterial}>Thêm phụ tùng</span>
                    {/*<div className="button-menu">*/}
                    {/*  <button className="button-action" onClick={timesheet}>Bảng Công Nhân Viên</button>*/}
                    {/*  <button className="button-action" onClick={addEmployee}>+ Thêm mới nhân viên</button>*/}
                    {/*  <button className="button-action" onClick={handleCreateTimeSheets}>Tạo bảng công</button>*/}
                    {/*</div>*/}
                  </div>
                  <Snackbars
                    place="tc"
                    color="info"
                    message="Thành công!"
                    open={tl}
                    closeNotification={() => setTl(false)}
                    close
                  />
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          onChange={e => {
                            let value = e.target.checked;
                            setEmployees(
                              employees.map(employee => {
                                employee.select = value;
                                return employee;
                              })
                            );
                          }}
                        ></input>
                      </th>
                      <th>
                        <span>#</span>
                      </th>
                      <th>
                        <span>Mã nhân viên</span>
                      </th>
                      <th>
                        <span>Họ và tên</span>
                      </th>
                      <th>
                        <span>Số điện thoại</span>
                      </th>
                      <th>
                        <span>Trạng thái</span>
                      </th>
                      <th>
                        <span>Hoạt động</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <input
                          type="checkbox"
                          checked={employee.select}
                          onChange={e => {
                            let value = e.target.checked;
                            setEmployees(
                              employee.map(employeeCheck => {
                                if (employeeCheck.id === employee.id) {
                                  employeeCheck.select = value;
                                }
                                return employeeCheck;
                              })
                            );
                          }}
                        />
                        <td>
                          <span>{employee.id}</span>
                        </td>
                        <td>
                          <span>{employee.code}</span>
                        </td>
                        <td>
                          <span>{employee.name}</span>
                        </td>
                        <td>
                          <span>{employee.phone}</span>
                        </td>
                        <td>
                          <span>{employee.status}</span>
                        </td>
                        <td>
                          <button
                            style={{ border: "0px" }}
                            onClick={() => updateCategory(employee.id)}
                          >
                            <Edit style={{ width: "15px" }} />
                          </button>
                          <button
                            style={{ border: "0px" }}
                            onClick={() => updateSalaryDay(employee.id)}
                          >
                            <People style={{ width: "15px" }} />
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <LimitPagination onSubmit={handleChangeLimit} />
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
