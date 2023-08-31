import DateRangePicker from "../../components/DateRangePicker";
import "./UserLog.css";
import Search from "../../components/Search";
import Table from "../../components/Table";
import { convertTimeToString } from "../../utils/utils";
import { useEffect, useState } from "react";
import useDebug from "../../hooks/useDebug";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { IUser } from "../../interfaces";
import { fetchAllUsers } from "../../redux/slices/UserSlice";
import { useAppDispatch, userSelectors } from "../../redux";
import { useSelector } from "react-redux";

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
  const dispatch = useAppDispatch();

  const [searchUserLog, setSearchUserLog] = useState("");
  const { users } = useSelector(userSelectors);

  const debugValue = useDebug(searchUserLog, 500);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataSource, setDataSource] = useState<IUser[]>([]);

  useEffect(() => {
    snapshotDB();
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debugValue, searchUserLog, users]);

  const snapshotDB = () => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      let data: IUser[] = [];
      snapshot.docs.forEach((doc) =>
        data.push({
          _id: doc.id,
          key: doc.id,
          ...doc.data(),
        } as IUser)
      );
      setDataSource(data.sort((a, b) => a.email.localeCompare(b.userName)));
    });
  };
  const handleFilter = () => {
    const filteredData = users.filter((user) =>
      user.userName.toUpperCase().includes(debugValue.toUpperCase())
    );
    setDataSource(filteredData);
  };

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
        <Table columns={columns} rows={formattedDataSource} pageSize={10} />
      </div>
    </div>
  );
}

export default UserLog;
