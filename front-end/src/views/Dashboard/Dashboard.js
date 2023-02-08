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
import PeopleIcon from '@material-ui/icons/People';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import DoneAllIcon from '@material-ui/icons/DoneAll';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
// import Tasks from "components/Tasks/Tasks.js";
// import CustomTabs from "components/CustomTabs/CustomTabs.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
// import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import ReceiptIcon from '@material-ui/icons/Receipt';
// import { bugs, website, server } from "variables/general.js";
import { useEffect, useState } from "react";
import {
  // dailySalesChart,
  emailsSubscriptionChart,
  // completedTasksChart,
} from "variables/charts.js";
import axios from "axios";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { showPrice } from "../../helper/function";
// import {_} from "react-select/dist/index-4bd03571.esm";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [labels2, setLabels2] = useState();
  const [series2, setSeries2] = useState();
  const [high2, setHigh2] = useState();
  var listLab2 = [];
  var listSer2 = [];
  var listMaterialEnd = [];
  const [countInvoiceHandle, setCountInvoiceHandle] = useState(0);
  const [countMaterialEnd, setCountMaterialEnd] = useState(0);
  const [countInvoiceComplete, setCountInvoiceComplete] = useState(0);
  const [sumInpput, setSumInput] = useState(0);
  const [sumRevune, setSumRevune] = useState(0);
  const [ma, setMa] = useState([]);
  const [labels3, setLabels3] = useState();
  const [series3, setSeries3] = useState();
  const [high3, setHigh3] = useState();
  var listLab3 = [];
  var listSer3 = [];

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
        left: 0
      }
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
        left: 0
      }
    },
  };

  Date.prototype.customFormat = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = this.getFullYear()) + "").slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = this.getHours());
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    hhhh = hhh < 10 ? ('0' + hhh) : hhh;
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
    ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
    return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
  };

  // eslint-disable-next-line no-unused-vars
  const [start, setStart] = useState(new Date(new Date().getTime() - 2592000000).customFormat("#YYYY#-#MM#-#DD#"));
  // eslint-disable-next-line no-unused-vars
  const [end, setEnd] = useState(new Date(new Date().getTime()).customFormat("#YYYY#-#MM#-#DD#"));
  var countHigh = 0;



  useEffect(() => {
    getData()
    getData2()
    getData3()
    getData4()
    getData5()
    getData6()
  }, []);

  const getData2 = async () => {
    const res2 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/admin/statistics/services?dateStart=" + start + "&dateEnd=" + end,
      }
    )

    if (res2.data) {
      countHigh = 0;
      for (var i in res2.data) {

        if (countHigh < res2.data[i].numberInvoices) {
          countHigh = res2.data[i].numberInvoices + 4;
        }
        listLab2.push(res2.data[i].name.toString())
        listSer2.push(res2.data[i].numberInvoices.toString())
      }
    }

    // listSer2.sort();
    // // listLab2.sort();
    // console.log(listSer2)
    var listS2 = [];
    var listL2 = [];
    if (listSer2.length > 5) {
      for (var i = listSer2.length - 5; i < listSer2.length; i++) {
        listS2.push(listSer2[i]);
        listL2.push(listLab2[i]);
      }
      setLabels2(listL2);
      setSeries2([listS2])
    } else {
      setLabels2(listLab2);
      setSeries2([listSer2])
    }


    setHigh2(countHigh);
  }

  const getData3 = async () => {
    const res3 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/admin/statistics/materials?dateStart=" + start + "&dateEnd=" + end,
      }
    )

    if (res3.data) {
      countHigh = 0;
      // eslint-disable-next-line no-redeclare
      for (var i in res3.data) {

        if (countHigh < res3.data[i].numberPurchases) {
          countHigh = res3.data[i].numberPurchases + 4;
        }
        listLab3.push(res3.data[i].name.toString())
        listSer3.push(res3.data[i].numberPurchases.toString())
      }
    }

    // listSer3.sort();
    // listLab3.sort();
    // let zxz = [1,5,3,6,232,1,1]
    // console.log(listSer3)
    // console.log(zxz.sort())
    var listS3 = [];
    var listL3 = [];
    if (listSer3.length > 5) {
      for (var i = listSer3.length - 5; i < listSer3.length; i++) {
        listS3.push(listSer3[i]);
        listL3.push(listLab3[i]);
      }
      setLabels3(listL3);
      setSeries3([listS3])
    } else {
      setLabels3(listLab3);
      setSeries3([listSer3])
    }


    setHigh3(countHigh);
  }

  const getData4 = async () => {
    const res1 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/invoices/list?page=1&limit=500&keyword&status=1&sort=1",
      }
    )

    const res2 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/invoices/list?page=1&limit=500&keyword&status=2&sort=1",
      }
    )

    const res3 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/invoices/list?page=1&limit=500&keyword&status=3&sort=1",
      }
    )

    const res4 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/invoices/list?page=1&limit=500&keyword&status=5&sort=1",
      }
    )

    var count = res1.data.invoiceListResponseDTOS.length + res2.data.invoiceListResponseDTOS.length + res3.data.invoiceListResponseDTOS.length;
    var cou = res4.data.invoiceListResponseDTOS.length;
    // if (res4.data) {
    //   // eslint-disable-next-line no-redeclare
    //   for (var i in res4.data.invoiceListResponseDTOS){
    //     if (res4.data.invoiceListResponseDTOS[i].status == "Đang sửa" || res4.data.invoiceListResponseDTOS[i].status == "Chờ xử lý") count++;
    //   }
    //   // eslint-disable-next-line no-unused-vars
    //   if (res4.data.invoiceListResponseDTOS[i].status == "Chờ thanh toán") cou ++;
    // }
    setCountInvoiceHandle(count);
    setCountInvoiceComplete(cou);
  }

  const getData5 = async () => {
    // phu tung sap het
    const res5 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/materials?keyword",
      }
    )
    console.log(111)
    // console.log(res5.data[0].quantity)
    if (res5.data) {
      // eslint-disable-next-line no-redeclare
      for (var i in res5.data) {
        if (res5.data[i].quantity <= 5) {
          setCountMaterialEnd(countMaterialEnd + 1);
          listMaterialEnd.push(res5.data[i].name.toString());
        }
      }
    }
    // console.log(listMaterialEnd)
    setMa(listMaterialEnd);
  }

  const getData6 = async () => {
    const res6 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/admin/statistics/input?dateStart=" + start + "&dateEnd=" + end,
      }
    )
    if (res6.data) {
      var sum1 = 0;
      for (var i in res6.data) {
        sum1 += res6.data[i].totalMoney;
      }
    }
    setSumInput(sum1)
  }
  const getData = async () => {

    const res1 = await axios(
      {
        method: 'get',
        url: "http://localhost:8080/api/admin/statistics/revunes?dateStart=" + start + "&dateEnd=" + end,
      }
    )

    if (res1.data) {
      var sum = 0;
      for (var i in res1.data) {
        sum += res1.data[i].totalOutput;
      }
    }

    setSumRevune(sum)


  }
  // console.log(listMaterialEnd)

  const renderMaterialEnd = (data) => {
    if (data.length == 0) {
      return 0;
    }
    else {
      // eslint-disable-next-line no-unused-vars
      return data.map((item: any, index: any) => {
        return (<>
          <p style={{ textAlign: "left", marginLeft: "45%" }}>{index + 1}: {item}</p>
        </>
        );
      })
    }
  }

  return (
    <div>
      {/*<GridContainer>*/}
      {/*  <GridItem xs={12} sm={6} md={4}>*/}
      {/*    <Card>*/}
      {/*      <CardHeader color="success" stats icon>*/}
      {/*        <CardIcon color="success">*/}
      {/*          <PeopleIcon />*/}
      {/*        </CardIcon>*/}
      {/*        <p className={classes.cardCategory}>Số nhân viên hiện tại </p>*/}
      {/*        <h3 className={classes.cardTitle}>30</h3>*/}
      {/*      </CardHeader>*/}
      {/*      <CardFooter stats>*/}
      {/*        <div className={classes.stats}>*/}
      {/*          /!*<DateRange />*!/*/}
      {/*          Đơn vị : người*/}
      {/*        </div>*/}
      {/*      </CardFooter>*/}
      {/*    </Card>*/}
      {/*  </GridItem>*/}

      {/*  <GridItem xs={12} sm={6} md={4}>*/}
      {/*    <Card>*/}
      {/*      <CardHeader color="info" stats icon>*/}
      {/*        <CardIcon color="info">*/}
      {/*          <PermContactCalendarIcon />*/}
      {/*        </CardIcon>*/}
      {/*        <p className={classes.cardCategory}>Số khách hàng hiện có</p>*/}
      {/*        <h3 className={classes.cardTitle}>245</h3>*/}
      {/*      </CardHeader>*/}
      {/*      <CardFooter stats>*/}
      {/*        <div className={classes.stats}>*/}
      {/*          /!*<Update />*!/*/}
      {/*          Đơn vị : người*/}
      {/*        </div>*/}
      {/*      </CardFooter>*/}
      {/*    </Card>*/}
      {/*  </GridItem>*/}

      {/*  <GridItem xs={12} sm={6} md={4}>*/}
      {/*    <Card>*/}
      {/*      <CardHeader color="warning" stats icon>*/}
      {/*        <CardIcon color="warning">*/}
      {/*          <MotorcycleIcon />*/}
      {/*        </CardIcon>*/}
      {/*        <p className={classes.cardCategory}>Số dịch vụ hiện có</p>*/}
      {/*        <h3 className={classes.cardTitle}>75</h3>*/}
      {/*      </CardHeader>*/}
      {/*      <CardFooter stats>*/}
      {/*        <div className={classes.stats}>*/}
      {/*          /!*<LocalOffer />*!/*/}
      {/*          Đơn vị : dịch vụ*/}
      {/*        </div>*/}
      {/*      </CardFooter>*/}
      {/*    </Card>*/}
      {/*  </GridItem>*/}

      {/*</GridContainer>*/}
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Tổng doanh thu / chi trong 30 ngày</p>
              <h3 className={classes.cardTitle}>{showPrice(sumRevune) + " / " + showPrice(sumInpput)}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/*<DateRange />*/}
                Đơn vị : VND
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <DoneAllIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Số phiếu sửa chữa đã hoàn thành trong 30 ngày</p>
              <h3 className={classes.cardTitle}>{countInvoiceComplete}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/*<Update />*/}
                Đơn vị : phiếu
              </div>
            </CardFooter>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <HourglassFullIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Số phiếu sửa chữa Đang chờ xử lí</p>
              <h3 className={classes.cardTitle}>{countInvoiceHandle}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/*<Update />*/}
                Đơn vị : phiếu
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>



      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader color="rose">
              <ChartistGraph
                className="ct-chart"
                data={dataService.data}
                type="Bar"
                options={dataService.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Dịch vụ sử dụng nhiều nhất trong 30 ngày qua</h4>
              {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
            </CardBody>
            {/*<CardFooter chart>*/}
            {/*  <div className={classes.stats}>*/}
            {/*    <AccessTime /> campaign sent 2 days ago*/}
            {/*  </div>*/}
            {/*</CardFooter>*/}
          </Card>
          <Card chart>
            <CardHeader color="rose">
              <ChartistGraph
                className="ct-chart"
                data={dataMaterial.data}
                type="Bar"
                options={dataMaterial.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Phụ tùng hay sử dụng nhất trong 30 ngày qua</h4>
              {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
            </CardBody>
            {/*<CardFooter chart>*/}
            {/*  <div className={classes.stats}>*/}
            {/*    <AccessTime /> campaign sent 2 days ago*/}
            {/*  </div>*/}
            {/*</CardFooter>*/}
          </Card>
        </GridItem>

        <GridItem xs={12} sm={10} md={4}>
          <Card>
            <div style={{minHeight:"422px"}}>
              <CardHeader color="danger" stats icon style={{marginLeft: "-50px"}}>
                <CardIcon color="danger" stats icon style={{marginLeft: "70px"}}>
                  <ReceiptIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Những phụ tùng sắp hết</p>
                <h3 className={classes.cardTitle} style={{ fontSize: "20px", marginLeft:"-60px", position:"absolute", width:"450px"}}> {countMaterialEnd ? renderMaterialEnd(ma) : 0}</h3>
              </CardHeader>
            </div>
            <CardFooter stats>
              <div className={classes.stats}>
                {/*<LocalOffer />*/}
                Số lượng ít hơn 5
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
}
