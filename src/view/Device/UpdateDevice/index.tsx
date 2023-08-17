import { useNavigate } from "react-router-dom";
import { Input, notification } from "antd";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { deviceSelectors } from "../../../redux/selectors";
import PathSlice from "../../../redux/slices/PathSlice";
import { updateDevice } from "../../../redux/slices/DeviceSlice";
import Dropdown from "../../../components/Dropdown";
import "./UpdateDevice.css";

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

function UpdateDevice() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { detailDevice } = useSelector(deviceSelectors);
  const [state, setState] = useState(detailDevice);
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
    const text = value.toString().replaceAll(",", ", ");
    setState({
      ...state,
      serviceUse: text,
    });
  };

  const handleBack = () => {
    dispatch(PathSlice.actions.back());
    navigate("/device-list");
  };

  const handleUpdateDevice = () => {
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
            Các trường dấu <span className="required_deviceU">*</span> là trường
            thông tin bắt buộc
          </p>
        ),
        placement: "topRight",
      });
      return;
    }

    dispatch(updateDevice({ id: detailDevice._id, payload: state }));
    notification.success({
      message: "Đã cập nhật thiết bị",
      placement: "topRight",
    });
    handleBack();
  };

  return (
    <div className="wrapper_deviceU">
      <h1 className="heading_deviceU">Quản lý thiết bị</h1>
      <div className="wrap-content_deviceU">
        <h2 className="sub-heading_deviceU">Thông tin thiết bị</h2>
        <div className="wrap-info_deviceU">
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Mã thiết bị:</span>
              <span className="required_deviceU">*</span>
            </div>
            <Input
              placeholder="Nhập mã thiết bị"
              value={deviceCode}
              onChange={(e) => handleOnChange(e, "deviceCode")}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Loại thiết bị:</span>
              <span className="required_deviceU">*</span>
            </div>
            <Dropdown
              options={items}
              placeholder="Chọn loại thiết bị"
              value={deviceType}
              onChange={(value) => handleSelect(value)}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Tên thiết bị:</span>
              <span className="required_deviceU">*</span>
            </div>
            <Input
              placeholder="Nhập tên thiết bị"
              value={deviceName}
              onChange={(e) => handleOnChange(e, "deviceName")}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Tên đăng nhập:</span>
              <span className="required_deviceU">*</span>
            </div>
            <Input
              placeholder="Nhập tên đăng nhập"
              value={userName}
              onChange={(e) => handleOnChange(e, "userName")}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Địa chỉ IP:</span>
              <span className="required">*</span>
            </div>
            <Input
              placeholder="Nhập địa chỉ IP"
              value={ipAddress}
              onChange={(e) => handleOnChange(e, "ipAddress")}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Mật khẩu:</span>
              <span className="required">*</span>
            </div>
            <Input.Password
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => handleOnChange(e, "password")}
            />
          </div>
          <div className="info_deviceU">
            <div className="title_deviceU">
              <span>Dịch vụ sử dụng:</span>
              <span className="required_deviceU">*</span>
            </div>
            <Dropdown
              className="select-services_deviceU"
              mode="multiple"
              placeholder="Chọn dịch vụ sử dụng"
              options={options}
              value={serviceUse ? serviceUse?.split(",") : []}
              onChange={(value) => handleSelectService(value)}
            />
          </div>
        </div>
        <div className="note_deviceU">
          <span className="required_deviceU">*</span>
          <span className="text_deviceU">Là trường thông tin bắt buộc</span>
        </div>
      </div>
      <div className="wrap-button_deviceU">
        <button onClick={handleBack} className="btn-cancel_deviceU">
          Hủy bỏ
        </button>
        <button onClick={handleUpdateDevice} className="btn-add_deviceU">
          Cập nhật
        </button>
      </div>
    </div>
  );
}

export default UpdateDevice;
