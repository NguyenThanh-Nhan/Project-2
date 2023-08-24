import Calendar from "../Calendar";
import { IOverview } from "../../interfaces";
import CardOverview from "./CardOverView";
import "./OverView.css";
import { DashboardIcon03, Monitor, ServiceIcon } from "../../assect/img/1index";

const fakeData: IOverview[] = [
  {
    name: "Thiết bị",
    percent1: 90,
    percent2: 10,
    total: "4.221",
    color: "#FFA500",
    color2: "#7E7D88",
    status1: "Đang hoạt động",
    status2: "Ngưng hoạt động",
    number1: "3.799",
    number2: "422",
    icon: (
      <img src={Monitor} alt="" style={{ color: "#4277FF", width: "14px" }} />
    ),
  },
  {
    name: "Dịch vụ",
    percent1: 76,
    percent2: 24,
    total: "276",
    color: "#4277FF",
    color2: "#7E7D88",
    status1: "Đang hoạt động",
    status2: "Ngưng hoạt động",
    number1: "210",
    number2: "66",
    icon: (
      <img
        src={ServiceIcon}
        alt=""
        style={{ color: "#4277FF", width: "14px" }}
      />
    ),
  },
  {
    name: "Cấp số",
    percent1: 86,
    percent2: 10,
    percent3: 4,
    total: "4.221",
    color: "#35C75A",
    color2: "#7E7D88",
    color3: "#F178B6",
    status1: "Đã sử dụng",
    status2: "Đang chờ",
    status3: "Bỏ qua",
    number1: "3.721",
    number2: "486",
    number3: "32",
    icon: (
      <img
        src={DashboardIcon03}
        alt=""
        style={{ color: "#4277FF", width: "14px" }}
      />
    ),
  },
];

function OverView() {
  return (
    <div className="wrapper_OverView">
      <h2 className="heading_OverView">Tổng quan</h2>
      {fakeData.map((item, index) => (
        <CardOverview data={item} key={index} />
      ))}
      <div style={{ marginTop: 16 }}>
        <Calendar />
      </div>
    </div>
  );
}

export default OverView;
