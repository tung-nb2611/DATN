/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/invoices/CreateInvoices.css";
import InvoicesService from "services/InvoicesService";
// eslint-disable-next-line no-unused-vars
import InvoiceSearch from "components/FiltersForm/InvoiceSearch";
import { Add, Filter, Search, TextFields } from "@material-ui/icons";
import "../../assets/css/search/InvoiceSearch.css";
import CustomerService from "../../services/CustomerService";
import EmployeeService from "../../services/EmployeeService";
// eslint-disable-next-line no-unused-vars
import Snackbars from "components/Snackbar/Snackbar.js";
import "../../assets/css/invoices/InvoiceMaterialSearch.css";
import { showPrice } from "../../helper/function";
import MaterialService from "../../services/materialService.js";
import ServicesService from "../../services/ServicesService";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  TabOutlined,
  TabTwoTone,
} from "@material-ui/icons";
import "../../assets/css/invoices/InvoiceServiceSearch.css";
import VehicleService from "../../services/VehicleService";
import IconReduce from "common/iconReduce";
import IconIncrease from "common/iconIncrease";
import { NumberFormatBase } from "react-number-format";
import AreaMenu from "./AreaMenu";
import AreaService from "services/AreaService";
import {
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Container,
  Collapse,
  Tab,
  Tabs,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Modal,
  withStyles,
} from "@material-ui/core";
import { PopoverBody } from "reactstrap";
import selectChevron from "../../common/selectChevron.svg";
import cancelSmallMinor from "../../common/cancelSmallMinor.svg";
import {
  AddCartIcon,
  AutoCompleteInfinite,
} from "@sapo-presentation/sapo-ui-components";
import { useCallback } from "react";

