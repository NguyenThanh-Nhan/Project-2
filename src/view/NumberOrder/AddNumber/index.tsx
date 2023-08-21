import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Modal } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  numericalSelectors,
  serviceSelectors,
  useAppDispatch,
  userSelectors,
} from "../../../redux";
import "./AddNumber.css";
import { IDropdown } from "../../../interfaces";
import { fetchAllService } from "../../../redux/slices/ServiceSlice";
import PathSlice from "../../../redux/slices/PathSlice";
import {
  addNumerical,
  fetchSTTById,
  increaseSTT,
} from "../../../redux/slices/NumberSlice";
import {
  convertStringToTimestamp,
  convertTimeToString,
  findTheNextDays,
  formatNumber,
} from "../../../utils/utils";
import MessageNotify from "../../../components/Message";
import Dropdown from "../../../components/Dropdown";
import { CloseIcon } from "../../../components/icons";

const _EXPIRED: number = 1;
const resource = ["Kiosk", "Hệ thống"];

function AddNumber() {
  const { loading } = useSelector(numericalSelectors);
  const { services } = useSelector(serviceSelectors);
  const { currentUser } = useSelector(userSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [valueSelected, setValueSelected] = useState<any>(null);
  const [prefix, setPrefix] = useState<any>({});
  const [stt, setStt] = useState("");

  const [serviceList, setServiceList] = useState<IDropdown[]>([
    {
      label: "Tất cả",
      value: "Tất cả",
    },
  ]);

  useEffect(() => {
    dispatch(fetchAllService());
    let data: IDropdown[] = [];
    let objTemp = {};
    services.forEach((service) => {
      data.push({
        label: service.serviceName,
        value: service.serviceName,
      });
      const obj = { [service.serviceName]: service.serviceCode };
      Object.assign(objTemp, obj);
    });
    setPrefix(objTemp);
    setServiceList(data);
  }, [services.length, dispatch, services]);

  const handleBackPage = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  const handleNumber = useCallback(async () => {
    const res = await dispatch(fetchSTTById(prefix[valueSelected]));
    if (res.payload !== undefined) {
      const formatted = formatNumber(res.payload);
      setStt(prefix[valueSelected] + formatted);
    }
  }, [dispatch, prefix, valueSelected]);

  useEffect(() => {
    handleNumber();
  }, [valueSelected, handleNumber]);

  const handlePrintNumber = async () => {
    if (!valueSelected) {
      MessageNotify("error", "Bạn chưa chọn dịch vụ!", "topRight");
      return;
    }
    const res = await dispatch(
      addNumerical({
        stt,
        serviceCode: prefix[valueSelected],
        clientName: currentUser?.displayName,
        phone: currentUser?.phone,
        email: currentUser?.email,
        service: valueSelected,
        createdAt: convertStringToTimestamp(
          convertTimeToString(moment.now(), "YYYY/MM/DD  HH:mm:ss")
        ),
        expired: convertStringToTimestamp(
          findTheNextDays(moment.now(), _EXPIRED, "days", "YYYY/MM/DD HH:mm:ss")
        ),
        status: "Đang chờ",
        resource: resource[Math.floor(Math.random() * 2)],
      })
    );
    if (res.payload) {
      dispatch(
        increaseSTT({
          id: prefix[valueSelected],
          value: Number(stt.substring(3, stt.length)) + 1,
        })
      );
      setOpen(true);
    } else MessageNotify("error", "Đã có lỗi xảy ra!", "topRight");
  };

  const handleCloseModal = () => {
    setOpen(false);
    setValueSelected(null);
  };
  return (
    <div className="wrapper_numberA">
      <h1 className="heading_numberA">Quản lý cấp số</h1>
      <div className="wrap-content_numberA">
        <h1 className="sub-heading_numberA">CẤP SỐ MỚI</h1>
        <h3 className="selected-service_numberA">
          Dịch vụ khách hàng lựa chọn
        </h3>
        <div className="dropdown-service_numberA">
          <Dropdown
            options={serviceList}
            placeholder="Chọn dịch vụ"
            value={valueSelected}
            onChange={(value) => setValueSelected(String(value))}
          />
        </div>
        <div className="wrap-button_numberA">
          <button className="btn-cancel_numberA" onClick={handleBackPage}>
            Hủy bỏ
          </button>
          <Button
            loading={loading}
            className="btn-print_numberA"
            onClick={handlePrintNumber}
          >
            In số
          </Button>
        </div>
      </div>
      <Modal
        centered
        open={open}
        closable={false}
        onCancel={handleCloseModal}
        footer={null}
        className="modal_numberA"
      >
        <div className="wrap-modal_numberA">
          <span className="closed-btn_numberA" onClick={handleCloseModal}>
            <CloseIcon />
          </span>
          <div className="body-modal_numberA">
            <h1 className="header-title_numberA">Số thứ tự được cấp</h1>
            <div className="number_numberA">{stt}</div>
            <p className="selected_numberA">
              DV: {valueSelected}
              <strong> (tại quầy số 1)</strong>
            </p>
          </div>
          <div className="footer-modal_numberA">
            <p>
              Thời gian cấp:{" "}
              <span className="grant-time_numberA">
                {convertTimeToString(moment.now())}
              </span>
            </p>
            <p>
              Hạn sử dụng:{" "}
              <span className="grant-time_numberA">
                {findTheNextDays(moment.now(), _EXPIRED)}
              </span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddNumber;
