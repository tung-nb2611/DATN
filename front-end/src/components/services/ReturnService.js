import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/services/deleteService.css";
import '../../assets/css/search/InvoiceSearch.css'
import FiltersForm from "../FiltersForm/ServiceSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snackbars from 'components/Snackbar/Snackbar.js';
// core components
import DeleteIcon from '@material-ui/icons/Delete';
import Repeat from "@material-ui/icons/Repeat";
import ServicesService from "services/ServicesService";
import { NavigateBefore } from "@material-ui/icons";


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

function DeleteService(props) {
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

  const [tl, setTl] = React.useState(false);
  const [services, setServices] = useState([]);
  const [id, setId] = useState('');
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [warningClass, setWarningClass] = useState('');
  const [warningModalClass, setWarningModalClass] = useState('');

  const [idService, setIdService] = useState();

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 10,
  });
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
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


  useEffect(() => {
    async function fetchServiceList() {
      try {
        ServicesService.getListServiceStopServing(filters).then((res) => {
          const data = res.data.serviceDTOS;
          const pagination = res.data.pagination;


          setServices(
            data.map((service) => {
              return {
                select: false,
                id: service.id,
                code: service.code,
                name: service.name,
                description: service.description,
                price: service.price,
                status: service.status,
              }
            }))
          setPagination(pagination);
          console.log(data);
          console.log(pagination);
          setIsLoaded(true);
        }).catch(function (error) {
          console.log("ERROR: " + error.response.data.status)
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        console.log("Failed to fetch service list: ", error.message);
        setError(error);
      }
    }
    fetchServiceList();
  }, [filters]);

  const deleteService = () => {
    ServicesService.deleteService(id)
      .then(() => {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].defaultMessage);
        } else {
          console.log(error.response.data.message);
        }
      });
  }

  const putServiceToStillServing = (id) => {
    ServicesService.putServiceToStillServing(id)
      .then(() => {
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].defaultMessage);
        } else {
          console.log(error.response.data.message);
        }
      });

  }

  const back = () => {
    props.history.push('/admin/services');
  }

  const deleteS = (id) => {
    if (warningModalClass == '') {
      setWarningModalClass('warning-modal')
      setId(id)
    }
  }

  const backconfirm = () => {
    setWarningClass('');
    setWarningModalClass('');
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (
      <div className="list-delete-services">
        <div className="title-delete-services">
          <div className="name-title">
            <div className="button-cancel" onClick={back}>
              <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
            </div>
            <div className="name-list"><span>Danh sách dịch vụ ngưng phục vụ</span></div>
          </div>
        </div>

        <div id="warning-modal" className={warningModalClass}>
          <div id="warning" className={warningClass}>
            <div className="title-warning">
              <span>Xóa dịch vụ?</span>
            </div>
            <div className="content-warning">
              <div className="text-warning"><span>Bạn có chắc muốn xóa dịch vụ này? Thao tác này không thể khôi phục.</span></div>
              <div className="button-warning">
                <button className="delete-permission" onClick={deleteService}><span>Xóa</span></button>
                <div className="back" onClick={backconfirm}><span>Thoát</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-delete-services">
          <Snackbars
            place="tc"
            color="info"
            message="Thành công!"
            open={tl}
            closeNotification={() => setTl(false)}
            close
          />



          <div className="filter">
            <FiltersForm onSubmit={handleFiltersChange} />

          </div>
          <div className="hight-table">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <span>Mã dịch vụ</span>
                  </th>
                  <th>
                    <span>Tên dịch vụ</span>
                  </th>
                  <th>
                    <span>Mô ta dịch vụ</span>
                  </th>
                  <th>
                    <span>Giá</span>
                  </th>
                  <th>
                    <span>Trạng thái</span>
                  </th>
                  <th className="th-7">
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td className="td-3">
                      <span>{service.code}</span>
                    </td>
                    <td className="td-4">
                      <span>{service.name}</span>
                    </td>
                    <td className="td-5">
                      <span>{service.description}</span>
                    </td>
                    <td className="td-5">
                      <span>{service.price}</span>
                    </td>
                    <td className="td-5">
                      <span>{service.status}</span>
                    </td>
                    <td className="td-7">
                      <button
                        className="button-icon"
                        onClick={() => putServiceToStillServing(service.id)}
                      >
                        <Repeat style={{ width: "15px" }} /><div className="info-button"><span>Tái dịch vụ</span></div>
                      </button>
                      <button
                        className="button-icon"
                        onClick={() => deleteS(service.id)}
                      >
                        <DeleteIcon style={{ width: "15px" }} /><div className="info-button"><span>Xóa dịch vụ</span></div>
                      </button>
                    </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-limit">
            <div className="limit">
              <span>Hiển thị </span><LimitPagination onSubmit={handleChangeLimit} /> <span> kết quả</span>
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
export default DeleteService;