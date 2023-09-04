import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { collection, onSnapshot } from "firebase/firestore";
import { deviceSelectors, useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { IDevice } from "../../../interfaces";
import deviceSlice, { fetchAllDevice } from "../../../redux/slices/DeviceSlice";
import { db } from "../../../firebase";
import Dropdown from "../../../components/Dropdown";
import Table from "../../../components/Table";
import Search from "../../../components/Search";
import PathSlice from "../../../redux/slices/PathSlice";
import "./ListDevice.css";
import config from "../../../config/routes";
import { AddSquare } from "../../../assect/img/1index";

const statusActive = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Hoạt động",
    value: "Hoạt động",
  },
  {
    label: "Ngưng hoạt động",
    value: "Ngưng hoạt động",
  },
];
const statusConnect = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Kết nối",
    value: "Kết nối",
  },
  {
    label: "Mất kết nối",
    value: "Mất kết nối",
  },
];

function ListDevice() {
  const dispatch = useAppDispatch();
  const { devices, loading } = useSelector(deviceSelectors);
  const [dataSource, setDataSource] = useState<IDevice[]>([]);
  const [active, setActive] = useState("Tất cả");
  const [connect, setConnect] = useState("Tất cả");
  const [searchDevice, setSearchDevice] = useState("");
  const [columns] = useState([
    {
      title: "Mã thiết bị",
      dataIndex: "deviceCode",
      key: "deviceCode",
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Địa chỉ IP",
      dataIndex: "ipAddress",
      key: "ipAddress",
    },
    {
      title: "Trạng thái hoạt động",
      dataIndex: "statusActive",
      key: "statusActive",
      render: (text: string) => (
        <div
          className={`status ${
            text.toUpperCase() === "Hoạt động".toUpperCase()
              ? "active"
              : "stopped"
          }`}
        >
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Trạng thái kết nối",
      dataIndex: "statusConnect",
      key: "statusConnect",
      render: (text: string) => (
        <div
          className={`status ${
            text.toUpperCase() === "Kết nối".toUpperCase()
              ? "active"
              : "stopped"
          }`}
        >
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Dịch vụ sử dụng",
      dataIndex: "serviceUse",
      key: "serviceUse",
      render: (text: string) => (
        <div className="col-service_LDevice">
          <p className="content-service_LDevice">{text}</p>
          <Tippy
            placement="bottom"
            offset={[0, 0]}
            render={(attrs) => (
              <div className="view-more_LDevice" tabIndex={-1} {...attrs}>
                {text}
              </div>
            )}
            trigger={"click"}
          >
            <button className="btn-link_LDevice">Xem thêm</button>
          </Tippy>
        </div>
      ),
    },
    {
      render: (record: IDevice) => (
        <Link
          to={config.routes.detailDevice}
          onClick={() => {
            dispatch(deviceSlice.actions.setDetailDevice(record));
            dispatch(
              PathSlice.actions.appendPath({
                name: "Chi tiết thiết bị",
                link: "",
              })
            );
          }}
          className="btn-link_LDevice"
        >
          Chi tiết
        </Link>
      ),
    },
    {
      render: (record: IDevice) => (
        <Link
          onClick={() => {
            dispatch(deviceSlice.actions.setDetailDevice(record));
            dispatch(
              PathSlice.actions.appendPath({
                name: "Cập nhật thiết bị",
                link: "",
              })
            );
          }}
          to={config.routes.updateDevice}
          className="btn-link_LDevice"
        >
          Cập nhật
        </Link>
      ),
    },
  ]);

  useEffect(() => {
    onSnapshot(collection(db, "devices"), (snapshot) => {
      let data: IDevice[] = [];
      snapshot.docs.map((doc) => {
        return {
          _id: doc.id,
          key: doc.id,
          ...doc.data(),
        } as IDevice;
      });
      setDataSource(
        data.sort((a, b) => a.deviceName.localeCompare(b.deviceName))
      );
    });
    dispatch(fetchAllDevice());
  }, [dispatch]);

  useEffect(() => {
    if (active === "Tất cả" && connect === "Tất cả") {
      const filteredDevices = searchDevice
        ? devices.filter((item: IDevice) =>
            item.deviceName.toLowerCase().includes(searchDevice.toLowerCase())
          )
        : devices;

      setDataSource(filteredDevices);
      return;
    }

    if (active !== "Tất cả" && connect === "Tất cả") {
      setDataSource(
        devices.filter((item: IDevice) => item.statusActive === active)
      );
      return;
    }
    if (active === "Tất cả" && connect !== "Tất cả") {
      setDataSource(
        devices.filter((item: IDevice) => item.statusConnect === connect)
      );
      return;
    }
    setDataSource(
      devices.filter(
        (item: IDevice) =>
          item.statusActive === active && item.statusConnect === connect
      )
    );
  }, [active, connect, devices,searchDevice]);

  return (
    <div className="wrapper_LDevice">
      <h1 className="heading_LDevice">Danh sách thiết bị</h1>
      <div className="filter_LDevice">
        <div className="dropdown-wrap_LDevice">
          <div className="dropdown_LDevice">
            <span className="title_LDevice">Trạng thái hoạt động</span>
            <Dropdown
              options={statusActive}
              onChange={(value) => setActive(String(value))}
            />
          </div>
          <div className="dropdown_LDevice">
            <span className="title_LDevice">Trạng thái kết nối</span>
            <Dropdown
              options={statusConnect}
              onChange={(value) => setConnect(String(value))}
            />
          </div>
        </div>
        <div className="search-wrap_LDevice">
          <span className="title_LDevice">Từ khoá</span>
          <Search
            placeholder="Nhập từ khóa"
            value={searchDevice}
            onChange={(e) => setSearchDevice(e.target.value)}
          />
        </div>
      </div>
      <div className="wrap-table_LDevice">
        <Table columns={columns} rows={dataSource} loading={loading} />
        <Link
          to={config.routes.addDevice}
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Thêm thiết bị",
                Link: config.routes.addDevice,
              })
            )
          }
          className="wrap-btn_LDevice"
        >
          <img src={AddSquare} alt="" />
          <span>Thêm thiết bị</span>
        </Link>
      </div>
    </div>
  );
}

export default ListDevice;
