import { Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./DetailService.css";
import {
  numericalSelectors,
  serviceSelectors,
  useAppDispatch,
} from "../../../redux";
import { INumerical } from "../../../interfaces";
import { fetchNumericalByCode } from "../../../redux/slices/NumberSlice";
import PathSlice from "../../../redux/slices/PathSlice";
import Dropdown from "../../../components/Dropdown";
import DateRangePicker from "../../../components/DateRangePicker";
import Search from "../../../components/Search";
import Table from "../../../components/Table";
import config from "../../../config/routes";
import { BackSquareIcon, EditSquare } from "../../../assect/img/1index";

interface DataType {
  key: string;
  stt: string;
  status: string;
  detail: string;
  update: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: "Số thứ tự",
    dataIndex: "stt",
    key: "stt",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <div
        className={`status ${
          text.toUpperCase() === "Đã hoàn thành" ? "active" : "waiting"
        }`}
      >
        <span>{text}</span>
      </div>
    ),
  },
];

const items = [
  {
    label: "Tất cả",
    value: "Tất cả",
  },
  {
    label: "Đã hoàn thành",
    value: "Đã hoàn thành",
  },
  {
    label: "Đã thực hiện",
    value: "Đã thực hiện",
  },
  {
    label: "Vắng",
    value: "Vắng",
  },
];

function DetailService() {
  const { detailService } = useSelector(serviceSelectors);
  const { numericalList } = useSelector(numericalSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataSource, setDataSource] = useState<INumerical[]>([]);
  const {
    serviceCode,
    serviceName,
    description,
    autoIncrement,
    prefix,
    surfix,
    reset,
  } = detailService;

  useEffect(() => {
    dispatch(fetchNumericalByCode(detailService.serviceCode));
    setDataSource(numericalList);
  }, [detailService.serviceCode, dispatch, numericalList]);

  const handleBackPage = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  return (
    <div className="wrapper_serviceD">
      <h1 className="heading_serviceD">Quản lý dịch vụ</h1>
      <div className="relative_serviceD">
        <div className="wrap-content_serviceD">
          <h2 className="sub-heading_serviceD">Thông tin dịch vụ</h2>
          <div className="wrap-info_serviceD">
            <span className="title_serviceD">Mã dịch vụ:</span>
            <span>{serviceCode}</span>
          </div>
          <div className="wrap-info_serviceD">
            <span className="title_serviceD">Tên dịch vụ:</span>
            <span>{serviceName}</span>
          </div>
          <div className="wrap-info_serviceD">
            <span className="title_serviceD">Mô tả:</span>
            <span>{description}</span>
          </div>
          <div className="setting-role_serviceD">
            <h2 className="sub-heading_serviceD">Quy tắc cấp số</h2>
            <div className="auto-increase_serviceD">
              <span className="check-box_serviceD">Tăng tự động từ:</span>
              {autoIncrement?.checked ? (
                <>
                  <Input
                    readOnly
                    type="number"
                    className="number-box_serviceD"
                    value={autoIncrement?.from}
                  />
                  <span>đến</span>
                  <Input
                    readOnly
                    type="number"
                    className="number-box_serviceD"
                    value={autoIncrement?.to}
                  />
                </>
              ) : (
                "Không"
              )}
            </div>
            <div className="wrap-check-box_serviceD">
              <span className="check-box_serviceD">Prefix:</span>
              {prefix?.checked ? (
                <Input
                  readOnly
                  type="number"
                  className="number-box_serviceD"
                  value={prefix?.value}
                />
              ) : (
                "Không"
              )}
            </div>
            <div className="wrap-check-box_serviceD">
              <span className="check-box_serviceD">Surfix:</span>
              {surfix?.checked ? (
                <Input
                  readOnly
                  type="number"
                  className="number-box_serviceD"
                  value={surfix?.value}
                />
              ) : (
                "Không"
              )}
            </div>
            <div className="wrap-check-box_serviceD">
              <span className="check-box_serviceD">
                Reset mỗi ngày: {reset ? "Có" : "Không"}
              </span>
            </div>
            <span>{"Ví dụ: 201-2001"}</span>
          </div>
        </div>
        <div className="wrap-table_serviceD">
          <div className="filter_serviceD">
            <div className="dropdown-status_serviceD">
              <span className="title_serviceD">Trạng thái</span>
              <Dropdown options={items} />
            </div>
            <div className="date-picker_serviceD">
              <span className="title_serviceD">Chọn thời gian</span>
              <DateRangePicker />
            </div>
            <div className="search_serviceD">
              <span className="title_serviceD">Từ khoá</span>
              <Search />
            </div>
          </div>
          <Table columns={columns} rows={dataSource} pageSize={8} />
        </div>
        <div className="wrap-btn_serviceD">
          <Link
            onClick={() =>
              dispatch(
                PathSlice.actions.appendPath({
                  name: "Cập nhật",
                  link: "",
                })
              )
            }
            to={config.routes.updateService}
            className="update-btn_serviceD"
          >
            <img src={EditSquare} alt="" />
            <span>Cập nhật danh sách</span>
          </Link>
          <span onClick={handleBackPage} className="back-btn_serviceD">
            <img src={BackSquareIcon} alt="" />
            <span>Quay lại</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DetailService;
