/* eslint-disable no-empty */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Pagination from "components/Pagination/pagination";
import "../../assets/css/materials/material.css";
import FiltersForm from "../FiltersForm/MaterialSearch.js";
import LimitPagination from "components/Pagination/limitPagination.js";
import MaterialService from "../../services/materialService";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// material-ui icons
import Snackbars from "components/Snackbar/Snackbar.js";
import Edit from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes, { bool } from "prop-types";
import { visuallyHidden } from "@mui/utils";

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
  TextField,
} from "@material-ui/core";
import { Add, Clear } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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

const useStyles = makeStyles(styles);

export default function Material(props) {
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

  const [id, setId] = useState("");

  const [materials, setMaterials] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const [filter1, setFilter1] = useState({
    ids: [selected],
  });
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState("sm");
  function createData(name, calories, fat, carbs, protein) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
    };
  }

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRows: 12,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    keyword: "",
    status: 1,
  });
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function handleFiltersChange(e) {
    // console.log("New filters: ", newFilters);
    const value = e.target.value;
    setFilters({
      ...filters,
      _page: 1,
      keyword: value,
    });
  }

  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Tên Phụ Tùng",
    },
    {
      id: "calories",
      numeric: true,
      disablePadding: false,
      label: "Số lượng",
    },
    {
      id: "fat",
      numeric: true,
      disablePadding: false,
      label: "Giá bán",
    },
    {
      id: "carbs",
      numeric: true,
      disablePadding: false,
      label: "Trạng thái",
    },
  ];
  const TableHeaderCell = withStyles(() => ({
    root: {
      fontSize: "14px",
      fontWeight: "bold",
    },
  }))(TableCell);

  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead style={{ background: "#FAFCFF", fontStyle: "inherit" }}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableHeaderCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  const handleChangePage = (event, newPage) => {
    setFilters({
      ...filters,
      page: newPage + 1,
    });
    setPage(newPage);
  };
  useEffect(() => {
    async function fetchMaterialList() {
      try {
        MaterialService.getAllMaterial(filters)
          .then((res) => {
            const data = res.data.materialDTOS;
            const pagination = res.data.pagination;

            setMaterials(
              data.map((material) => {
                return {
                  select: false,
                  id: material.id,
                  code: material.code,
                  name: material.name,
                  description: material.description,
                  quantity: material.quantity,
                  supplier: material.supplier,
                  inputPrice: material.outputPrice,
                  outputPrice: material.inputPrice,
                  status: material.status,
                };
              })
            );
            setPagination(pagination);
            console.log(data);
            console.log(pagination);
            setIsLoaded(true);
          })
          .catch(function (error) {
            console.log("ERROR: " + error.response.data.status);
            if (error.response.data.status == 403) {
              alert("Không có quyền truy cập!");
            }
          });
      } catch (error) {
        console.log("Failed to fetch material list: ", error.message);
        setError(error);
      }
    }
    fetchMaterialList();
  }, [filters]);

  const deleteMaterial = (id) => {
    MaterialService.deleteMaterial(id)
      .then(() => {
        toast.success("xóa phụ tùng thành công!");
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response.data.errors) {
          console.log(error.response.data.errors[0].defaultMessage);
        } else {
          console.log(error.response.data.message);
        }
      });
  };
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Đã chọn {numSelected} phụ tùng
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          ></Typography>
        )}

        {numSelected > 0 ? (
          <Tooltip
            title="Delete"
            style={{ marginLeft: "10px", color: "#58A5FF" }}
            onClick={handleClickOpen}
          >
            <Typography>Xóa phụ tùng</Typography>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton></IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const addMaterial = () => {
    props.history.push("/admin/materials/add-material");
  };
  const updateMaterial = (id) => {
    props.history.push(`/admin/materials/update-material/${id}`);
  };
  const receipt = () => {
    props.history.push("/admin/receipts");
  };
  const exportMaterial = () => {
    props.history.push("/admin/export");
  };
  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          Thông tin kho hàng
        </Typography>
      </Box>
      <Button
        style={{
          background: "#218FFE",
          color: "white",
          height: "40px",
          marginBottom: "10px",
          marginTop: "15px",
          float: "right",
          marginRight: "10px",
        }}
        variant="outlined"
        startIcon={<Add />}
        onClick={addMaterial}
      >
        Thêm phụ tùng
      </Button>
      <Button
        style={{
          background: "linear-gradient(180deg,#0fd186,#0fd186)",
          color: "white",
          height: "40px",
          marginBottom: "10px",
          marginTop: "15px",
          float: "right",
          marginRight: "10px",
        }}
        variant="outlined"
        onClick={receipt}
      >
        Phiếu Nhập{" "}
      </Button>
      <Button
        style={{
          background: "rgb(244, 148, 35)",
          color: "white",
          height: "40px",
          marginBottom: "10px",
          marginTop: "15px",
          float: "right",
          marginRight: "10px",
        }}
        variant="outlined"
        onClick={exportMaterial}
      >
        Phiếu xuất{" "}
      </Button>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, minHeight: "100px" }}>
          <TextField
            id="filled-search"
            label="Tìm kiếm phụ tùng"
            type="search"
            variant="outlined"
            style={{
              marginLeft: "30px",
              width: "93%",
              marginTop: "20px",
            }}
            size="small"
            onChange={handleFiltersChange}
          />
          {selected.length > 0 ? (
            <EnhancedTableToolbar numSelected={selected.length} />
          ) : (
            <div></div>
          )}
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHead variant="h6">
                <TableRow>
                  <TableHeaderCell variant="h6">Tên phụ tùng</TableHeaderCell>
                  <TableHeaderCell align="center">Số lượng </TableHeaderCell>
                  <TableHeaderCell align="center">Đơn giá</TableHeaderCell>
                  <TableHeaderCell align="center">Trạng thái</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((row, index) => {
                  return (
                    <TableRow>
                      <TableCell component="th">
                        {" "}
                        <Link onClick={() => updateMaterial(row.id)}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{row.quantity}</TableCell>
                      <TableCell align="center">{row.outputPrice}</TableCell>

                      {row.quantity >= 10 ? (
                        <TableCell
                          style={{
                            color: "#66B8FF",
                            fontWeight: "bool",
                          }}
                          align="center"
                        >
                          Còn hàng
                        </TableCell>
                      ) : (
                        <TableCell
                          style={{
                            color: "red",
                            fontWeight: "bool",
                          }}
                          align="center"
                        >
                          sắp hết hàng
                        </TableCell>
                      )}
                      <TableCell align="left">
                        <Clear
                          size="small"
                          onClick={() => deleteMaterial(row.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={pagination.totalRows}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
}
