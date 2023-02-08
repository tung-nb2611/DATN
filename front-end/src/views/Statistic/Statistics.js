import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import {makeStyles} from "@material-ui/core/styles";
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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InputIcon from '@material-ui/icons/Input';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import MoodIcon from '@material-ui/icons/Mood';
import ReceiptIcon from '@material-ui/icons/Receipt';
import {bugs, website, server} from "variables/general.js";
import {useEffect, useState} from "react";
import {
    dailySalesChart,
    emailsSubscriptionChart,
    completedTasksChart,
} from "variables/charts.js";
import axios from "axios";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Pagination from "../../views/Statistic/panigationStatistic";
import {showPrice, customFormat} from "../../helper/function";
import LimitPagination from "../../components/Pagination/limitPagination";
// import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import '../../assets/css/pagination/pagination.css'
import {NavigateBefore, NavigateNext} from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function Statistics() {
    const classes = useStyles();
    const [labels1, setLabels1] = useState();
    const [series1, setSeries1] = useState();
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
    const dataCustomer = {
        "header": ["#", "code", "Tên khách hàng", "SĐT", "Biển số xe", "Số lần sử dụng", "Tổng tiền"],
        "data": dataCus
    };
    const dataEmployee = {
        "header": ["#", "code", "Tên nhân viên", "Lương ngày", "Tháng", "Số công", "Muộn", "Thực lãnh"],
        "data": dataEm
    }
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
                left: 0
            }
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

    const [pagination, setPagination] = useState({
        page: pageC,
        limit: 5,
        totalRows: 20,
    });


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

    const [start, setStart] = useState(new Date(new Date().getTime() - 604800000).customFormat("#YYYY#-#MM#-#DD#"));
    const [end, setEnd] = useState(new Date(new Date().getTime()).customFormat("#YYYY#-#MM#-#DD#"));
    const [monthS, setMonthS] = useState(new Date(new Date().getTime() - 604800000).customFormat("#MM#"));
    const [monthE, setMonthE] = useState(new Date(new Date().getTime()).customFormat("#MM#"));
    // console.log(new Date(new Date().getTime()).customFormat("#MM#"))
    var sum = 0;
    var countHigh = 0;

    useEffect(() => {
        getData()
    }, [start, end]);


    const getData = async () => {
        //rrevune
        const res1 = await axios(
            {
                method: 'get',
                url: "http://localhost:8080/api/admin/statistics/invoices?dateStart=" + start + "&dateEnd=" + end,
            }
        )
        if (res1.data) {
            for (var i in res1.data) {
                sum += res1.data[i].totalOutput;
                if (countHigh < sum/1000) {
                    countHigh = sum/1000 + 200;
                }
                var dateObject = new Date(res1.data[i].createAt)
                listLab1.push(dateObject.toLocaleDateString())
                listSer1.push(res1.data[i].totalOutput / 1000)
            }
        }
        // console.log(listSer1)
        // var s=0;
        // eslint-disable-next-line no-redeclare
        // for (var i= 0; i<listLab1.length-1; i++){
        //     for (var j=i+1; j<listLab1.length; j++){
        //         if (listLab1[i] == listLab1[j]) {
        //             listLab1.pop(j);
        //             listSer1[i] = listSer1[i] + listSer1[j];
        //             listSer1.pop(j)
        //         }
        //     }
        //
        // }
        // for (var i= 0; i<listLab1.length-1; i++){
        //     for (var j=i+1; j<listLab1.length; j++){
        //         if (listLab1[i] == listLab1[j]) {
        //             listLab1.pop(j);
        //             listSer1[i] = listSer1[i] + listSer1[j];
        //             listSer1.pop(j)
        //         }
        //     }
        //
        // }
        // console.log(listLab1)
        // console.log(listSer1)
        // console.log(s)
        setSumRevune(sum)
        setLabels1(listLab1);
        setSeries1([listSer1])
        setHigh1(countHigh);

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
                    countHigh = res2.data[i].numberInvoices + 4.5;
                }
                listLab2.push(res2.data[i].name.toString())
                listSer2.push(res2.data[i].numberInvoices.toString())
            }
        }
        listSer2.sort();
        listLab2.sort();
        var listS2 = [];
        var listL2 = [];
        if (listSer2.length > 5){
            for (var i=listSer2.length-5; i<listSer2.length; i++){
                listS3.push(listSer2[i]);
                listL3.push(listLab2[i]);
            }
            setLabels2(listL2);
            setSeries2([listS2])
        }else {
            setLabels2(listLab2);
            setSeries2([listSer2])
        }


        setHigh2(countHigh);


        const res3 = await axios(
            {
                method: 'get',
                url: "http://localhost:8080/api/admin/statistics/materials?dateStart=" + start + "&dateEnd=" + end,
            }
        )

        if (res3.data) {
            countHigh = 0;
            for (var i in res3.data) {

                if (countHigh < res3.data[i].numberPurchases) {
                    countHigh = res3.data[i].numberPurchases + 4;
                }
                listLab3.push(res3.data[i].name.toString())
                listSer3.push(res3.data[i].numberPurchases.toString())
            }
        }

        listSer3.sort();
        listLab3.sort();
        var listS3 = [];
        var listL3 = [];
        if (listSer3.length > 5){
            for (var i=listSer3.length-5; i<listSer3.length; i++){
                listS3.push(listSer3[i]);
                listL3.push(listLab3[i]);
            }
            setLabels3(listL3);
            setSeries3([listS3])
        }else {
            setLabels3(listLab3);
            setSeries3([listSer3])
        }


        setHigh3(countHigh);
        const res4 = await axios(
            {
                method: 'get',
                url: "http://localhost:8080/api/admin/statistics/customers?dateStart=" + start + "&dateEnd=" + end,
            }
        )
        if (res4.data) {

            for (var i in res4.data) {
                listCustomer.push([res4.data[i].id, res4.data[i].code, res4.data[i].name, res4.data[i].phone, res4.data[i].licensePlate,
                    res4.data[i].numberPurchases, showPrice(res4.data[i].totalPurchased).toString()]
                )

            }
        }

