// Import React và Component từ thư viện react
import React, { Component } from "react";

// Import Pie từ thư viện react-chartjs-2
import { Pie } from "react-chartjs-2";

// Tạo một class component tên là PieChart
class PieChart extends Component {
  // Tạo một constructor cho component
  constructor(props) {
    super(props);

    // Tạo một state cho component để lưu trữ dữ liệu cho biểu đồ
    this.state = {
      data: {},
    };
  }

  // Sử dụng phương thức componentDidMount để gọi api khi component được gắn vào DOM
  componentDidMount() {
    // Tạo một biến để lưu trữ url của api
    var apiUrl =
      "http://localhost:8080/api/admin/statistics/invoices?dateStart=2023-02-26&dateEnd=2023-03-05";

    // Sử dụng hàm fetch để gửi yêu cầu đến api và nhận về dữ liệu
    fetch(apiUrl)
      .then((response) => response.json()) // Chuyển đổi dữ liệu thành định dạng json
      .then((data) => {
        // Tạo một biến để lưu trữ các giá trị x và y cho biểu đồ
        var xValues = [];
        var yValues = [];

        // Duyệt qua mảng data và lấy ra các giá trị x và y
        data.forEach((item) => {
          xValues.push(item.x);
          yValues.push(item.y);
        });

        // Cập nhật state của component với dữ liệu mới nhận được từ api
        this.setState({
          data: {
            labels: xValues, // Nhãn cho biểu đồ là các giá trị x
            datasets: [
              {
                label: "My Dataset", // Nhãn cho tập dữ liệu
                data: yValues, // Dữ liệu cho biểu đồ là các giá trị y
                backgroundColor: [
                  // Màu nền cho từng phần của biểu đồ
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                ],
                hoverOffset: 4, // Khoảng cách khi di chuột vào phần của biểu đồ
              },
            ],
          },
        });
      })
      .catch((error) => console.error(error)); // Bắt lỗi nếu có
  }

  // Sử dụng phương thức render để hiển thị component ra DOM
  render() {
    return (
      <div>
        <h1>A Pie Chart from API Data</h1>
        <Pie data={this.state.data} />{" "}
        {/* Sử dụng component Pie từ react-chartjs-2 và truyền vào prop data */}
      </div>
    );
  }
}

// Xuất khẩu component PieChart
export default PieChart;
