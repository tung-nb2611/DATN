import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";

import "../../assets/css/invoices/invoices.css";
import "../../assets/css/modal/modal.css";
import FiltersForm from "../FiltersForm/SearchInvoice.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbars from 'components/Snackbar/Snackbar.js';

import { ArrowDropDown, Delete, NavigateBefore, NavigateBeforeSharp, NavigateNext, NextWeek, People, SettingsApplicationsRounded, SkipNext, Sort, SortByAlpha, SortByAlphaOutlined, SortTwoTone, ViewAgenda, ViewArrayOutlined, ViewList, ViewModuleTwoTone, Watch } from "@material-ui/icons";
import Edit from "@material-ui/icons/Edit";
import InvoicesService from "services/InvoicesService";
import InvoiceFilterStatus from "../../components/FiltersForm/InvoiceFilterStatus";
import { Modal } from "reactstrap";
import cardIconStyle from "assets/jss/material-dashboard-react/components/cardIconStyle";
import cancelSmallMinor from "../../common/cancelSmallMinor.svg";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
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
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function Invoices(props) {
  const classes = useStyles();

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
  const [open, setOpen] = useState(false);
  const [tl, setTl] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [messageSuccess, setMessageSuccess] = useState('');
  const [messageError, setMessageError] = useState('');
  const [id, setId] = useState('');
  const [area_id, setArea_id] = useState(props.match.params.id);
  const [invoices, setInvoices] = useState([]);
  const [warningModalClass, setWarningModalClass] = useState('');
  const [warningClass, setWarningClass] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [buttonOtherClass, setButtonOtherClass] = useState('');
  const [areaChosse, setAreaChosse] = useState('');
  const [customerClass, setCustomerClass] = useState('');
  const [invoiceId, setInvoiceId] = useState('');
  const [SxId, setSxId] = useState('');
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
    totalRows: 10,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [1, 2],
    sort: 0,
  });
  const [filters1, setFilters1] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [1, 2, 3, 7],
    sort: 0,
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
      page: 1,
      keyword: newFilters.keyword,
    });
  }
  function handleChangeLimit(newLimit) {
    // console.log("New Month: ", newLimit);
    setFilters({
      ...filters,
      page: 1,
      limit: newLimit.limit,
    });
  }
  function hanleChangeInvoice(newStatus) {
    console.log("New Status: ", newStatus);
    setFilters({
      ...filters,
      page: 1,
      status: newStatus.statusList,
    });
  }
  const changeSort = () => {
    if (filters.sort == 1) {
      setFilters({
        ...filters,
        page: 1,
        sort: 2,
      });
    } else {
      setFilters({
        ...filters,
        page: 1,
        sort: 1,
      });
    }

  }
  const addInvoice = () => {
    props.history.push("/admin/invoices/add-invoice");
  }

  const payment = () => {
    props.history.push("/admin/invoices/payment");
  }
  //Lấy thông tin hóa đơn
  useEffect(() => {
    async function fetchInvoice() {
      try {
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
          console.log(res.data);
          setAreaChosse();
          setCustomerClass(res.data.customerVehicleDTO.customerDTO.name);
          setInvoiceId()
        });

      } catch (error) {
        console.log("Failed to fetch Invoicce: ", error.message);
      }
    }
    fetchInvoice();
  }, []);



  useEffect(() => {
    async function fetchInvoicesList() {
      if (area_id) {
        try {
          InvoicesService.getInvoices(filters).then((res) => {
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
      else {
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
    }
    fetchInvoicesList();
  }, [filters]);

  const editInvoice = (id) => {
    props.history.push(`/admin/invoices/edit-invoice/${id}`)
  }
  const viewInvoice = () => {
    setOpen(true)
    console.log("okeee", open);
  }
  const toggle = () => {
    setOpen(false)
  }
  const listInvoiceNoFixer = () => {
    props.history.push('/admin/invoices/list-invoice/no-fixer')
  }
  const createInvoiceMaterial = () => {
    props.history.push("/admin/invoices/add-invoice-material");
  }
  const deleteInvoice = (id) => {
    if (warningModalClass == '') {
      setWarningModalClass('warning-modal');
      setId(id);
    }
  }
  //Xóa phiếu sửa chữa
  const back = () => {
    setWarningClass('');
    setWarningModalClass('');
  }
  const deleteI = (e) => {
    e.preventDefault();
    InvoicesService.deleteInvoice(id)
      .then(() => {
        setMessageSuccess('Xóa phiếu thành công!')
        setTl(true);
        // use this to make the notification autoclose
        setTimeout(
          function () {
            setTl(false)
          },
          3000
        );

        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.status == 403) {
          alert("Không có quyền truy cập!")
        } else if (error.response.data.errors) {
          setWarningClass('');
          setWarningModalClass('');
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
          setWarningClass('');
          setWarningModalClass('');
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
  const colorStatusInvoice = status => {
    if (status.localeCompare("Đang chờ thợ") == 0) {
      return <span style={{ color: "#3c91f1" }}>{status}</span>
    } else if (status.localeCompare("Đang xét duyệt") == 0) {
      return <span style={{ color: "#35df24" }}>{status}</span>
    } else if (status.localeCompare("Chờ xử lý") == 0) {
      return <span style={{ color: "#3c91f1" }}>{status}</span>
    } else if (status.localeCompare("Đang sửa") == 0) {
      return <span style={{ color: "red" }}>{status}</span>
    }
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (

      <div className="list-invoices">
        <Modal
          isOpen={open}
          toggle={toggle}
        >
          <div className="ui-modal__header">
            <div className="ui-modal__header-title">
              <h2 className="ui-heading">
                {"Hóa Đơn"}
              </h2>
            </div>
            <div className="ui-modal__header-actions">
              <div className="ui-modal__close-button">
                <div className="td-5 delete-service"><span onClick={toggle}>x</span></div>
              </div>
            </div>
          </div>
          <div className="ui-modal__body">
            <div className="ui-modal__section">
              <div className="next-input-wrapper">
                <label className="next-label" htmlFor="Name">
                  Mã Phiếu Sửa chữa
                </label>
                <input
                  type="text"
                  size="30"
                  className="next-input"
                  name="name"
                />
                <label className="next-label" htmlFor="BXX">
                  Biển số xe
                </label>
                <input
                  type="text"
                  size="30"
                  className="next-input"
                  name="BXX"
                />
              </div>
              <div className="next-input-wrapper" style={{ marginLeft: "300px", marginTop: "-70px" }}>
                <label className="next-label" >
                  Khu vực
                </label>
                <input
                  type="text"
                  placeholder="chọn khu vực"
                  size="30"
                  className="next-input"
                />
                <label className="next-label" htmlFor="Name">
                  Tên nhân viên
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên phương thức"
                  size="30"
                  className="next-input"
                  name="name"
                />
              </div>

            </div>
          </div>
        </Modal>
        <div className="title-invoices">
          <div className="name-title"><span>Danh sách phiếu sửa chữa</span></div>
          <div className="add-new-invoice"><button className="button-add" onClick={addInvoice}>Thêm phiếu</button></div>
        </div>
        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
            <div className="title-warning">
              <span>Xóa phiếu sửa chữa?</span>
            </div>
            <div className="content-warning">
              <div className="text-warning"><span>Bạn có chắc muốn xóa phiếu sửa chữa? Thao tác này không thể khôi phục.</span></div>
              <div className="button-warning">
                <button className="delete-permission" onClick={deleteI}><span>Xóa</span></button>
                <div className="back" onClick={back}><span>Thoát</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-invoices">
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
          <div className="hight-table">
            <table className="table">
              <thead>
                <tr>
                  <th className="th-3">
                    <span>Mã phiếu</span>
                  </th>
                  <th className="th-4">
                    <span>Biển số</span>
                  </th>
                  <th className="th-5">
                    <span>Nhân viên</span>
                  </th>
                  <th className="th-6">
                    <span>Trạng thái</span> <SortTwoTone onClick={changeSort} style={{ width: "15px", marginLeft: "5px", position: "absolute", cursor: "pointer" }} />
                  </th>
                  <th className="th-7">
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="td-3">
                      <span>{invoice.code}</span>
                    </td>
                    <td className="td-4">
                      <span>{invoice.licensePlate}</span>
                    </td>
                    <td className="td-5">
                      <span>{invoice.fixerName}</span>
                    </td>
                    <td className="td-6">
                      {colorStatusInvoice(invoice.status)}
                    </td>
                    <td className="td-7">
                      <button className="button-icon"
                        onClick={() => editInvoice(invoice.id)}
                      >
                        <Edit style={{ width: "15px" }} /><div className="info-button"><span>Sửa thông tin phiếu</span></div>
                      </button>
                      {/* <button className="button-icon"
                        onClick={() => viewInvoice(invoice.id)}
                      >
                        <ViewModuleTwoTone style={{ width: "15px" }} /><div className="info-button"><span>Duyệt phiếu sửa chữa</span></div>
                      </button> */}
                      <button
                        className="button-icon"
                        onClick={() => deleteInvoice(invoice.id)}
                      >
                        <Delete style={{ width: "15px" }} /><div className="info-button"><span>Xóa phiếu sửa chữa</span></div>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>


          <div className="pagination-limit">
            <div className="limit">
              <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span style={{ marginTop: "21px" }}> kết quả</span>
            </div>
            <div className="pagination">
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

    );
  }
}
