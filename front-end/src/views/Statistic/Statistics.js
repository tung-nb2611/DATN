import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import InputIcon from "@material-ui/icons/Input";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import MotorcycleIcon from "@material-ui/icons/Motorcycle";
import MoodIcon from "@material-ui/icons/Mood";
import ReceiptIcon from "@material-ui/icons/Receipt";
import { bugs, website, server } from "variables/general.js";
import { useEffect, useState } from "react";
import "./static.css";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import axios from "axios";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Pagination from "../../views/Statistic/panigationStatistic";
import { showPrice, customFormat } from "../../helper/function";
import LimitPagination from "../../components/Pagination/limitPagination";
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import "../../assets/css/pagination/pagination.css";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { OverviewBudget } from "./overView1";
import Test1 from "./report";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Table, Typography } from "@material-ui/core";
import { Box } from "@sapo-presentation/sapo-ui-components";
import {
  Checkbox,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Container,
  Link,
  TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import EmployeeService from "../../services/EmployeeService";
const useStyles = makeStyles(styles);

export default function Statistics() {
  const classes = useStyles();
  const [areas, setAreas] = useState([]);
  const [areaName, setAreaName] = useState([]);
  const [customers, setCustomer] = useState([]);
  const [labels1, setLabels1] = useState();
  const [series1, setSeries1] = useState([]);
  const [test1, setTest1] = useState([]);
  const [service, setService] = useState([]);
  const [sumService, setSumService] = useState();
  const [number, setNumber] = useState();
  const [material, setMaterial] = useState([]);
  const [sumCustomers, setSumCustomer] = useState();
  const [high1, setHigh1] = useState();
  var listLab1 = [];
  var listSer1 = [];
  const [labels2, setLabels2] = useState();
  const [series2, setSeries2] = useState();
  const [high2, setHigh2] = useState();
  var listLab2 = [];
  var listSer2 = [];
  const [data, setData] = useState([]);
  const [dataCus, setDataCus] = useState([]);
  const [dataEm, setDataEm] = useState([]);
  const [data1, setData1] = useState([]);
  var listCustomer = [];
  var listEmployee = [];
  const [labels3, setLabels3] = useState();
  const [series3, setSeries3] = useState();
  const [high3, setHigh3] = useState();
  var listLab3 = [];
  var listSer3 = [];
  const [pageC, setPageC] = useState(1);
  const [sumRevune, setSumRevune] = useState(0);
  const [sumInput, setSumInput] = useState(0);
  var xValues = [];
  var yValues = [];
  const dataCustomer = {
    header: [
      "#",
      "code",
      "Tên khách hàng",
      "SĐT",
      "Biển số xe",
      "Số lần sử dụng",
      "Tổng tiền",
    ],
    data: dataCus,
  };
  // console.log(data.length)
  const dataRevune = {
    data: {
      labels: labels1,
      series: series1,
    },
    options: {
      low: 0,
      high: high1,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const dataService = {
    data: {
      labels: labels2,
      series: series2,
    },
    options: {
      low: 0,
      high: high2,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const dataMaterial = {
    data: {
      labels: labels3,
      series: series3,
    },
    options: {
      low: 0,
      high: high3,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
  };

  const [pagination, setPagination] = useState({
    page: pageC,
    limit: 5,
    totalRows: 20,
  });

  Date.prototype.customFormat = function (formatString) {
    var YYYY,
      YY,
      MMMM,
      MMM,
      MM,
      M,
      DDDD,
      DDD,
      DD,
      D,
      hhhh,
      hhh,
      hh,
      h,
      mm,
      m,
      ss,
      s,
      ampm,
      AMPM,
      dMod,
      th;
    YY = ((YYYY = this.getFullYear()) + "").slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? "0" + M : M;
    MMM = (MMMM = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? "0" + D : D;
    DDD = (DDDD = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][this.getDay()]).substring(0, 3);
    th =
      D >= 10 && D <= 20
        ? "th"
        : (dMod = D % 10) == 1
        ? "st"
        : dMod == 2
        ? "nd"
        : dMod == 3
        ? "rd"
        : "th";
    formatString = formatString
      .replace("#YYYY#", YYYY)
      .replace("#YY#", YY)
      .replace("#MMMM#", MMMM)
      .replace("#MMM#", MMM)
      .replace("#MM#", MM)
      .replace("#M#", M)
      .replace("#DDDD#", DDDD)
      .replace("#DDD#", DDD)
      .replace("#DD#", DD)
      .replace("#D#", D)
      .replace("#th#", th);
    h = hhh = this.getHours();
    if (h == 0) h = 24;
    if (h > 24) h -= 24;
    hh = h < 10 ? "0" + h : h;
    hhhh = hhh < 10 ? "0" + hhh : hhh;
    AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? "0" + m : m;
    ss = (s = this.getSeconds()) < 10 ? "0" + s : s;
    return formatString
      .replace("#hhhh#", hhhh)
      .replace("#hhh#", hhh)
      .replace("#hh#", hh)
      .replace("#h#", h)
      .replace("#mm#", mm)
      .replace("#m#", m)
      .replace("#ss#", ss)
      .replace("#s#", s)
      .replace("#ampm#", ampm)
      .replace("#AMPM#", AMPM);
  };

  const [start, setStart] = useState(
    new Date(new Date().getTime() - 604800000).customFormat(
      "#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#"
    )
  );
  const [start1, setStart1] = useState(
    new Date(new Date().getTime() - 604800000).customFormat("#YYYY#/#MM#/#DD#")
  );
  console.log("start", start1);
  const [end, setEnd] = useState(
    new Date(new Date().getTime()).customFormat(
      "#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#"
    )
  );
  const [end1, setEnd1] = useState(
    new Date(new Date().getTime()).customFormat("#YYYY#/#MM#/#DD# ")
  );
  const [monthS, setMonthS] = useState(
    new Date(new Date().getTime() - 604800000).customFormat(
      "#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#"
    )
  );
  const [monthE, setMonthE] = useState(
    new Date(new Date().getTime()).customFormat(
      "#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#"
    )
  );
  // console.log(new Date(new Date().getTime()).customFormat("#MM#"))
  var sum = 0;
  var countHigh = 0;
  const [user, setUser] = React.useState({
    store: {},
  });

  useEffect(() => {
    getData();
  }, [start, end]);

  const getData = async () => {
    //rrevune
    const res1 = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/invoices?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });

    if (res1.data) {
      res1.data.forEach((item) => {
        var dateObject = new Date(item.createAt);
        yValues.push(dateObject.toLocaleDateString());
        xValues.push(item.totalOutput);
      });
      for (var i in res1.data) {
        sum += res1.data[i].totalOutput;
        if (countHigh < sum / 1000) {
          countHigh = sum / 1000 + 200;
        }
        var dateObject = new Date(res1.data[i].createAt);
        listLab1.push(dateObject.toLocaleDateString());
        listSer1.push(res1.data[i].totalOutput / 1000);
      }
      setTest1(res1.data);
    }
    setSumRevune(sum);
    setLabels1(listLab1);
    setSeries1([listSer1]);
    setHigh1(countHigh);
    const res6 = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/input?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });
    if (res6.data) {
      var sum1 = 0;
      for (var i in res6.data) {
        sum1 += res6.data[i].totalMoney;
      }
    }
    setSumInput(sum1);

    const res2 = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/services?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });

    if (res2.data) {
      countHigh = 0;
      for (var i in res2.data) {
        if (countHigh < res2.data[i].numberInvoices) {
          countHigh = res2.data[i].numberInvoices + 4.5;
        }
        listLab2.push(res2.data[i].name.toString());
        listSer2.push(res2.data[i].numberInvoices.toString());
      }
      var test = res2.data.map((x) => x.totalPurchased);
      let sum = 0;
      for (let i = 0; i < test.length; i++) {
        sum += test[i];
      }

      setService(res2.data);
      setSumService(sum);
    }

    listSer2.sort();
    listLab2.sort();
    var listS2 = [];
    var listL2 = [];
    if (listSer2.length > 5) {
      for (var i = listSer2.length - 5; i < listSer2.length; i++) {
        listS3.push(listSer2[i]);
        listL3.push(listLab2[i]);
      }
      setLabels2(listL2);
      setSeries2([listS2]);
    } else {
      setLabels2(listLab2);
      setSeries2([listSer2]);
    }

    setHigh2(countHigh);

    const res3 = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/materials?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });

    if (res3.data) {
      countHigh = 0;
      for (var i in res3.data) {
        if (countHigh < res3.data[i].numberPurchases) {
          countHigh = res3.data[i].numberPurchases + 4;
        }
        listLab3.push(res3.data[i].name.toString());
        listSer3.push(res3.data[i].numberPurchases.toString());
      }
    }
    setMaterial(res3.data);

    listSer3.sort();
    listLab3.sort();
    var listS3 = [];
    var listL3 = [];
    if (listSer3.length > 5) {
      for (var i = listSer3.length - 5; i < listSer3.length; i++) {
        listS3.push(listSer3[i]);
        listL3.push(listLab3[i]);
      }
      setLabels3(listL3);
      setSeries3([listS3]);
    } else {
      setLabels3(listLab3);
      setSeries3([listSer3]);
    }

    setHigh3(countHigh);
    const invocie = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/invoice?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });

    setAreas(invocie.data);
    var name = invocie.data.map((x) => x.areaName);
    setAreaName(name);

    const res4 = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/customers?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });
    if (res4.data) {
      for (var i in res4.data) {
        listCustomer.push([
          res4.data[i].id,
          res4.data[i].code,
          res4.data[i].name,
          res4.data[i].phone,
          res4.data[i].licensePlate,
          res4.data[i].numberPurchases,
          showPrice(res4.data[i].totalPurchased).toString(),
        ]);
      }
      var test = res4.data.map((x) => x.numberPurchases);
      let sum = 0;
      for (let i = 0; i < test.length; i++) {
        sum += test[i];
      }
      setSumCustomer(sum);
    }
    setCustomer(res4.data);
    const resNumber = await axios({
      method: "get",
      url:
        "http://localhost:8080/api/admin/statistics/number?dateStart=" +
        start +
        "&dateEnd=" +
        end,
    });

    setNumber(resNumber.data);

    var tg = [];
    for (var i = 0; i < listCustomer.length - 1; i++)
      for (var j = i + 1; j < listCustomer.length; j++) {
        if (listCustomer[i][5] < listCustomer[j][5]) {
          // var a = listCustomer[i][5];
          // listCustomer[i][5] = listCustomer[j][5];
          // listCustomer[j][5] = a;

          tg = listCustomer[i];
          listCustomer[i] = listCustomer[j];
          listCustomer[j] = tg;
        }
      }
    setData(listCustomer);
  };

  function handleChangeInputTag(e, func) {
    e.preventDefault();
    func(e.target.value);
    setStart(
      new Date(e.target.value).customFormat("#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#")
    );
  }
  function handleChangeInputTagEnd(e, func) {
    e.preventDefault();
    func(e.target.value);
    setEnd(
      new Date(e.target.value).customFormat("#YYYY#/#MM#/#DD# #hh#:#mm#:#ss#")
    );
  }

  function handlePageChange(newPage) {
    setPageC(newPage);
    // console.log(pageC);
  }

  // function handleChangeLimit(newLimit) {
  //   console.log("New Month: ", newLimit);
  //   setFilters({
  //     ...filters,
  //     _page: 1,
  //     limit: newLimit.limit,
  //   });
  // }

  const handleSubmit = (e) => {
    // console.log(e)
    // e.preventDefault();
    // var _form = document.getElementById(1);
    // var _data = new FormData(_form);
    // console.log(_data.get('start'))
    // setStart(_data.get('start'));
    // setEnd((_data.get('end')));
    // console.log(_data.get('start').customFormat("#MM#"))
    // var a = _data.get('start').customFormat("#MM#")
  };
  const [pageCC, setPageCC] = useState(1);
  const pageNumbers = [];
  const totalPages = Math.ceil(data.length / 5);
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    var a = data.length;
    var a1 = Math.floor(data.length / 5);
    var pa = [];
    if (data.length != 0) {
      for (var i in pageNumbers) {
        if (pageNumbers[i] == pageCC) {
          if (a1 == pageCC - 1) {
            for (var j = i * 5; j < a; j++) {
              pa.push(data[j]);
            }
            break;
          } else {
            for (var j = i * 5; j < i * 5 + 5; j++) {
              pa.push(data[j]);
            }
            break;
          }
        }
      }
    }

    setDataCus(pa);
  }, [pageCC, data]);

  function nextPage() {
    setPageCC(pageCC + 1);
  }

  function privewPage() {
    setPageCC(pageCC - 1);
  }

  function changePage(number) {
    setPageCC(number);
  }
  const renderPanigationCus = () => {
    return (
      <div style={{ display: "flex", width: "600px", margin: "auto" }}>
        <ul id="page-numbers">
          <li>
            <button
              disabled={pageCC <= 1}
              onClick={() => privewPage()}
              // onClick={() => setPageCC(pageCC - 1)}
            >
              <NavigateBefore style={{ width: "15px" }} />
            </button>
          </li>
          {pageNumbers.map((number) => {
            if (pageCC === number) {
              return (
                <li key={number} id={number} className="active">
                  <button style={{ background: "#bbbbbb" }}>{number}</button>
                </li>
              );
            } else {
              return (
                <li key={number} id={number} onClick={() => changePage(number)}>
                  {/*<li key={number} id={number} onClick={() => setPageCC(number)} >*/}
                  <button>{number}</button>
                </li>
              );
            }
          })}
          <li>
            <button
              disabled={pageCC >= totalPages}
              onClick={() => nextPage()}
              // onClick={() => setPageCC(pageCC + 1)}
            >
              <NavigateNext style={{ width: "15px" }} />
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const [pageE, setPageE] = useState(1);
  const pageNumbersE = [];
  const totalPagesE = Math.ceil(data1.length / 5);
  for (let i = 1; i <= Math.ceil(totalPagesE); i++) {
    pageNumbersE.push(i);
  }

  useEffect(() => {
    var a = data1.length;
    var a1 = Math.floor(data1.length / 5);
    var pa1 = [];
    if (data1.length != 0) {
      for (var i in pageNumbersE) {
        if (pageNumbersE[i] == pageE) {
          if (a1 == pageE - 1) {
            for (var j = i * 5; j < a; j++) {
              pa1.push(data1[j]);
            }
            break;
          } else {
            for (var j = i * 5; j < i * 5 + 5; j++) {
              pa1.push(data1[j]);
            }
            break;
          }
        }
      }
    }
    setDataEm(pa1);
  }, [pageE, data1]);
  const ok = series1;
  const data9 = {
    labels: labels1,
    datasets: [
      {
        label: "First dataset",
        data: ok,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };
  const renderPanigationEm = () => {
    return (
      <div style={{ display: "flex", width: "600px", margin: "auto" }}>
        <ul id="page-numbers">
          <li>
            <button
              disabled={pageE <= 1}
              // onClick={() => set}
              onClick={() => setPageE(pageE - 1)}
            >
              <NavigateBefore style={{ width: "15px" }} />
            </button>
          </li>
          {pageNumbersE.map((number) => {
            if (pageE === number) {
              return (
                <li key={number} id={number} className="active">
                  <button style={{ background: "#bbbbbb" }}>{number}</button>
                </li>
              );
            } else {
              return (
                <li key={number} id={number} onClick={() => setPageE(number)}>
                  {/*<li key={number} id={number} onClick={() => setPageCC(number)} >*/}
                  <button>{number}</button>
                </li>
              );
            }
          })}
          <li>
            <button
              disabled={pageE >= totalPagesE}
              onClick={() => setPageE(pageE + 1)}
              // onClick={() => setPageCC(pageCC + 1)}
            >
              <NavigateNext style={{ width: "15px" }} />
            </button>
          </li>
        </ul>
      </div>
    );
  };
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  }))(TableCell);
  return (
    <div>
      <CardHeader>
        <div className="FormDay" style={{ display: "flex" }}>
          <form
            id="1"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Typography style={{ display: "flex" }}>
              <Typography>
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  Ngày bắt đầu
                </Typography>
                <label className="start inp">
                  <input
                    type="date"
                    name="start"
                    style={{
                      background: "#fff",
                      boxSizing: "border-box",
                      minWidth: "280px",
                      border: "1px solid rgb(221, 221, 221)",
                      borderRadius: "6px",
                      height: "50px",
                      boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
                    }}
                    value={start1}
                    onChange={(e) => {
                      handleChangeInputTag(e, setStart1);
                    }}
                  />
                </label>
              </Typography>
              <Typography>
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  Ngày kết thúc
                </Typography>
                <label className="end inp inp1">
                  <input
                    className="inp1"
                    type="date"
                    name="end"
                    style={{
                      background: "#fff",
                      boxSizing: "border-box",
                      minWidth: "280px",
                      border: "1px solid rgb(221, 221, 221)",
                      borderRadius: "6px",
                      height: "50px",
                      boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
                    }}
                    value={end1}
                    onChange={(e) => {
                      handleChangeInputTagEnd(e, setEnd1);
                    }}
                  />
                </label>
              </Typography>
            </Typography>
            {/*<input type="Submit" value='Duyệt'/>*/}
          </form>
        </div>
      </CardHeader>
      <Box display="flex">
        <Box md={6} style={{}}>
          <Card
            className="overview"
            style={{
              borderRadius: "3px",
              padding: "10px",
              borderLeft: "5px solid rgb(244, 148, 35)",
              boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
              width: "90%",
            }}
          >
            <CardHeader>
              <Typography
                style={{ color: "rgb(244, 148, 35)", fontSize: "20px" }}
              >
                Doanh thu
              </Typography>
              <div display="flex">
                <Typography variant="h4" display="flex">
                  {number ? showPrice(number.valeInvoice) : 0}₫
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Box>
        <Box md={6} style={{}}>
          <Card
            className="overview"
            style={{
              borderRadius: "3px",
              padding: "10px",
              borderLeft: "5px solid #29A4B6",
              boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
              width: "80%",
              marginLeft: "50px",
            }}
          >
            <CardHeader>
              <Typography style={{ color: "#29A4B6", fontSize: "20px" }}>
                Số hóa đơn
              </Typography>
              <div display="flex">
                <Typography variant="h4" display="flex">
                  {number ? number.countInvoice : 0}
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Box>
        <Box md={6} style={{}}>
          <Card
            className="overview"
            style={{
              borderRadius: "3px",
              padding: "10px",
              borderLeft: "5px solid #7640EF",
              boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
              width: "80%",

              marginLeft: "50px",
            }}
          >
            <CardHeader>
              <Typography style={{ color: "#7640EF", fontSize: "20px" }}>
                Số phiếu nhập kho
              </Typography>
              <div display="flex">
                <Typography variant="h4" display="flex">
                  {number ? number.countRecipt : 0}
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Box>
        <Box md={6} style={{}}>
          <Card
            className="overview"
            style={{
              borderRadius: "3px",
              padding: "10px",
              borderLeft: "5px solid #0FD186",
              boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
              width: "80%",

              marginLeft: "50px",
            }}
          >
            <CardHeader>
              <Typography style={{ color: "#0FD186", fontSize: "20px" }}>
                Số phiếu xuất kho
              </Typography>
              <div display="flex">
                <Typography variant="h4" display="flex">
                  {number ? number.countPayment : 0}
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Box>
        <Box md={6} style={{}}>
          <Card
            className="overview"
            style={{
              borderRadius: "3px",
              padding: "10px",
              borderLeft: "5px solid #F4628D",
              boxShadow: "0 2px 4px hsl(0deg 0% 66% / 25%)",
              width: "80%",

              marginLeft: "50px",
            }}
          >
            <CardHeader>
              <Typography style={{ color: "#F4628D", fontSize: "20px" }}>
                Khách hàng
              </Typography>
              <div display="flex">
                <Typography variant="h4" display="flex">
                  {sumCustomers ? sumCustomers : 0}
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Box>
      </Box>

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <Line
              data={{
                labels: labels1,
                datasets: [
                  {
                    data: test1.map((x) => x.totalOutput / 1000),
                    label: "doanh thu theo ngày",
                    borderColor: "#3e95cd",
                    fill: false,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "World population per region (in millions)",
                },
                legend: {
                  display: true,
                  position: "bottom",
                },
              }}
            />

            <h4 className={classes.cardTitle}>Doanh thu theo ngày</h4>

            <CardFooter chart>
              <div className={classes.stats}>
                {/*<AccessTime /> */}
                Đơn vị: kVND
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Box minHeight={60}>
            <Typography
              variant="h5"
              align="center"
              style={{
                borderBottom: "1px dashed rgb(166, 170, 174)",
                height: "28px",
                padding: "10px",
              }}
            >
              Bảng thống kê khách hàng
            </Typography>

            <TableContainer>
              <Table aria-labelledby="tableTitle" size={"small"}>
                <TableHead variant="h6">
                  <TableRow>
                    <TableHeaderCell variant="h6">
                      Mã khách hàng{" "}
                    </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Tên khách hàng
                    </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Số điện thoại
                    </TableHeaderCell>
                    <TableHeaderCell align="center">Biển số xe</TableHeaderCell>
                    <TableHeaderCell align="center">Số lần sửa</TableHeaderCell>
                    <TableHeaderCell>Tổng tiền</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {customers
                    ? customers.map((row, index) => {
                        return (
                          <TableRow>
                            <TableCell component="th">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">
                              {row.licensePlate}
                            </TableCell>
                            <TableCell align="center">
                              {row.numberPurchases}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalPurchased}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </GridItem>
        <GridItem xs={10} sm={12} md={6}>
          <Card style={{ marginTop: "0px", height: "336px" }}>
            <CardHeader>
              <Typography variant="h5" align="center">
                Biểu đồ thống kê doanh thu theo từng khu vực
              </Typography>
            </CardHeader>
            <CardBody>
              <Doughnut
                data={{
                  labels: areaName,
                  datasets: [
                    {
                      label: "Population (millions)",
                      backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
                      data: areas.map((X) => X.invoiceTotalDTO.totalPrice),
                    },
                  ],
                }}
                height="270px"
                options={{ maintainAspectRatio: false }}
                option={{
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Predicted world population (millions) in 2050",
                  },
                }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Box minHeight={60}>
            <Typography
              variant="h5"
              align="center"
              style={{
                borderBottom: "1px dashed rgb(166, 170, 174)",
                height: "28px",
                padding: "10px",
              }}
            >
              Phụ tùng được sử dụng nhiều nhất
            </Typography>

            <TableContainer>
              <Table aria-labelledby="tableTitle" size={"small"}>
                <TableHead variant="h6">
                  <TableRow>
                    <TableHeaderCell variant="h6">Mã phụ tùng </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Tên phụ tùng
                    </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Số lượng mua
                    </TableHeaderCell>
                    <TableHeaderCell>Tổng tiền</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {material
                    ? material.map((row, index) => {
                        return (
                          <TableRow>
                            <TableCell component="th">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              {row.numberPurchases}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalPurchased}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Box minHeight={60}>
            <Typography
              variant="h5"
              align="center"
              style={{
                borderBottom: "1px dashed rgb(166, 170, 174)",
                height: "28px",
                padding: "10px",
              }}
            >
              Các dịch vụ được sử dụng nhiều nhất
            </Typography>

            <TableContainer>
              <Table aria-labelledby="tableTitle" size={"small"}>
                <TableHead variant="h6">
                  <TableRow>
                    <TableHeaderCell variant="h6">Mã dịch vụ </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Tên dịch vụ
                    </TableHeaderCell>
                    <TableHeaderCell align="center">
                      Số lượng dùng
                    </TableHeaderCell>
                    <TableHeaderCell>Tổng tiền</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {service
                    ? service.map((row, index) => {
                        return (
                          <TableRow>
                            <TableCell component="th">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">
                              {row.numberInvoices}
                            </TableCell>
                            <TableCell align="center">
                              {row.totalPurchased}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : ""}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </GridItem>
      </GridContainer>
    </div>
  );
}
