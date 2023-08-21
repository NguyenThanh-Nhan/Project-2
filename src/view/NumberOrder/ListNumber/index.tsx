import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  numericalSelectors,
  serviceSelectors,
  useAppDispatch,
} from "../../../redux";
import { INumerical } from "../../../interfaces";
import config from "../../../config/routes";
import { db } from "../../../firebase";
import NumberSlice, {
  fetchAllNumerical,
} from "../../../redux/slices/NumberSlice";
import "./ListNumber.css"
import { fetchAllService } from "../../../redux/slices/ServiceSlice";
import PathSlice from "../../../redux/slices/PathSlice";
import Dropdown from "../../../components/Dropdown";
import DateRangePicker from "../../../components/DateRangePicker";
import Search from "../../../components/Search";
import Table from "../../../components/Table";
import { AddSquare } from "../../../components/icons";

type OptionType = {
  label: string;
  value: string;
};

const resources = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Kiosk",
    value: "Kiosk",
  },
  {
    label: "Hệ thống",
    value: "Hệ thống",
  },
];

const statuses = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Đang chờ",
    value: "Đang chờ",
  },
  {
    label: "Đã sử dụng",
    value: "Đã sử dụng",
  },
  {
    label: "Bỏ qua",
    value: "Bỏ qua",
  },
];

function Number() {
  const { services } = useSelector(serviceSelectors);
  const { numericalList } = useSelector(numericalSelectors);
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<INumerical[]>([]);
  const [stateDropdown, setStateDropdown] = useState({
    selectedService: "Tất cả",
    selectedStatus: "Tất cả",
    selectedResource: "Tất cả",
  });

  const [serviceList, setServiceList] = useState([
    {
      label: "Tất cả",
      value: "Tất cả",
    },
  ]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "clientName",
      key: "clientName",
    },
    {
      title: "Tên dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Thời gian cấp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (time: Timestamp) => (
        <span>{moment(time.toDate()).format("HH:mm - DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Hạn sử dụng",
      dataIndex: "expired",
      key: "expired",
      render: (time: Timestamp) => (
        <span>{moment(time.toDate()).format("HH:mm - DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        let classes = "status";
        switch (text) {
          case "Đang chờ":
            classes = "status waiting";
            break;
          case "Đã sử dụng":
            classes = "status used";
            break;
          case "Bỏ qua":
            classes = "status stopped";
            break;
        }
        return <div className={classes}>{text}</div>;
      },
    },
    {
      title: "Nguồn cấp",
      dataIndex: "resource",
      key: "resource",
    },
    {
      render: (record: INumerical) => (
        <Link
          onClick={() => handleClickDetail(record)}
          to={config.routes.detailNumber}
          className={"btn-link"}
        >
          Chi tiết
        </Link>
      ),
    },
  ];
  const { selectedService, selectedStatus, selectedResource } = stateDropdown;

  useEffect(() => {
    onSnapshot(collection(db, "numerical"), (snapshot) => {
      let data: INumerical[] = [];
      snapshot.docs.map((doc) => {
        return data.push({
          _id: doc.id,
          key: doc.id,
          ...doc.data(),
        } as INumerical);
      });
      setDataSource(data.sort((a, b) => a.stt.localeCompare(b.stt)));
    });
    dispatch(fetchAllNumerical());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllService());
    let data: OptionType[] = [];
    services.forEach((service) =>
      data.push({
        label: service.serviceName,
        value: service.serviceName,
      })
    );
    setServiceList([
      {
        label: "Tất cả",
        value: "Tất cả",
      },
      ...data,
    ]);
  }, [services.length, dispatch, services]);

  useEffect(() => {
    const all = "Tất cả";
    const service = selectedService === all ? "" : selectedService;
    const status = selectedStatus === all ? "" : selectedStatus;
    const resource = selectedResource === all ? "" : selectedResource;
    setDataSource(
      numericalList.filter(
        (item) =>
          item.service.includes(service) &&
          item.status.includes(status) &&
          item.resource.includes(resource)
      )
    );
  }, [selectedService, selectedStatus, selectedResource, numericalList]);

  const handleClickDetail = (record: INumerical) => {
    dispatch(NumberSlice.actions.setDetailNumerical(record));
    dispatch(
      PathSlice.actions.appendPath({
        name: "Chi tiết",
        link: "",
      })
    );
  };

  const handleSelect = (
    value: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const copyState: any = { ...stateDropdown };
    copyState[key] = String(value);
    setStateDropdown(copyState);
  };

  

  return (
    <div className="wrapper_numberL">
      <h1 className="heading_numberL">Quản lý cấp số</h1>
      <div className="filter_numberL">
        <div className="filter-item_numberL">
          <span className="title_numberL">Tên dịch vụ</span>
          <Dropdown
            options={serviceList}
            onChange={(value) => handleSelect(value, "selectedService")}
          />
        </div>
        <div className="filter-item_numberL">
          <span className="title_numberL">Tình trạng</span>
          <Dropdown
            options={statuses}
            onChange={(value) => handleSelect(value, "selectedStatus")}
          />
        </div>
        <div className="filter-item_numberL">
          <span className="title_numberL">Nguồn cấp</span>
          <Dropdown
            options={resources}
            onChange={(value) => handleSelect(value, "selectedResource")}
          />
        </div>
        <div className="select-time__numberL">
          <span className="title_numberL">Chọn thời gian</span>
          <DateRangePicker />
        </div>
        <div className="search-box_numberL">
          <span className="title_numberL">Từ khóa</span>
          <Search placeholder="Nhập từ khóa" />
        </div>
      </div>
      <div className="wrap-table_numberL">
        <Table columns={columns} rows={dataSource} />
        <Link
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Cấp số mới",
                link: "",
              })
            )
          }
          to={config.routes.addNumber}
          className="btn-new_numberL"
        >
          <AddSquare />
          <span>
            Cấp <br /> số mới
          </span>
        </Link>
      </div>
    </div>
  );
}

export default Number;
