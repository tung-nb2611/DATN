import { Box, Modal, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import InvoicesService from "services/InvoicesService";
ModalPayment.propTypes = {
    id: PropTypes.func,
}
ModalPayment.defaultProps = {
    id: null,
}
export default function ModalPayment(props) {
    const { id } = props
    const [messageSuccess, setMessageSuccess] = useState('');
    const [messageError, setMessageError] = useState('');
    const [tl, setTl] = React.useState(false);
    const [fail, setFail] = React.useState(false);
    const [open, setOpen] = React.useState(this.props.open);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [area, setArea] = useState([]);
    const [employeeId, setEmployeeId] = useState();
    const [salaryDay, setSalaryDay] = useState();
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buttonOtherClass, setButtonOtherClass] = useState('');
    const [modalTimeSheetClass, setModalTimeSheetClass] = useState('');
    const [modalSalaryDayClass, setModalSalaryDayClass] = useState('');
    const [serviceChoose, setServiceChoose] = useState([]);
    const [warningClass, setWarningClass] = useState('');
    const [warningModalClass, setWarningModalClass] = useState('');
    const [materialChoose, setMaterialChoose] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const [month, setMonth] = useState('');
    const [services, setServices] = useState([]);
    const [sumServices, setSumServices] = useState(0);
    const [materitals, setMaterials] = useState([]);
    const [status, setStatus] = useState('');
    const [areaChose, setAreaChose] = useState({});
    const [customer, setCustomer] = useState({
        id: 0,
        code: '',
        name: '',
        phone: '',
        licensePlate: ''
    });
    const [employee, setEmployee] = useState({
        id: 0,
        code: '',
        name: '',
        phone: ''
    });
    const [vehicle, setVehicle] = useState({
        id: 0,
        code: '',
        licensePlate: ''
    });
    const [sumMaterial, setSumMaterial] = useState(0);
    const { openModal } = useModal();
    const showButtonOther = () => {
        if (buttonOtherClass == '') {
            setButtonOtherClass('content-button');
        } else {
            setButtonOtherClass('');
        }
    }
    const editInvoice = (id) => {
        props.history.push(`/admin/invoices/edit-invoice/${id}`)
    }
    useEffect(() => {
        async function fetchInvoice() {
            try {
                InvoicesService.getInvoiceById(this.props.id).then((res) => {
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
                    console.log("1111", res.data);
                    setStatus(res.data.status)
                    setCustomer(customer);
                    setAreaChose(res.data.areaDTO)
                    setEmployee(res.data.userDTO);
                    setVehicle(vehicle);
                    setMaterialChoose(materials)
                    setServiceChoose(services)

                    let currentSumMaterial = 0;
                    materials.map((material) => {
                        currentSumMaterial = currentSumMaterial + material.quantityBuy * material.outputPrice;
                    })
                    setSumMaterial(currentSumMaterial)


                    let currentSumService = 0;
                    services.map((service) => {
                        currentSumService = currentSumService + service.price;
                    })
                    setSumServices(currentSumService)

                });

            } catch (error) {
                console.log("Failed to fetch Invoicce: ", error.message);
            }
        }
        fetchInvoice();
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid rgb(167 165 165)',
        boxShadow: 24,
        p: 4,
    };
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading....</div>;
    } else {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h1" component="h2">
                        Hóa đơn {area.invoice.id}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Tên khách hàng:{customer.name}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        số điện thoại:{customer.phone}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Biển số xe:{vehicle.licensePlate}
                    </Typography>
                </Box>
            </Modal>
        )
    }
}