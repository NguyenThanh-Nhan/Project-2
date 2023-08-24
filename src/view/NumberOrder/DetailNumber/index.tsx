import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { numericalSelectors } from "../../../redux";
import "./DetailNumber.css"
import { BackSquareIcon } from "../../../assect/img/1index";

function DetailNumber() {
  const { detailNumerical } = useSelector(numericalSelectors);
  const navigate = useNavigate();

  return (
    <div className="wrapper_detailD">
      <h1 className="heading_detailD">Quản lý cấp số</h1>
      <div className="wrap_detailD">
        <div className="wrap-content_detailD">
          <h1 className="sub-heading_detailD">Thông tin cấp số</h1>
          <div className="content_detailD">
            <div className="group_dteailD">
              <span className="title_detailD">Họ tên:</span>
              <span className="info_detailD">
                {detailNumerical?.clientName}
              </span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Nguồn cấp:</span>
              <span className="info_detailD">{detailNumerical?.resource}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Tên dịch vụ:</span>
              <span className="info_detailD">{detailNumerical?.service}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Trạng thái:</span>
              <span className="info_detailD">{detailNumerical?.status}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Số thứ tự:</span>
              <span className="info_detailD">{detailNumerical?.stt}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Số điện thoại:</span>
              <span className="info_detailD">{detailNumerical?.phone}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Thời gian cấp:</span>
              <span className="info_detailD">
                {moment(detailNumerical?.createdAt?.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                )}
              </span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Địa chỉ Email:</span>
              <span className="info_detailD">{detailNumerical?.email}</span>
            </div>
            <div className="group_dteailD">
              <span className="title_detailD">Hạn sử dụng:</span>
              <span className="info_detailD">
                {moment(detailNumerical?.expired?.toDate()).format(
                  "HH:mm - DD/MM/YYYY"
                )}
              </span>
            </div>
          </div>
        </div>
        <span onClick={() => navigate(-1)} className="back-btn_detailD">
          <img src={BackSquareIcon} alt="" />
          <span>Quay lại</span>
        </span>
      </div>
    </div>
  );
}

export default DetailNumber;
