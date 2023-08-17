import { useNavigate } from "react-router-dom";
import { Input, notification } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import PathSlice from "../../../redux/slices/PathSlice";
import { addDevice } from "../../../redux/slices/DeviceSlice";
import { IDevice } from "../../../interfaces";
import Dropdown from "../../../components/Dropdown";
import "./AddDevice.css"

const items = [
  {
    label: "Kiosk",
    value: "Kiosk",
  },
  {
    label: "Display counter",
    value: "Display counter",
  },
];

const options = [
  { label: "Khám tim mạch", value: "Khám tim mạch" },
  { label: "Khám sản phụ khoa", value: "Khám sản phụ khoa" },
  { label: "Khám răng hàm mặt", value: "Khám răng hàm mặt" },
  { label: "Khám tai mũi họng", value: "Khám tai mũi họng" },
  { label: "Khám hô hấp", value: "Khám hô hấp" },
  { label: "Khám tổng quát", value: "Khám tổng quát" },
];

function AddDevice() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    deviceCode: "",
    deviceName: "",
    deviceType: "",
    userName: "",
    password: "",
    ipAddress: "",
    serviceUse: "",
    statusActive: "Hoạt động",
    statusConnect: "Kết nối",
  });
  const {
    deviceCode,
    deviceName,
    deviceType,
    userName,
    password,
    ipAddress,
    serviceUse,
  } = state;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    payload: string
  ) => {
    const copyState: any = { ...state };
    copyState[payload] = e.target.value;
    setState(copyState);
  };

  const handleSelect = (value: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      deviceType: String(value),
    });
  };

  const handleSelectService = (value: React.ChangeEvent<HTMLInputElement>) => {
    const _detailA = value.toString().replaceAll(",", ", ");
    setState({
      ...state,
      serviceUse: _detailA,
    });
  };

  const handleBack = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };
  const handleAddDevice = async () => {
    if (
      !deviceCode ||
      !deviceName ||
      !deviceType ||
      !userName ||
      !password ||
      !ipAddress ||
      !serviceUse
    ) {
      notification.error({
        message: (
          <p>
            Các trường dấu <span className="required_detailA">*</span> là trường thông
            tin bắt buộc
          </p>
        ),
        placement: "topRight",
      });
      return;
    }

    const res = await dispatch(addDevice(state as IDevice));
    if (res.payload) {
      notification.success({
        message: "Đã thêm thiết bị!",
        placement: "topRight",
      });
      handleBack();
    }
  };
  return (
    <div className="wrapper_detailA">
      <h1 className="heading_detailA">Quản lý thiết bị</h1>
      <div className="wrap-content_detailA">
        <h2 className="sub-heading_detailA">Thông tin thiết bị</h2>
        <div className="wrap-info_detailA">
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Mã thiết bị:</span>
              <span className="required_detailA">*</span>
            </div>
            <Input
              placeholder="Nhập mã thiết bị"
              value={deviceCode}
              onChange={(e) => handleOnChange(e, "deviceCode")}
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Loại thiết bị:</span>
              <span className="required_detailA">*</span>
            </div>
            <Dropdown
              onChange={(value) => handleSelect(value)}
              options={items}
              placeholder="Chọn loại thiết bị"
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Tên thiết bị:</span>
              <span className="required_detailA">*</span>
            </div>
            <Input
              placeholder="Nhập tên thiết bị"
              value={deviceName}
              onChange={(e) => handleOnChange(e, "deviceName")}
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Tên đăng nhập:</span>
              <span className="required_detailA">*</span>
            </div>
            <Input
              placeholder="Nhập tài khoản"
              value={userName}
              onChange={(e) => handleOnChange(e, "userName")}
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Địa chỉ IP:</span>
              <span className="required_detailA">*</span>
            </div>
            <Input
              placeholder="Nhập địa chỉ IP"
              value={ipAddress}
              onChange={(e) => handleOnChange(e, "ipAddress")}
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Mật khẩu:</span>
              <span className="required_detailA">*</span>
            </div>
            <Input.Password
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => handleOnChange(e, "password")}
            />
          </div>
          <div className="info_detailA">
            <div className="title_detailA">
              <span>Dịch vụ sử dụng:</span>
              <span className="required_detailA">*</span>
            </div>
            <Dropdown
              className="select-services_detailA"
              mode="multiple"
              placeholder="Chọn dịch vụ"
              options={options}
              onChange={(value) => handleSelectService(value)}
            />
          </div>
        </div>
        <div className="note_detailA">
          <span className="required_detailA">*</span>
          <span className="text_detailA">Là trường thông tin bắt buộc</span>
        </div>
      </div>
      <div className="wrap-button_detailA">
        <button onClick={handleBack} className="btn-cancel_detailA">
          Hủy bỏ
        </button>
        <button onClick={handleAddDevice} className="btn-add_detailA">
          Thêm thiết bị
        </button>
      </div>
    </div>
  );
}

export default AddDevice;