var tg = [];
       for (var i =0; i<listCustomer.length-1; i++)
           for (var j =i+1; j<listCustomer.length; j++){
               if (listCustomer[i][5] < listCustomer[j][5]){
                   // var a = listCustomer[i][5];
                   // listCustomer[i][5] = listCustomer[j][5];
                   // listCustomer[j][5] = a;

                   tg = listCustomer[i];
                   listCustomer[i]  = listCustomer[j];
                   listCustomer[j] = tg;
               }
           }
        setData(listCustomer);

        const res5 = await axios(
            {
                method: 'get',
                url: "http://localhost:8080/api/admin/statistics/salary?monthS=" + monthS + "&monthE=" + monthE,
            }
        )

        if (res5.data) {

            for (var i in res5.data) {
                listEmployee.push([res5.data[i].id, res5.data[i].code, res5.data[i].name, showPrice(res5.data[i].salaryDay), res5.data[i].month,
                    res5.data[i].numberShiftWork, res5.data[i].numberShiftLateWork, showPrice(res5.data[i].totalSalary).toString()]
                )

            }
        }

        for (var i =0; i<listEmployee.length-1; i++)
            for (var j =i+1; j<listEmployee.length; j++){
                if (listEmployee[i][6] < listEmployee[j][6]){
                    tg = listEmployee[i];
                    listEmployee[i]  = listEmployee[j];
                    listEmployee[j] = tg;
                }
            }
        // console.log(listCustomer)
        // console.log(res5.data)
        setData1(listEmployee);

    }

    function handleChangeInputTag(e, func, func1) {
        e.preventDefault();
        func(e.target.value);
        func1((new Date(e.target.value)).customFormat("#MM#"))
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
    }
    const [pageCC, setPageCC] = useState(1);
    const pageNumbers = [];
    const totalPages = Math.ceil(data.length / 5);
    for (let i = 1; i <= Math.ceil(totalPages); i++) {
        pageNumbers.push(i)
    }

    useEffect(() => {
        var a = data.length;
        var a1 = Math.floor(data.length/5);
        var pa = [];
      if (data.length != 0) {
        for (var i in pageNumbers) {
          if (pageNumbers[i] == pageCC) {
              if (a1 == pageCC-1){
                  for (var j = i*5; j < a ; j++) {
                      pa.push(data[j])
                  }
                  break;
              }else{
                  for (var j = i*5; j < i*5+5 ; j++) {
                      pa.push(data[j])
                  }
                  break;
              }
          }
        }

      }


        setDataCus(pa)

    }, [pageCC, data])

    function nextPage() {
        setPageCC(pageCC + 1)
    }

    function privewPage() {
        setPageCC(pageCC - 1)
    }

    function changePage(number) {
        setPageCC(number)
    }

    const renderPanigationCus = () => {
        return (
            <div style={{display: "flex", width: "600px", margin: "auto"}}>
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
                    {
                        pageNumbers.map(number => {
                            if (pageCC === number) {
                                return (
                                    <li key={number} id={number} className="active">
                                        <button style={{background: "#bbbbbb"}}>{number}</button>
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={number} id={number} onClick={() => changePage(number)}>
                                        {/*<li key={number} id={number} onClick={() => setPageCC(number)} >*/}
                                        <button>{number}</button>
                                    </li>
                                )
                            }
                        })
                    }
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
        )
    }

  const [pageE, setPageE] = useState(1);
  const pageNumbersE = [];
  const totalPagesE = Math.ceil(data1.length / 5);
  for (let i = 1; i <= Math.ceil(totalPagesE); i++) {
    pageNumbersE.push(i)
  }

  useEffect(() => {
      var a = data1.length;
      var a1 = Math.floor(data1.length/5);
    var pa1 = [];
    if (data1.length != 0) {
      for (var i in pageNumbersE) {
        if (pageNumbersE[i] == pageE) {
            if (a1 == pageE-1){
                for (var j = i*5; j < a ; j++) {
                    pa1.push(data1[j])
                }
                break;
            }
          else {
                for (var j = i*5; j < i*5+5 ; j++) {
                    pa1.push(data1[j])
                }
                break;
            }
        }
      }

    }
    setDataEm(pa1)

  }, [pageE, data1])

  const renderPanigationEm = () => {
    return (
        <div style={{display: "flex", width: "600px", margin: "auto"}}>
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
            {
              pageNumbersE.map(number => {
                if (pageE === number) {
                  return (
                      <li key={number} id={number} className="active">
                        <button style={{background: "#bbbbbb"}}>{number}</button>
                      </li>
                  )
                } else {
                  return (
                      <li key={number} id={number} onClick={() => setPageE(number)}>
                        {/*<li key={number} id={number} onClick={() => setPageCC(number)} >*/}
                        <button>{number}</button>
                      </li>
                  )
                }
              })
            }
            <li>
              <button
                  disabled={pageE >= totalPagesE}
                  onClick={() => setPageE(pageE+1)}
                  // onClick={() => setPageCC(pageCC + 1)}
              >
                  <NavigateNext style={{ width: "15px" }} />
              </button>
            </li>
          </ul>
        </div>
    )
  }


    return (
        <div>
            <CardHeader color="info">
                <div className='FormDay'>
                    <form id="1" onSubmit={(e) => {
                        handleSubmit(e)
                    }}>
                        <label className="start fake">Bắt đầu</label>
                        <label className="start inp">
                            <input type="date" name='start' placeholder="dd-mm-yyyy" style={{border: "1px solid #dddddd", borderRadius: "3px"}}
                                   // rules={[
                                   //     { required: true, message: "Không được bỏ trống" },
                                   //     // eslint-disable-next-line no-unused-vars
                                   //     ({ getFieldValue }) => ({
                                   //         validator(_, value) {
                                   //             // eslint-disable-next-line no-undef
                                   //             if (moment(value).format("YYYY-MM-DD") < moment(formData.getFieldValue("end")).format("YYYY-MM-DD")) {
                                   //
                                   //                 return Promise.reject(`Giá trị ở đây phải lớn hơn  giá trị ở "Kết thúc"`);
                                   //             }
                                   //             return Promise.resolve();
                                   //         },
                                   //     }),
                                   // ]}
                                   value={start}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setStart, setMonthS)
                                   }}/>
                        </label>


                        <label style={{color: '#fff', marginRight: "20px"}}>Kết thúc</label>
                        <label className="end inp inp1">
                            <input className="inp1" type="date" name='end' style={{border: "1px solid #dddddd", borderRadius: "3px"}} placeholder="dd-mm-yyyy" value={end}
                                   onChange={(e) => {
                                       handleChangeInputTag(e, setEnd, setMonthE)
                                   }}
                            />
                        </label>

                        {/*<input type="Submit" value='Duyệt'/>*/}
                    </form>
                </div>
            </CardHeader>
            <GridContainer>
                <GridItem xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <AttachMoneyIcon/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Doanh thu</p>
                            <h3 className={classes.cardTitle}>{showPrice(sumRevune)}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                {/*<DateRange />*/}
                                Đơn vị : VND
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={6} md={6}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <InputIcon/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Tiền nhập hàng</p>
                            <h3 className={classes.cardTitle}>{showPrice(sumInput)}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                {/*<Update />*/}
                                Đơn vị : VND
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                {/*<GridItem xs={12} sm={6} md={4}>*/}
                {/*    <Card>*/}
                {/*        <CardHeader color="warning" stats icon>*/}
                {/*            <CardIcon color="warning">*/}
                {/*                <MoodIcon/>*/}
                {/*            </CardIcon>*/}
                {/*            <p className={classes.cardCategory}>{sumRevune-sumInput > 0? "Số tiền lãi" :"Số Tiền lỗ"}</p>*/}
                {/*            <h3 className={classes.cardTitle}>{sumRevune-sumInput > 0? showPrice(sumRevune-sumInput): showPrice(sumInput-sumRevune)}</h3>*/}
                {/*        </CardHeader>*/}
                {/*        <CardFooter stats>*/}
                {/*            <div className={classes.stats}>*/}
                {/*                /!*<LocalOffer />*!/*/}
                {/*                Đơn vị : VND*/}
                {/*            </div>*/}
                {/*        </CardFooter>*/}
                {/*    </Card>*/}
                {/*</GridItem>*/}

            </GridContainer>

            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card chart>
                        <CardHeader color="rose">
                            <ChartistGraph
                                className="ct-chart"
                                data={dataRevune.data}
                                type="Line"
                                options={dataRevune.options}
                                listener={dailySalesChart.animation}
                            />
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Doanh thu theo ngày</h4>
                            {/*<p className={classes.cardCategory}>*/}
                            {/*  <span className={classes.successText}>*/}
                            {/*    <ArrowUpward className={classes.upArrowCardCategory} /> 55%*/}
                            {/*  </span>{" "}*/}
                            {/*  increase in today sales.*/}
                            {/*</p>*/}
                        </CardBody>
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
                            <h4 className={classes.cardTitle}>Các dịch vụ sử dụng nhiều nhất</h4>
                            {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                {/*<AccessTime /> campaign sent 2 days ago*/}
                                Đơn vị: số lượng
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>
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
                            <h4 className={classes.cardTitle}>Các phụ tùng sử dụng nhiều nhất</h4>
                            {/*<p className={classes.cardCategory}>Last Campaign Performance</p>*/}
                        </CardBody>
                        <CardFooter chart>
                            <div className={classes.stats}>
                                {/*<AccessTime /> campaign sent 2 days ago*/}
                                Đơn vị: số lượng
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Bảng thống kê khách hàng</h4>
                            <p className={classes.cardCategoryWhite}>
                                hiển thị thông tin về khách hàng qua các lần sử dụng dịch vụ
                            </p>
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="black"
                                tableHead={dataCustomer.header}
                                tableData={dataCustomer.data}
                            />
                            {renderPanigationCus()}
                        </CardBody>


                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Bảng thống kê lương nhân viên</h4>
                            <p className={classes.cardCategoryWhite}>
                                Hiển thị thông tin về lương nhân viên qua các tháng
                            </p>
                            {/*<Select options={options}  style={{color: "#000"}}/>*/}
                        </CardHeader>
                        <CardBody>
                            <Table
                                tableHeaderColor="black"
                                tableHead={dataEmployee.header}
                                tableData={dataEmployee.data}
                            />
                            {renderPanigationEm()}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
