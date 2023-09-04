import DateRangePicker from "../../components/DateRangePicker";
import "./UserLog.css";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { convertTimeToString } from "../../utils/utils";
import { useState } from "react";


const columns = [
  {
    title: "Tên đăng nhập",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Thời gian tác động",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "IP thực hiện",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "Thao tác thực hiện",
    dataIndex: "action",
    key: "action",
  },
];

interface DataType {
  key: string;
  userName: string;
  time: string;
  ip: string;
  action: string;
}

const dataSource: DataType[] = [];
for (let i = 0; i < 20; i++) {
  dataSource.push({
    key: i + 1 + "",
    userName: "admin" + (i + 1) + "@gmail.com",
    time: convertTimeToString(new Date(), "DD/MM/YYYY HH:mm:ss"),
    ip: "192.168.1.1",
    action: "Cập nhật thông tin dịch vụ DV_01",
  });
}

const formattedDataSource = dataSource.map((item) => ({
  key: item.key,
  userName: item.userName,
  time: item.time,
  ip: item.ip,
  action: item.action,
}));

function UserLog() {
 const [searchUserLog, setSearchUserLog] = useState("");
const filteredDataSource = formattedDataSource.filter((item) =>
  item.userName.toLowerCase().includes(searchUserLog.toLowerCase())
);
  return (
    <div className="wrapper_userLog">
      <div className="filter_userLog">
        <div className="wrap_userLog">
          <span className="title_userLog">Chọn thời gian</span>
          <DateRangePicker />
        </div>
        <div className="wrap_userLog">
          <div className="search-box_userLog">
            <span className="title_userLog">Từ khoá</span>
            <Search
              placeholder="Nhập từ khóa"
              value={searchUserLog}
              onChange={(e) => setSearchUserLog(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="wrap-table_userLog">
        <Table columns={columns} rows={filteredDataSource} pageSize={10} />
      </div>
    </div>
  );
}

export default UserLog;
