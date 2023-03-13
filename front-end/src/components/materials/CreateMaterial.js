/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

import MaterialService from "../../services/materialService.js";
import "../../assets/css/materials/createMaterial.css";
import { Label, NavigateBefore } from "@material-ui/icons";
import Snackbars from "components/Snackbar/Snackbar.js";
import { Box, Container, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

function CreateMaterial(props) {
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

  const [message, setMessage] = useState("");
  const [tl, setTl] = React.useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [supplier, setSupplier] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");

  const changeName = (event) => {
    setName(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const changeSupplier = (event) => {
    setSupplier(event.target.value);
  };
  const changeOutputPrice = (event) => {
    setOutputPrice(event.target.value);
  };
  const changeInputPrice = (event) => {
    setInputPrice(event.target.value);
  };
  const changeStatus = (event) => {
    setStatus(event.target.value);
  };

  //tạo phụ tùng mới
  const saveMaterial = (e) => {
    e.preventDefault();

    let material = {
      name,
      description,
      supplier,
      quantity,
      inputPrice,
      outputPrice,
      status,
    };
    console.log("material => " + JSON.stringify(material));
    MaterialService.postMaterial(material)
      .then(() => {
        props.history.push("/admin/materials");
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

  const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: {
        multiline: {
          fontWeight: "bold",
          fontSize: "20px",
          color: "purple",
          width: "50vw",
        },
      },
    },
  });
  const cancel = () => {
    props.history.push("/admin/materials");
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
      <div className="title-materials">
        <div className="button-cancel" onClick={cancel}>
          <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
        </div>
        <button className="button-add" onClick={saveMaterial}>
          Lưu
        </button>
      </div>

      {/* <div className="add-new-materials">
        <div className="title">
          <span>Thêm phụ tùng mới</span>
        </div>
        <div className="card-body">
          <form>
            <div className="group">
              <div className="group-right">
                <div className="form-group">
                  <label>Tên phụ tùng <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Tên phụ tùng"
                    name="name"
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={changeName}
                  />
                </div>
                <div className="form-group">
                  <label>Mô tả </label>
                  <br />
                  <input
                    placeholder="Điền mô tả của phụ tùng"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={changeDescription}
                  />
                </div>
                
                <div className="form-group">
                  <label>Nhà cung cấp </label>
                  <br />
                  <input
                    placeholder="Điền nhà cung cấp"
                    name="supplier"
                    className="form-control"
                    value={supplier}
                    onChange={changeSupplier}
                  />
                </div>
                <div className="form-group">
                  <label>Số lượng</label>
                  <br />
                  <input
                    placeholder="Điền số lượng của phụ tùng"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={changeQuantity}
                  />
                </div>
                <div className="form-group">
                  <label>Giá nhập <span style={{color: 'red'}}> *</span> </label>
                  <br />
                  <input
                    placeholder="Điền giá nhập"
                    name="inputPrice"
                    className="form-control"
                    value={inputPrice}
                    onChange={changeInputPrice}
                  />
                </div>
                <div className="form-group">
                  <label>Giá bán <span style={{color: 'red'}}> *</span></label>
                  <br />
                  <input
                    placeholder="Điền giá bán"
                    name="outputPrice"
                    className="form-control"
                    value={outputPrice}
                    onChange={changeOutputPrice}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div> */}
      <Container fixed theme={theme}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          Thêm mới phụ tùng
        </Typography>
        <Box sx={{ bgcolor: "white", height: "60vh", display: "flex" }}>

          <Box style={{ padding: "10px 15px", width: "50%" }}>
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
            <TextField
              style={{ marginTop: "50px", width: "90%" }}
              data-tip="Điền nhà cung cấp"
              label="Hãng cung cấp"
              id="outlined-required"
              variant="outlined"
              size="small"
              value={supplier}
              onChange={changeSupplier}
            />
            <TextField
              label="Điền số lượng của phụ tùng"
              size="small"
              width="55%"
              id="outlined-basic"
              variant="outlined"
              value={quantity}
              onChange={changeQuantity}
              style={{ marginTop: "50px", width: "90%" }}
            />
          </Box>
          <Box style={{ padding: "10px 15px", width: "50%" }}>
            <TextField
              label="Điền giá nhập"
              size="small"
              width="50%"
              id="outlined-basic"
              variant="outlined"
              value={inputPrice}
              onChange={changeInputPrice}
              style={{ width: "90%" }}
            />
            <TextField
              label="Điền giá bán"
              fullWidth
              size="small"
              width="50%"
              id="outlined-basic"
              variant="outlined"
              value={outputPrice}
              onChange={changeOutputPrice}
              style={{ marginTop: "50px", width: "90%" }}
            />

            <TextareaAutosize
              label="Điền mô tả của phụ tùng"
              id="outlined-basic"
              variant="outlined"
              required
              value={description}
              onChange={changeDescription}
              style={{ marginTop: "50px", width: "90%", height: "30px" }}
            />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
export default CreateMaterial;
