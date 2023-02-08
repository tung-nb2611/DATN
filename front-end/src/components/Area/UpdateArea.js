/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EmployeesService from "../../services/employees.js";
import "../../assets/css/employees/updateEmployee.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Person from "@material-ui/icons/Person";
import { ArrowDropDown, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SkipNext } from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';
import StoreService from "../../services/StoreService.js";
import AreaService from "../../services/AreaService.js";


function UpdateArea(props) {
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
  const [message, setMessage] = useState('');
  const [tl, setTl] = React.useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState();
  const [code, setCode] = useState("");
  const [sex, setSex] = useState();
  const [idCard, setIdCart] = useState("");
  const [salaryDay, setSalaryDay] = useState("");
  const [createDate, setCreateDate] = useState("");
  const [username, setUsername] = useState("");

  // eslint-disable-next-line react/prop-types
  const [id, setId] = useState(props.match.params.id);

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeStatus = (event) => {
    setStatus(event.target.value);
  };


  const updateArea = (e) => {
    e.preventDefault();
    let area = { name, status };
    AreaService.updateArea(id, area)
      .then(() => {
        props.history.push("/admin/areas");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          setMessage(error.response.data.errors[0].defaultMessage)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        } else {
          setMessage(error.response.data.message)
          setTl(true);
          // use this to make the notification autoclose
          setTimeout(
            function () {
              setTl(false)
            },
            3000
          );
        }
      });
  };

  useEffect(() => {
    AreaService.getAreaById(id).then((res) => {
      let area = res.data;
      setName(area.name);
      setStatus(area.status);
    });
  }, []);


  const cancel = () => {
    props.history.push("/admin/areas");
  };

  return (
    <div className="body-edit-employees">
      <Snackbars
        place="tc"
        color="warning"
        message={message}
        open={tl}
        closeNotification={() => setTl(false)}
        close
      />
      <div className="title-employees">
        <div
          className="button-cancel"
          onClick={cancel}
        >
          <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
        </div>
        <button className="button-add" onClick={updateArea}>
          Lưu
        </button>
      </div>
      <div className="top">
        <div className="add-edit-employee">
          <div className="title">
            <span>Sửa thông tin khu vực</span>
          </div>
          <div className="card-body">
            <form>
              <div className="group">
                <div className="group-main">
                  <div className="form-group">
                    <label>Tên cửa hàng<span style={{ color: "red" }}>*</span> : </label>
                    <br />
                    <input
                      placeholder="Tên nhân viên"
                      name="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={changeName}
                    />
                  </div>
                  <div className="form-group">
                    <label>Địa chỉ: </label>
                    <br />
                    <input
                      placeholder="Điền địa chỉ ở hiện tại của nhân viên"
                      name="address"
                      className="form-control"
                      value={status}
                      onChange={changeStatus}
                    />
                  </div>

                  <div>
                    {/* <input type="checkbox" name="status" value={checked} onChange={changeStatus} />
                    <label>Đang làm việc</label> */}
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UpdateArea;
