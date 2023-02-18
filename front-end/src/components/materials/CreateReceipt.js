/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/invoices/CreateInvoiceMaterial.css";
import ReceiptsService from "services/ReceiptsService";
import { ArrowBackIosOutlined, AutorenewOutlined, Clear, Search } from '@material-ui/icons';
import '../../assets/css/search/ReceiptSearch.css'
import { showPrice } from "../../helper/function";
import Snackbars from 'components/Snackbar/Snackbar.js';
import '../../assets/css/invoices/InvoiceMaterialSearch.css'
import MaterialService from "services/materialService";
// import ServicesService from "services/ServicesService";
import '../../assets/css/invoices/InvoiceServiceSearch.css'
import { Button, Collapse, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Radio, RadioGroup, Select, Table, TableBody, TableContainer, TableHead, TableRow, TextareaAutosize, TextField, Typography } from "@material-ui/core";
import { Box } from "@sapo-presentation/sapo-ui-components";
import MuiTableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from "@material-ui/core/styles";

export default function CreateReceipt(props) {
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

    const [materialChoose, setMaterialChoose] = useState([]);
    const [listMaterial, setListMaterial] = useState('');
    const [materitals, setMaterials] = useState([]);
    const [sumMaterial, setSumMaterial] = useState(0);
    const typingTimeoutRef = useRef(null);
    const [modalMaterialClass, setModalMaterialClass] = useState('');
    const [note, setNote] = useState('');
    const [type, setType] = useState('');
    const [payMethod, setPayMethod] = useState();
    const [nameMaterial, setNameMaterial] = useState();
    const [inputPrice, setInputPrice] = useState();
    const [outputPrice, setOutputPrice] = useState();
    const [description, setDescription] = useState();
    const [supplier, setSupplier] = useState();
    const [filterSum, setFilterSum] = useState({
        sum: 0,
    });
    const [filters, setFilters] = useState({
        keyword: "",
        status: 1,
        store_id: 1
    });
    const [pay, setPay] = React.useState('');

    //Lấy list Phụ kiện
    useEffect(() => {
        async function fetchMaterialList() {
            try {
                MaterialService.getListMaterial(filters).then((res) => {
                    let materitals = res.data;
                    console.log(res.data);
                    setMaterials(
                        materitals.map((materital) => {
                            return {
                                id: materital.id,
                                code: materital.code,
                                name: materital.name,
                                inputPrice: materital.inputPrice,
                                quantity: materital.quantity,
                                quantityInput: 1,
                            }
                        }))
                });

            } catch (error) {
                console.log("Failed to fetch Invoicce list: ", error.message);
            }
        }
        fetchMaterialList();
    }, [filters]);

    const back = () => {
        props.history.push('/admin/receipts');
    }

    const showListMaterial = () => {
        console.log(listMaterial)
        if (listMaterial == '') {
            setListMaterial('info-material');
        } else {
            setListMaterial('');
        }
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
    useEffect(() => {
        async function fetchMaterialList() {
            try {
                let currentSumMaterial = 0;
                materialChoose.map((data) => {
                    currentSumMaterial += data.quantityInput * data.inputPrice;
                })
                setSumMaterial(currentSumMaterial);
            } catch (error) {
                console.log("Failed to fetch Service list: ", error.message);
            }
        }
        fetchMaterialList();
    }, [filterSum]);

    const chooseMaterial = (material) => {
        setListMaterial('');
        // if (material.quantity === 0) {
        //     return alert("Phụ kiện đã hết!")
        // } else {
        let materials = materialChoose;
        if (materials.length > 0) {
            let check = checkMaterial(material, materials);
            if (check !== 0) {
                var material1 = {
                    id: materials[check - 1].id,
                    code: materials[check - 1].code,
                    name: materials[check - 1].name,
                    inputPrice: materials[check - 1].inputPrice,
                    quantity: materials[check - 1].quantity,
                    quantityInput: materials[check - 1].quantityInput + 1,
                }
                materials[check - 1] = material1;

            } else {
                materials.push(material);
            }
        } else {
            materials.push(material)
        }
        let currentSumMaterial = 0;
        materials.map((data) => {
            currentSumMaterial += data.quantityInput * data.inputPrice;
        })
        setSumMaterial(currentSumMaterial);
        setMaterialChoose(materials);
    }

    // }

    const deleteMaterialChoosed = (material) => {
        let materials = materialChoose;

        let check = checkMaterial(material, materials);
        let materialRemaining = [];
        for (var i = 0; i < materials.length; i++) {
            if ((check - 1) !== i) {
                materialRemaining.push(materials[i]);
            }
        }
        setMaterialChoose(materialRemaining);
        let currentSum = sumMaterial;
        currentSum = currentSum - (material.quantityInput * material.inputPrice);
        setSumMaterial(currentSum);
    }

    //Hàm thêm phiếu nhập hàng mới
    const addReceipt = (e) => {
        e.preventDefault();
        let materialDTO = [];
        materialChoose.map((material) => {
            let material1 = {
                id: material.id,
                quantity: material.quantityInput,

            }
            materialDTO.push(material1)
        })
        let receiptDTO = { materialDTOS: materialDTO, note: note, type:type, storeId: "1" }
        console.log("receipt => " + JSON.stringify(receiptDTO));
        ReceiptsService.postReceipt(receiptDTO)
            .then(() => {
                props.history.push("/admin/receipts");
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
    const changePayMethod = (e) => {
        setPayMethod(e.target.value);
    }
    const changeNameMaterial = (e) => {
        setNameMaterial(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const changeInputPrice = (e) => {
        setInputPrice(e.target.value);
    }
    const changeOutputPrice = (e) => {
        setOutputPrice(e.target.value);
    }
    const changeSupplier = (e) => {
        setSupplier(e.target.value);
    }

    const handleChangeValue = (event) => {
        setType(event.target.value);
    };

    const outFormAddMaterial = () => {
        if (modalMaterialClass == '') {
            setModalMaterialClass('modal-material');
        } else {
            setModalMaterialClass('')
        }
    }
    const formAddMaterial = () => {
        if (modalMaterialClass == '') {
            setModalMaterialClass('modal-material');
            setListMaterial('')
        } else {
            setModalMaterialClass('')
        }
    }
    const addMaterial = (e) => {
        e.preventDefault();
        let material = {
            name: nameMaterial,
            description: description,
            inputPrice: inputPrice,
            outputPrice: outputPrice,
            supplier: supplier
        }
        console.log("material: " + material)
        MaterialService.postMaterialDTO(material).then(() => {
            window.location.reload()
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
    }
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
            })

        }, 300);

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
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = useState(false);
        return (
            <React.Fragment>

                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{showPrice(row.inputPrice).toString()} vnđ</TableCell>
                    <TableCell align="right">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            style={{
                                width: "100px",
                                height: "40px"
                            }}
                            value={row.quantityInput}
                            onChange={e => {
                                setMaterialChoose(
                                    materialChoose.map(materialCheck => {
                                        if (materialCheck.id === row.id) {
                                            materialCheck.quantityInput = e.target.value;
                                        }
                                        setFilterSum({
                                            sum: 0
                                        });
                                        return materialCheck;
                                    })
                                )
                            }}
                        />

                    </TableCell>
                    <TableCell align="right">{row.inputPrice * row.quantityInput} vnđ</TableCell>
                    <TableCell ><Clear onClick={() => deleteMaterialChoosed(row)} fontSize="small" /></TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
    return (
        <div className="body-add-receipt">
            <Box style={{ marginBottom: "25px", backgroundColor: "#F6F6FA" }}>

                <Typography onClick={back}> <ArrowBackIosOutlined style={{ height: "10px" }} /> Quay lại</Typography>
                <Typography style={{ marginTop: "10px", marginLeft: "15px" }} variant="h4">Phiếu nhập phụ tùng</Typography>
                <Button style={{
                    background: "#218FFE",
                    color: "white",
                    height: "40px",
                    marginBottom: "10px",
                    marginTop: "-35px",
                    float: "right",
                    marginRight: "10px",
                }} variant="outlined" onClick={addReceipt}>Tạo phiếu </Button>
            </Box>
            <Box style={{ display: "flex" }}>
                <Box width="80%" bgcolor="white" minHeight="300px">
                    <Typography style={{ fontSize: "16px", fontWeight: "bold", marginLeft: "10px" }}>
                        Thông tin phụ tùng
                    </Typography>
                    <div className="top-content">
                        <div className="search-material">
                            <TextField
                                label="Tên phụ tùng"
                                id="outlined-required" variant="outlined"
                                style={{
                                    width: "95%",
                                    padding: "10px"
                                }}
                                size="small"
                                onClick={showListMaterial}
                                onChange={handleSearchTermChange}

                            />
                            <div id="info-material" className={listMaterial}>
                                {materitals.map((materital) => (
                                    <div key={materital.id}>
                                        <div className="info-detail" onClick={() => chooseMaterial(materital)}>
                                            <table>
                                                <tr>
                                                    <td className="td-1">{materital.name}</td>
                                                    <td className="td-2">{showPrice(materital.inputPrice).toString()}</td>
                                                </tr>
                                                <tr>
                                                    <td className="td-1">{materital.code}</td>
                                                    <td className="td-2">Số lượng trong kho: {materital.quantity}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <TableContainer component={Paper} >
                        <Table aria-label="collapsible table" >
                            <TableHead variant="h6">
                                <TableRow>

                                    <TableHeaderCell variant="h6">Tên phụ tùng</TableHeaderCell>
                                    <TableHeaderCell align="right">Đơn giá</TableHeaderCell>
                                    <TableHeaderCell align="right">Số lượng </TableHeaderCell>
                                    <TableHeaderCell align="right">Thành Tiền</TableHeaderCell>
                                    <TableHeaderCell ></TableHeaderCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {materialChoose.map((row) => (
                                    <Row key={row.name} row={row} />
                                ))}
                            </TableBody>
                        </Table>
                        <Box style={{ display: "flex", float: "right", marginTop: "60px", marginRight: "50px" }}>
                            <Typography variant="h6" style={{ marginRight: "50px" }}>Tổng tiền:</Typography>
                            <Typography variant="h6">{showPrice(sumMaterial).toString()}vnd</Typography>
                        </Box>
                    </TableContainer>
                </Box>
                <Box style={{ marginLeft: "40px", marginTop: "18px" }}>
                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Loại phiếu</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={type}
                            onChange={handleChangeValue}
                        >
                            <FormControlLabel value="2" control={<Radio />} label="phiếu xuất hàng" />
                            <FormControlLabel value="1" control={<Radio />} label="phiếu nhập phụ tùng" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box style={{ marginTop: "20px", minHeight: "200px", display: "flex" }}>
                <Box style={{ width: "50%", marginLeft: "10px" }}>
                    <Typography style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>
                        Phương thức thanh toán
                    </Typography>
                    <FormControl style={{ width: "70%", marginTop: "10px" }}>
                        <InputLabel
                            style={{
                                fontSize: "15px",
                                color: "black"
                            }} >Chọn phương thức thanh toán</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payMethod}
                            label="Age"
                            onChange={changePayMethod}
                        >
                            <MenuItem value={10}>Tiền mặt</MenuItem>
                            <MenuItem value={20}>visa</MenuItem>
                            <MenuItem value={30}>chuyển khoản</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Typography style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>
                        Ghi chú
                    </Typography>
                    <TextareaAutosize
                        aria-label="minimum height"
                        minRows={8}

                        style={{
                            width: 500, height: "80px",
                            marginLeft: "60px", marginTop: "30px"
                        }}></TextareaAutosize>
                </Box>
            </Box>
        </div>
    );
}
