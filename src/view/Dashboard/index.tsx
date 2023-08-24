import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import "./Dashboard.css";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCalendarIcon,
  MarkIcon,
  UserCallIcon,
} from "../../assect/img/1index";

const options = [
  {
    label: "Ngày",
    value: "ngày",
  },
  {
    label: "Tuần",
    value: "tuần",
  },
  {
    label: "Tháng",
    value: "tháng",
  },
];

const series = [
  {
    name: "Số thứ tự",
    data: [2500, 4200, 4000, 3500, 3200, 4221, 3300, 4300, 3200],
  },
];

function Dashboard() {
  const [type, setType] = useState("ngày");
  const [time, setTime] = useState("Tháng " + moment().format("MM/yyyy"));
  const handleSelect = (value: React.ChangeEvent<HTMLInputElement>) => {
    String(value) === "tháng"
      ? setTime("Năm " + moment().format("yyyy"))
      : setTime("Tháng " + moment().format("MM/yyyy"));
    setType(String(value));
  };
  return (
    <div className="wrapper_das">
      <h1 className="heading_das">Biểu đồ cấp số</h1>
      <div className="category_Dashboard">
        <div className="category-item">
          <div className="top">
            <div className="wrap-icon">
              <img src={CalendarIcon} alt="" />
            </div>
            <h2 className="title_das">
              Số thứ tự <br />
              đã cấp
            </h2>
          </div>
          <div className="bottom_das">
            <h1 className="quantity_das">4.221</h1>
            <div className="percent_das">
              <img src={ArrowUpIcon} alt="" /> <span>32,41%</span>
            </div>
          </div>
        </div>
        <div className="category-item">
          <div className="top">
            <div className="wrap-icon">
              <img src={CheckCalendarIcon} alt="" />
            </div>
            <h2 className="title_das">
              Số thứ tự <br />
              đã sử dụng
            </h2>
          </div>
          <div className="bottom_das">
            <h1 className="quantity_das">3.721</h1>
            <div className="percent_das">
              <img src={ArrowDownIcon} alt="" /> <span>32,41%</span>
            </div>
          </div>
        </div>
        <div className="category-item">
          <div className="top">
            <div className="wrap-icon">
              <img src={UserCallIcon} alt="" />
            </div>
            <h2 className="title_das">
              Số thứ tự <br />
              đang chờ
            </h2>
          </div>
          <div className="bottom_das">
            <h1 className="quantity_das">468</h1>
            <div className="percent_das">
              <img src={ArrowUpIcon} alt="" /> <span>56,41%</span>
            </div>
          </div>
        </div>
        <div className="category-item">
          <div className="top">
            <div className="wrap-icon">
              <img src={MarkIcon} alt="" />
            </div>
            <h2 className="title_das">
              Số thứ tự <br />
              đã bỏ qua
            </h2>
          </div>
          <div className="bottom_das">
            <h1 className="quantity_das">32</h1>
            <div className="percent_das">
              <img src={ArrowDownIcon} alt="" /> <span>22,41%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="filter">
          <div>
            <h2 className="heading-2">Bảng thống kê theo {type}</h2>
            <span>{String(time)}</span>
          </div>
          <div className="order-by">
            <p style={{ marginTop: 20 }}>Xem theo</p>
            <div className="dropdown_das">
              <Dropdown
                options={options}
                onChange={(value) => handleSelect(value)}
              />
            </div>
          </div>
        </div>
        <ReactApexChart
          type="area"
          series={series}
          height={480}
          options={{
            chart: {
              type: "area",
            },
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              type: "category",
              categories: ["01", "7", "11", "13", "", "19", "", "", "31"],
            },
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
