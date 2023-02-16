import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/materials/receipt.css";
import FiltersForm from "../FiltersForm/ReceiptSearch.js";
import LimitPagination from 'components/Pagination/limitPagination.js';

// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// material-ui icons

import Snackbars from 'components/Snackbar/Snackbar.js';
import ReceiptsService from "../../services/ReceiptsService";
import { KeyboardArrowDown, KeyboardArrowUp, NavigateBefore } from "@material-ui/icons";
import { Collapse, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Box } from "@sapo-presentation/sapo-ui-components";
import MuiTableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
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

export default function Receipt(props) {
  const useStyles = makeStyles(styles);
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
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [receipts, setReceipts] = useState([]);
  const [modalReceiptClass, setModalReceiptClass] = useState('');
  const [listMaterialOrder, setListMaterialOrder] = useState([]);
  const [receiptCode, setReceiptCode] = useState('');
  const [receiptTotal, setReceiptTotal] = useState('');
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
    async function fetchReceiptList() {
      try {
        ReceiptsService.getReceipt(filters).then((res) => {
          let receipts = res.data.receiptDTOS;

          setReceipts(
            receipts.map((receipt) => {
              return {
                select: false,
                id: receipt.id,
                code: receipt.code,
                createDate: receipt.createDate,
                status: receipt.status,
                total: receipt.total,
                list: receipt.receiptMaterialResponseDTOs
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
        console.log("Failed to fetch receipt list: ", error.message);
      }
    }
    fetchReceiptList();
  }, [filters]);

  const getListMaterialOrderByReceiptId = (receipt) => {
    setReceiptCode(receipt.code)
    if (modalReceiptClass == '') {
      setModalReceiptClass('modal-material-order')
    }

    async function fetchMaterialOrderList() {
      try {
        ReceiptsService.getReceiptById(receipt.id).then((res) => {
          setReceiptTotal(res.data.total)
          const data = res.data.receiptMaterialResponseDTOs;
          setListMaterialOrder(
            data.map((materialOrder) => {
              return {
                select: false,
                idMaterial: materialOrder.idMaterial,
                name: materialOrder.name,
                code: materialOrder.code,
                quantity: materialOrder.quantity,
                price: materialOrder.price
              }
            }))

          setIsLoaded(true);
        }).catch(function (error) {
          console.log("ERROR: " + error.response.data.status)
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!")
          }
        })
      } catch (error) {
        console.log("Failed to fetch material order list: ", error.message);
        setError(error);
      }
    } fetchMaterialOrderList();
  }

  const hiddenListMaterialOrder = () => {
    setModalReceiptClass('')
  }
  const TableHead = withStyles(() => ({
    root: {
      backgroundColor: "#F9FAFC"
    }
  }))(MuiTableHead);
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold"
    }
  }))(TableCell);
  const back = () => {
    props.history.push('/admin/materials');
  }
  function createData(name, calories, fat, carbs, protein, price) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
          amount: 3,
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
          amount: 1,
        },
      ],
    };
  }
  console.log("454545", receipts)
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);


    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.code}
          </TableCell>
          <TableCell align="right">{row.createDate}</TableCell>
          <TableCell align="right">{row.status}</TableCell>
          <TableCell align="right">{row.total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết hóa đơn
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mã phụ tùng</TableCell>
                      <TableCell>Tên phụ tùng</TableCell>
                      <TableCell align="right">số lượng</TableCell>
                      <TableCell align="right">Giá Nhập (đ)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.list.map((historyRow) => (
                      <TableRow key={historyRow.idMaterial}>
                        <TableCell component="th" scope="row">
                          {historyRow.code}
                        </TableCell>
                        <TableCell>{historyRow.name}</TableCell>
                        <TableCell align="right">{historyRow.quantity}</TableCell>
                        <TableCell align="right">
                          {historyRow.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading....</div>;
  } else {
    return (

      <div className="list-receipts">
        <div className="title-receipts">
          <div className="name-title">
            <div className="button-cancel" onClick={back}>
              <NavigateBefore style={{ width: "15px" }} /> <span>Quay lại</span>
            </div>
            <div className="name-list"><span>Danh sách hóa đơn nhập hàng</span></div>
          </div>
        </div>
        <Box style={{ marginTop: "40px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table" >
              <TableHead variant="h6">
                <TableRow>
                  <TableCell />
                  <TableHeaderCell variant="h6">Mã hóa đơn</TableHeaderCell>
                  <TableHeaderCell align="right">Thời gian </TableHeaderCell>
                  <TableHeaderCell align="right">Trạng thái</TableHeaderCell>
                  <TableHeaderCell align="right">Tổng thanh toán</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipts.map((row) => (
                  <Row key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>


      </div>
    );
  }
}
