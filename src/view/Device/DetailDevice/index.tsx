import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { deviceSelectors } from "../../../redux/selectors";
import { useAppDispatch } from "../../../redux/store";
import { EditSquare } from "../../../components/icons";
import config from "../../../config";
import PathSlice from "../../../redux/slices/PathSlice";
import "./DetailDevice.css";

function DetailDevice() {
  const { detailDevice } = useSelector(deviceSelectors);
  const dispatch = useAppDispatch();
  return (
    <div className="wrapper_detailD">
      <h1 className="heading_detailD">Quản lý thiết bị</h1>
      <div className="wrap-content_detailD">
        <h2 className="sub-heading_detailD">Thông tin thiết bị</h2>
        <div className="wrap-info_detailD">
          <div className="info_detailD">
            <span className="title_detailD">Mã thiết bị:</span>
            <span>{detailDevice.deviceCode}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Loại thiết bị:</span>
            <span>{detailDevice.deviceType}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Tên thiết bị:</span>
            <span>{detailDevice.deviceName}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Tên đăng nhập:</span>
            <span>{detailDevice.userName}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Địa chỉ IP:</span>
            <span>{detailDevice.ipAddress}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Mật khẩu:</span>
            <span>{detailDevice.password}</span>
          </div>
          <div className="info_detailD">
            <span className="title_detailD">Dịch vụ sử dụng:</span>
            <p>{detailDevice.serviceUse}</p>
          </div>
        </div>
        <Link
          onClick={() =>
            dispatch(
              PathSlice.actions.appendPath({
                name: "Cập nhật thiết bị",
                link: "",
              })
            )
          }
          to={config.routes.updateDevice}
          className="wrap-btn_detailD"
        >
          <EditSquare />
          <span>Cập nhật thiết bị</span>
        </Link>
      </div>
    </div>
  );
}

export default DetailDevice;