function AddInvoices(props) {
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
  // eslint-disable-next-line no-unused-vars
  const [tl, setTl] = React.useState(false);
  const [fail, setFail] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [messageSucsess, setMessageSuccess] = useState("");
  const [messageError, setMessageError] = useState("");
  const [listCustomerClass, setListCustomerClass] = useState("");
  const [showInfoCustomer, setShowInfoCustomer] = useState("");
  const [modalCustomerClass, setModalCustomerClass] = useState("");
  const [customers, setCustomers] = useState([]);
  const typingTimeoutRef = useRef(null);
  const [listEmployeeClass, setListEmployeeClass] = useState("");
  const [listAreaClass, setListAreaClass] = useState("");
  const [showInfoEmployee, setShowInfoEmployee] = useState("");
  const [employees, setEmployees] = useState([]);
  const [listCustomerVehicleClass, setListCustomerVehicleClass] = useState("");
  const [showInfoCustomerVehicle, setShowInfoCustomerVehicle] = useState("");
  const [materialChoose, setMaterialChoose] = useState([]);
  const [listMaterial, setListMaterial] = useState("");
  const [materitals, setMaterials] = useState([]);
  const [sumMaterial, setSumMaterial] = useState(0);
  const [customerClass, setCustomerClass] = useState("");
  const [area, setArea] = useState([]);
  const [areaChose, setAreaChose] = useState({});
  const [areaName, setAreaName] = useState([]);
  const [error, setError] = useState(null);
  const [open1, setOpen1] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
  });
  const [filters3, setFilters3] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: [5],
    sort: 0,
  });
  const [filters1, setFilters1] = useState({
    status: 1,
  });
  const [filterSum, setFilterSum] = useState({
    sum: 0,
  });
  const [checkQuantity, setCheckQuantity] = useState({
    id: 1,
    quantity: 0,
  });
  const [filtersCustomer, setFiltersCustomer] = useState({
    idVehicle: 1,
    keyword: "",
  });
  const [serviceChoose, setServiceChoose] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [listService, setListService] = useState("");
  const [services, setServices] = useState([]);
  const [sumServices, setSumServices] = useState(0);

  const [noteInvoice, setNoteInvoice] = useState("");
  const [payMethod, setPayMethod] = useState();
  const [customer, setCustomer] = useState({
    id: 0,
    code: "",
    name: "",
    phone: "",
  });
  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState({
    id: 0,
    code: "",
    licensePlate: "",
  });

  const [name, setName] = useState();
  const [licensePlate, setLicensePlate] = useState();

  const [phone, setPhone] = useState();

  const [employee, setEmployee] = useState({
    id: 0,
    code: "",
    name: "",
    phone: "",
  });
  const open = () => {
    setOpen1(true);
  };
  //Lấy list Biển số xe
  useEffect(() => {
    async function fetchVehicleList() {
      try {
        VehicleService.getListVehicle(filters)
          .then((res) => {
            let vehicleDTOS = res.data;
            console.log("VEHICLE :" + res.data);
            setVehicles(
              vehicleDTOS.map((vehicle) => {
                return {
                  id: vehicle.id,
                  code: vehicle.code,
                  licensePlate: vehicle.licensePlate,
                };
              })
            );
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              setMessageError(error.response.data.message);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log("Failed to fetch Customer list: ", error.message);
      }
    }
    fetchVehicleList();
  }, [filters]);

  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        AreaService.listArea(filters1)
          .then((res) => {
            console.log("checklkk", res);
            const areas = res.data.areas;
            setArea(
              areas.map((area) => {
                return {
                  select: false,
                  id: area.id,
                  code: area.code,
                  name: area.name,
                  status: area.status,
                  invoice: area.invoice,
                };
              })
            );
            setAreaName(areaName);
          })
          .catch(function (error) {
            if (error.response.data.status == 403) {
              alert("Không có quyền truy cập!");
            }
          });
      } catch (error) {
        if (error.status == 401) {
          alert("Không quyền truy cập");
        }
        console.log("Failed to fetch employee list: ", error.message);
        setError(error);
      }
    }
    fetchEmployeeList();
  }, [filters1]);

  //Lấy list khách hàng
  useEffect(() => {
    async function fetchCustomerList() {
      try {
        CustomerService.getListCustomer(filtersCustomer)
          .then((res) => {
            let customers = res.data;
            console.log(res.data);
            setCustomers(
              customers.map((customer) => {
                return {
                  id: customer.id,
                  code: customer.code,
                  name: customer.name,
                  phone: customer.phone,
                };
              })
            );
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              // setMessageError(error.response.data.message)
              // setFail(true);
              // // use this to make the notification autoclose
              // setTimeout(
              //     function () {
              //         setFail(false)
              //     },
              //     3000
              // );
            }
          });
      } catch (error) {
        console.log("Failed to fetch Customer list: ", error.message);
      }
    }
    fetchCustomerList();
  }, [filtersCustomer]);

  //Lấy list thợ sửa đang rảnh
  useEffect(() => {
    async function fetchEmployeeList() {
      try {
        EmployeeService.getListEmployeeReady(filters)
          .then((res) => {
            let employees = res.data;
            console.log(res.data);
            setEmployees(
              employees.map((employee) => {
                return {
                  id: employee.id,
                  code: employee.code,
                  name: employee.name,
                  phone: employee.phone,
                };
              })
            );
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              setMessageError(error.response.data.message);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log("Failed to fetch Employee list: ", error.message);
      }
    }
    fetchEmployeeList();
  }, [filters]);

  //Lấy list Phụ kiện
  useEffect(() => {
    async function fetchMaterialList() {
      try {
        MaterialService.getListMaterial(filters)
          .then((res) => {
            let materitals = res.data;
            console.log(res.data);
            setMaterials(
              materitals.map((materital) => {
                return {
                  id: materital.id,
                  code: materital.code,
                  name: materital.name,
                  outputPrice: materital.outputPrice,
                  quantity: materital.quantity,
                  quantityBuy: 1,
                };
              })
            );
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              setMessageError(error.response.data.message);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log("Failed to fetch Material list: ", error.message);
      }
    }
    fetchMaterialList();
  }, [filters]);

  //Lấy list dịch vụ
  useEffect(() => {
    async function fetchServiceList() {
      try {
        ServicesService.getAllServiceStillServing(filters)
          .then((res) => {
            let servicesData = res.data;
            console.log(res.data);
            setServices(
              servicesData.map((service) => {
                return {
                  id: service.id,
                  code: service.code,
                  name: service.name,
                  description: service.description,
                  price: service.price,
                };
              })
            );
            console.log(" dịch vụ : " + servicesData + " : " + services);
          })
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              setMessageError(error.response.data.message);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log("Failed to fetch Service list: ", error.message);
      }
    }
    fetchServiceList();
  }, [filters]);

  useEffect(() => {
    async function fetchServiceList() {
      try {
        let currentSumMaterial = 0;
        materialChoose.map((data) => {
          currentSumMaterial += data.quantityBuy * data.outputPrice;
        });
        setSumMaterial(currentSumMaterial);
      } catch (error) {
        console.log("Failed to fetch Service list: ", error.message);
      }
    }
    fetchServiceList();
  }, [filterSum]);

  //Hàm check số lượng
  useEffect(() => {
    async function fetchServiceList() {
      try {
        InvoicesService.checkMaterial(checkQuantity)
          .then((res) => {})
          .catch(function (error) {
            console.log(error.response);
            if (error.response.data.errors) {
              setMessageError(error.response.data.errors[0].defaultMessage);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            } else {
              setMessageError(error.response.data.message);
              setFail(true);
              // use this to make the notification autoclose
              setTimeout(function () {
                setFail(false);
              }, 3000);
            }
          });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchServiceList();
  }, [checkQuantity]);
  //customer
  const showListCustomer = () => {
    if (listCustomerClass == "") {
      setListCustomerClass("info-customers");
    } else {
      setListCustomerClass("");
    }
  };
  const formAddCustomer = () => {
    if (modalCustomerClass == "") {
      setModalCustomerClass("modal-vehicle");
      setListCustomerClass("");
    } else {
      setModalCustomerClass("");
    }
  };
  const formAddCustomerVehicle = () => {
    if (modalCustomerClass == "") {
      setModalCustomerClass("modal-customer");
      setListCustomerVehicleClass("");
    } else {
      setModalCustomerClass("");
    }
  };
  const outFormAddCustomer = () => {
    if (modalCustomerClass == "") {
      setModalCustomerClass("modal-customer");
    } else {
      setModalCustomerClass("");
    }
  };
  const deleteCustomer = () => {
    setShowInfoCustomer("");
    setCustomerClass("");
  };
  const deleteCustomerVehicle = () => {
    setShowInfoCustomerVehicle("");
  };

  //Employee
  const showListEmployee = () => {
    if (listEmployeeClass == "") {
      setListEmployeeClass("info-employees");
    } else {
      setListEmployeeClass("");
    }
  };
  const showListArea = () => {
    if (listEmployeeClass == "") {
      setListAreaClass("info-employees");
    } else {
      setListAreaClass("");
    }
  };
  const showListCustomerVehicle = () => {
    if (listCustomerVehicleClass == "") {
      setListCustomerVehicleClass("info-customer-vehicle");
    } else {
      setListCustomerVehicleClass("");
    }
  };
  const deleteEmployee = () => {
    setShowInfoEmployee("");
  };
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  }))(TableCell);
  const TableCell1 = withStyles(() => ({
    root: {
      fontSize: "10px",
      fontWeight: "bold",
    },
  }))(TableCell);
  const back = () => {
    props.history.push("/admin/invoices/" + props.match.params.id);
  };

  const chooseVehicle = (vehicle) => {
    setVehicle(vehicle);
    setFiltersCustomer({
      ...filters,
      idVehicle: vehicle.id,
    });
    setFilters3({
      ...filters3,
      keyword: vehicle.licensePlate,
    });
    setCustomerClass("search-customer-vehicle");
    setListCustomerClass("");
    setShowInfoCustomer("info-license-plate");
  };
  const chooseCustomer = (customer) => {
    setCustomer(customer);
    setListCustomerVehicleClass("");
    setShowInfoCustomerVehicle("info-customer");
    fetchInvoicesList();
  };

  const chooseEmployee = (employee) => {
    setEmployee(employee);
    setListEmployeeClass("");
    setShowInfoEmployee("info-name");
  };

  const chooseArea = (area) => {
    setAreaChose(area);
    setListAreaClass("");
    setShowInfoEmployee("info-name");
  };

  const showListMaterial = () => {
    if (listMaterial == "") {
      setListMaterial("info-material");
    } else {
      setListMaterial("");
    }
  };
  const close = () => {
    setOpen1(false);
  };
  function increaseVariant(id) {
    setMaterialChoose(
      materialChoose.map((materialCheck) => {
        if (materialCheck.quantityBuy > 0) {
          if (materialCheck.id === id) {
            materialCheck.quantityBuy = materialCheck.quantityBuy - 1;
          }
          setFilterSum({
            sum: 0,
          });

          setCheckQuantity({
            ...checkQuantity,
            id: materialCheck.id,
            quantity: materialCheck.quantityBuy,
          });

          return materialCheck;
        } else {
          if (materialCheck.id === id) {
            materialCheck.quantityBuy = 1;
          }
        }
      })
    );
  }
  function reduceVarant(id) {
    setMaterialChoose(
      materialChoose.map((materialCheck) => {
        if (materialCheck.quantityBuy > 0) {
          if (materialCheck.id === id) {
            materialCheck.quantityBuy = materialCheck.quantityBuy + 1;
          }
          setFilterSum({
            sum: 0,
          });
          if (materialCheck.quantityBuy > 0) {
            setCheckQuantity({
              ...checkQuantity,
              id: materialCheck.id,
              quantity: materialCheck.quantityBuy,
            });
          }
          return materialCheck;
        }
      })
    );
  }

  function checkMaterial(material, materials) {
    var a = 1;
    for (var i = 0; i < materials.length; i++) {
      if (material.id === materials[i].id) {
        return a;
      }
      a++;
    }
    return 0;
  }

  const chooseMaterial = (material) => {
    setListMaterial("");
    setCheckQuantity({
      ...checkQuantity,
      id: material.id,
      quantity: material.quantityBuy,
    });

    let materials = materialChoose;
    if (materials.length > 0) {
      let check = checkMaterial(material, materials);
      if (check !== 0) {
        var material1 = {
          id: materials[check - 1].id,
          code: materials[check - 1].code,
          name: materials[check - 1].name,
          outputPrice: materials[check - 1].outputPrice,
          quantity: materials[check - 1].quantity,
          quantityBuy: materials[check - 1].quantityBuy + 1,
        };
        materials[check - 1] = material1;
      } else {
        materials.push(material);
      }
    } else {
      materials.push(material);
    }
    let currentSumMaterial = 0;
    materials.map((data) => {
      currentSumMaterial += data.quantityBuy * data.outputPrice;
    });
    setSumMaterial(currentSumMaterial);
    setMaterialChoose(materials);
  };

  const deleteMaterialChoosed = (material) => {
    let materials = materialChoose;
    let check = checkMaterial(material, materials);
    let materialRemaining = [];
    for (var i = 0; i < materials.length; i++) {
      if (check - 1 !== i) {
        materialRemaining.push(materials[i]);
      }
    }
    setMaterialChoose(materialRemaining);
    let currentSum = sumMaterial;
    currentSum = currentSum - material.quantityBuy * material.outputPrice;
    setSumMaterial(currentSum);
  };

  // Dịch vụ
  function checkService(service, services) {
    var a = 1;
    for (var i = 0; i < services.length; i++) {
      if (service.id === services[i].id) {
        console.log("i : " + a);
        return a;
      }
      a++;
    }
    return 0;
  }
  // eslint-disable-next-line no-unused-vars
  const showListService = () => {
    if (listService == "") {
      setListService("info-material");
    } else {
      setListService("");
    }
  };

  const chooseService = (service) => {
    setListMaterial("");
    let services = serviceChoose;
    if (services.length > 0) {
      let check = checkService(service, services);
      if (check !== 0) {
        var service1 = {
          id: services[check - 1].id,
          code: services[check - 1].code,
          name: services[check - 1].name,
          price: services[check - 1].price,
        };
        services[check - 1] = service1;
      } else {
        services.push(service);
      }
    } else {
      services.push(service);
    }
    let currentSum = 0;
    serviceChoose.map((service) => {
      currentSum += service.price;
    });
    setSumServices(currentSum);
  };

  const deleteServiceChoosed = (service) => {
    let check = checkService(service, serviceChoose);
    let servicesRemaining = [];
    for (var i = 0; i < serviceChoose.length; i++) {
      if (check - 1 !== i) {
        servicesRemaining.push(serviceChoose[i]);
      }
    }
    setServiceChoose(servicesRemaining);
    let currentSum = sumServices;
    currentSum = currentSum - service.price;
    setSumServices(currentSum);
  };

  const fetchInvoicesList = () => {
    try {
      InvoicesService.getInvoices(filters3)
        .then((res) => {
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
                materials: invoice.materialOrderResponseDTOS,
                service: invoice.serviceOrderResponseDTOS,
              };
            })
          );
        })
        .catch(function (error) {
          console.log("ERROR: " + error.response.data.status);
          if (error.response.data.status == 403) {
            alert("Không có quyền truy cập!");
          }
        });
    } catch (error) {
      console.log("Failed to fetch Invoicce list: ", error.message);
      setError(error);
    }
  };
  console.log("iii", invoices);

  //Hàm thêm đơn hàng mới
  const addInvoice = (e) => {
    e.preventDefault();

    let materialDTOS = [];
    materialChoose.map((material) => {
      let material1 = {
        id: material.id,
        quantity: material.quantityBuy,
      };
      materialDTOS.push(material1);
    });
    let serviceDTOS = [];
    serviceChoose.map((service) => {
      let service1 = {
        id: service.id,
      };
      serviceDTOS.push(service1);
    });
    let invoice = {
      customerId: customer.id,
      area_id: areaChose.id,
      vehicleId: vehicle.id,
      fixerId: employee.id,
      note: noteInvoice,
      payMethod: 1,
      total: sumMaterial + sumServices,
      materialDTOS,
      serviceDTOS,
    };
    InvoicesService.postInvoice(invoice)
      .then(() => {
        props.history.push("/admin/areas");
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        } else {
          setMessageError(error.response.data.message);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        }
      });
  };
  const changePayMethod = (e) => {
    setPayMethod(e.target.value);
  };
  const changeNote = (e) => {
    setNoteInvoice(e.target.value);
  };
  const changeName = (e) => {
    setName(e.target.value);
  };
  const changePhone = (e) => {
    setPhone(e.target.value);
  };
  const changeLicensePlate = (e) => {
    setLicensePlate(e.target.value);
  };

  //Hàm thêm phương tiện và thông tin khách hàng
  const addCustomerVehicle = (e) => {
    e.preventDefault();

    let vehicleCustomerDTORequest = { name, phone, licensePlate };
    console.log(
      "vehicleCustomerDTORequest => " +
        vehicleCustomerDTORequest.name +
        vehicleCustomerDTORequest.phone +
        vehicleCustomerDTORequest.licensePlate
    );

    CustomerService.postCustomerAndVehicle(vehicleCustomerDTORequest)
      .then(() => {
        setFilters({
          ...filters,
        });
        setTl(true);
        setTimeout(function () {
          setTl(false);
        }, 3000);
        setListCustomerClass("");
        setModalCustomerClass("");
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          alert(error.response.data.errors[0].defaultMessage);
        } else {
          alert(error.response.data.message);
        }
      });
  };
  const test3 = () => {
    setOpen2(!open2);
  };

  //Hàm thêm khách hàng mới có sẵn biển số
  const addCustomer = (e) => {
    e.preventDefault();

    let customerVehicleDTO = {
      name,
      phone,
      licensePlate: vehicle.licensePlate,
    };
    console.log("Customer => " + customerVehicleDTO);

    CustomerService.postCustomerByVehicle(customerVehicleDTO)
      .then(() => {
        setFiltersCustomer({
          ...filters,
          idVehicle: vehicle.id,
        });
        setModalCustomerClass("");
        setTl(true);
        setTimeout(function () {
          setTl(false);
        }, 3000);
        setCustomer({
          name: name,
          phone: phone,
        });
        setShowInfoCustomerVehicle("info-customer");
      })
      .catch(function (error) {
        console.log(error.response);
        if (error.response.data.errors) {
          setMessageError(error.response.data.errors[0].defaultMessage);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        } else {
          setMessageError(error.response.data.message);
          setFail(true);
          // use this to make the notification autoclose
          setTimeout(function () {
            setFail(false);
          }, 3000);
        }
      });
  };

  function handleSearchTermChange(e) {
    const value = e.target.value;
    //Set --100 --clear, set --300 -> submit
    //Set --300 --> submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setFilters({
        ...filters,
        keyword: value,
      });
      setFiltersCustomer({
        ...filters,
        keyword: value,
      });
    }, 300);
  }

  function handleSearchTermChangeCustomerVehicle(e) {
    const value = e.target.value;
    //Set --100 --clear, set --300 -> submit
    //Set --300 --> submit
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setFiltersCustomer({
        ...filters,
        keyword: value,
      });
    }, 300);
  }
  const [reason, setReason] = useState(vehicles);
  const handleFetchOptions = useCallback(
    async (filter) => {
      try {
        const res = { data: { reasons: vehicles } };
        const data = res.data.reasons.filter((item) =>
          item.name.includes(filter.query || "")
        );
        return Promise.resolve({
          limit: 10,
          total: data.length,
        });
      } catch (error) {}
    },
    [vehicles]
  );
  const renderOption = useCallback((option) => option.name, []);
  const onSubmit = useCallback(
    async (query, value, vehicles) => {
      if (value.name.toLocaleLowerCase() !== query.toLocaleLowerCase()) {
        let selected;
        if (vehicles.length > 0) {
          const optionsReverse = [...vehicles].reverse();
          selected = optionsReverse.find(
            (e) => e.name.toLocaleLowerCase() === query.toLocaleLowerCase()
          );
        }
        onChange({
          id: selected?.id || 0,
          name: query,
        });
      }
    },
    [vehicles]
  );
  const onChange = (value) => {
    setReason(value);
  };
  const onQueryChange = useCallback(
    async (filter) => {
      let dataSourceFilter = {
        ...filter,
        page: filter.page || 1,
        query: filter.query,
      };
      return dataSourceFilter;
    },
    [vehicles]
  );
  const colorStatusInvoice = (status) => {
    if (status.localeCompare("Đang chờ thợ") == 0) {
      return (
        <span
          style={{
            color: "rgb(255, 174, 6)",
            background: "rgb(255, 239, 205)",
            borderRadius: "20px",
            width: "fit-content",
            margin: "auto",
            color: "rgb(255, 255, 255)",
            padding: "2px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      );
    } else if (status.localeCompare("Đã thanh toán") == 0) {
      return (
        <span
          style={{
            color: "rgb(255 255 255)",
            background: "rgb(102, 184, 255)",
            borderRadius: "20px",
            width: "fit-content",
            margin: "auto",
            color: "rgb(255, 255, 255)",
            padding: "2px 10px",
            whiteSpace: "nowrap",
          }}
        >
          {status}
        </span>
      );
    } else if (status.localeCompare("Chờ thanh toán") == 0) {
      return <span style={{ color: "#3c91f1" }}>{status}</span>;
    } else if (status.localeCompare("Đang sửa") == 0) {
      return <span style={{ color: "red" }}>{status}</span>;
    }
  };
  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    console.log("2222", row);
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
          <TableCell align="center">{row.licensePlate}</TableCell>
          <TableCell align="center">{row.fixerName}</TableCell>
          <TableCell align="center">
            {" "}
            {colorStatusInvoice(row.status)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Chi tiết hóa đơn
                </Typography>
                {row.materials ? (
                  <Table size="small" aria-label="purchases">
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                    ></Typography>
                    <TableHead>
                      <TableRow>
                        <TableCell1 style={{}}>Tên linh kiện</TableCell1>
                        <TableCell1 align="center">Số lượng mua </TableCell1>
                        <TableCell1 align="center">Giá Thành</TableCell1>
                        <TableCell1 align="right">tổng tiền(đ)</TableCell1>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.materials.map((historyRow) => (
                        <TableRow key={historyRow.id}>
                          <TableCell component="th" scope="row">
                            {historyRow.name}
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.quantityBuy}
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.outputPrice}
                          </TableCell>
                          <TableCell align="right">
                            {historyRow.outputPrice * historyRow.quantityBuy}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  ""
                )}
                {row.service ? (
                  <Table size="small" aria-label="purchases">
                    <Typography
                      variant="h6"
                      gutterBottom
                      component="div"
                    ></Typography>
                    <TableHead>
                      <TableRow>
                        <TableCell1>Tên dịch vụ</TableCell1>
                        <TableCell1 align="center">Số lượng</TableCell1>
                        <TableCell1 align="center">Giá Thành</TableCell1>
                        <TableCell1 align="right">tổng tiền(đ)</TableCell1>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.service.map((historyRow) => (
                        <TableRow key={historyRow.id}>
                          <TableCell component="th" scope="row">
                            {historyRow.name}
                          </TableCell>
                          <TableCell align="center">1</TableCell>
                          <TableCell align="center">
                            {historyRow.price}
                          </TableCell>
                          <TableCell align="right">
                            {historyRow.price}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  ""
                )}
                {row.status.localeCompare("Chờ thanh toán") == 0 ? (
                  <Button
                    style={{
                      background: "#218FFE",
                      color: "white",
                      height: "20px",
                      marginBottom: "10px",
                      marginTop: "15px",
                    }}
                    onClick={() => test3(row.id)}
                  >
                    Thanh toán
                  </Button>
                ) : (
                  ""
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <div className="body-add-invoice">
      <Snackbars
        place="tc"
        color="info"
        message={messageSucsess}
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
      <div className="title-add-invoice">
        <div className="left-title-add-invoice">
          <div className="back">
            <button className="cancel-button" onClick={back}>
              <span>&lsaquo; </span>Quay lại
            </button>
          </div>
          <div className="name-page">
            <span>Tạo phiếu sửa chữa</span>
          </div>
        </div>
        <div className="right-title-add-invoice">
          <button className="btn-add" onClick={addInvoice}>
            Tạo phiếu sửa chữa
          </button>
        </div>
      </div>
      <div className="content-add-invoice">
        <div className="main-invoice">
          <div className="left-invoice">
            <div className="top-left-invoice" style={{ width: "1030px" }}>
              <div className="content-customer">
                <div className="search-customer">
                  <TextField
                    id="filled-search"
                    label="Thông tin xe"
                    type="search"
                    variant="outlined"
                    onChange={handleSearchTermChange}
                    onClick={showListCustomer}
                    style={{
                      marginLeft: "30px",
                      width: "80%",
                      marginTop: "20px",
                    }}
                    size="small"
                  />
                  <div id="info-customers" className={listCustomerClass}>
                    <div className="license-plate" onClick={formAddCustomer}>
                      <Add color="#0e90ff" onClick={formAddCustomer}>
                        {" "}
                      </Add>{" "}
                      Thêm phương tiện
                    </div>

                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id}>
                        <div
                          className="license-plate"
                          onClick={() => chooseVehicle(vehicle)}
                        >
                          <span>{vehicle.licensePlate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div id="info-license-plate" className={showInfoCustomer}>
                    <div className="info">
                      <div className="table">
                        <table>
                          <tr>
                            <th>Biển số</th>
                            <td>:</td>
                            <td>{vehicle.licensePlate}</td>
                          </tr>
                        </table>
                      </div>
                      <div className="delete-license">
                        <span onClick={deleteCustomer}>x</span>
                      </div>
                    </div>
                  </div>
                  <div id="modal-vehicle" className={modalCustomerClass}>
                    <div id="add-vehicle">
                      <div className="title-add-customer">
                        <div className="name-title">
                          <span>Thêm mới phương tiện</span>
                        </div>
                        <div className="close-form-add-customer">
                          <span onClick={outFormAddCustomer}>&Chi;</span>
                        </div>
                      </div>
                      <div className="content-add-customer">
                        <form>
                          <div className="form-group-top">
                            <div className="form-group">
                              <label>
                                Họ Tên<span style={{ color: "red" }}>*</span>
                              </label>
                              <br />
                              <input
                                type="text"
                                className="input-customer"
                                name="name"
                                onChange={changeName}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                Số điện thoại
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <br />
                              <input
                                type="text"
                                className="input-customer"
                                name="phone"
                                onChange={changePhone}
                              />
                            </div>
                          </div>
                          <div className="form-group-bot">
                            <label>
                              Biển số xe<span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              type="text"
                              className="input-customer"
                              name="licensePlate"
                              onChange={changeLicensePlate}
                            />
                          </div>
                        </form>

                        <div className="button-add-customer">
                          <button
                            className="btn-add"
                            onClick={addCustomerVehicle}
                          >
                            Thêm
                          </button>
                          <div className="btn-out" onClick={outFormAddCustomer}>
                            <span>Thoát</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="search-customer-vehicle" className={customerClass}>
                  <form>
                    <TextField
                      id="filled-search"
                      label="Thông tin khách hàng"
                      type="search"
                      variant="outlined"
                      onChange={handleSearchTermChangeCustomerVehicle}
                      onClick={showListCustomerVehicle}
                      style={{
                        marginLeft: "30px",
                        width: "50%",
                        marginTop: "20px",
                      }}
                      size="small"
                    />
                  </form>
                  <div
                    id="info-customer-vehicle"
                    className={listCustomerVehicleClass}
                  >
                    <div
                      className="license-plate"
                      onClick={formAddCustomerVehicle}
                    >
                      <span className="button-add-customers">
                        + Thêm khách hàng
                      </span>
                    </div>
                    {customers.map((customer) => (
                      <div key={customer.id}>
                        <div
                          className="license-plate"
                          onClick={() => chooseCustomer(customer)}
                        >
                          <table>
                            <tr>
                              <td>
                                <span>{customer.name}</span>{" "}
                              </td>
                              <td>
                                <span>{customer.phone}</span>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div id="info-customer" className={showInfoCustomerVehicle}>
                    <div className="info">
                      <div className="table">
                        <table>
                          <tr>
                            <th>Tên</th>
                            <td>:</td>
                            <td>{customer.name}</td>
                          </tr>
                          <tr>
                            <th>Số điện thoại</th>
                            <td>:</td>
                            <td>{customer.phone}</td>
                          </tr>
                        </table>
                      </div>
                      <div className="delete-license">
                        <span onClick={deleteCustomerVehicle}>x</span>
                      </div>
                    </div>
                    <Button
                      style={{
                        background: "#218FFE",
                        color: "white",
                        height: "30px",
                        marginBottom: "10px",
                        marginTop: "15px",
                        marginLeft: "32px",
                      }}
                      onClick={() => test3()}
                    >
                      Lịch sử sửa xe
                    </Button>
                  </div>
                  <div id="modal-customer" className={modalCustomerClass}>
                    <div id="add-customer">
                      <div className="title-add-customer">
                        <div className="name-title">
                          <span>Thêm mới khách hàng</span>
                        </div>
                        <div className="close-form-add-customer">
                          <span onClick={outFormAddCustomer}>&Chi;</span>
                        </div>
                      </div>
                      <div className="content-add-customer">
                        <form>
                          <div className="form-group-top">
                            <div className="form-group">
                              <label>
                                Họ Tên<span style={{ color: "red" }}>*</span>
                              </label>
                              <br />
                              <input
                                type="text"
                                className="input-customer"
                                name="name"
                                onChange={changeName}
                              />
                            </div>
                            <div className="form-group">
                              <label>
                                Số điện thoại
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <br />
                              <input
                                type="text"
                                className="input-customer"
                                name="phone"
                                onChange={changePhone}
                              />
                            </div>
                          </div>
                          <div className="form-group-bot">
                            <label>Biển số xe</label>
                            <br />
                            <input
                              type="text"
                              disabled
                              className="input-customer"
                              name="licensePlate"
                              value={vehicle.licensePlate}
                            />
                          </div>
                        </form>
                        <div className="button-add-customer">
                          <button className="btn-add" onClick={addCustomer}>
                            Thêm
                          </button>
                          <div className="btn-out" onClick={outFormAddCustomer}>
                            <span>Thoát</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {open2 ? (
              <Box sx={{ width: "1030px" }}>
                <Paper sx={{ width: "1030px", mb: 2, minHeight: "100px" }}>
                  <TableContainer>
                    <Table
                      // sx={{ minWidth: 750 }}
                      aria-labelledby="tableTitle"
                      size={"medium"}
                    >
                      <TableHead variant="h6">
                        <TableRow>
                          <TableHeaderCell></TableHeaderCell>
                          <TableHeaderCell variant="h6">
                            Tên hóa đơn
                          </TableHeaderCell>
                          <TableHeaderCell align="center">
                            Biển số xe
                          </TableHeaderCell>
                          <TableHeaderCell align="center">
                            Tên thợ sửa
                          </TableHeaderCell>
                          <TableHeaderCell align="center">
                            Trạng thái
                          </TableHeaderCell>
                          <TableHeaderCell></TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoices.map((row) => (
                          <Row key={row.code} row={row} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* <TablePagination
                      rowsPerPageOptions={[10, 25]}
                      component="div"
                      count={pagination.totalRows}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                </Paper>
              </Box>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddInvoices;
