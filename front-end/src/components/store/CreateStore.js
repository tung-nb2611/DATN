/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import EmployeesService from "../../services/employees.js";
import "../../assets/css/employees/createEmployee.css";
import RolesService from "services/RoleService.js";
import { ArrowDropDown, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SkipNext } from "@material-ui/icons";
import Snackbars from 'components/Snackbar/Snackbar.js';
import StoreService from "../../services/StoreService.js";

function CreateStore(props) {
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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleClass, setRoleClass] = useState('');
  const [modalClass, setModalClass] = useState('');


  const changeName = (event) => {
    setName(event.target.value);
  };


  const changeAddress = (event) => {
    setAddress(event.target.value);
  };








  //tạo nhân viên mới
  const saveStore = (e) => {
    e.preventDefault();
    let store = { name, address };
    StoreService.postStore(store)
      .then(() => {
        props.history.push("/admin/store");
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



  const cancel = () => {
    props.history.push("/admin/store");
  };

  return (
    <div className="body">
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
        <button className="button-add" onClick={saveStore}>
          Lưu
        </button>
      </div>
      <div className="add-new-employees">
        <div className="title">
          <span>Thêm mới cửa hàng</span>
        </div>
        <div className="card-body">
          <form>
            <div className="group">
              <div className="group-left">
                <div className="form-group">
                  <label>Tên cửa hàng<span style={{ color: "red" }}>*</span>: </label>
                  <br />
                  <input
                    placeholder="Điền tên cửa hàng"
                    name="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={changeName}
                  />
                </div>
                <div className="form-group">
                  <label>Địa chỉ<span style={{ color: "red" }}>*</span>: </label>
                  <br />
                  <input
                    placeholder="Điền Đại chỉ cửa hàng"
                    name="adress"
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={changeAddress}
                  />
                </div>



              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default CreateStore;
