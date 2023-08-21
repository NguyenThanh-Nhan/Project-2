import { Input, Checkbox, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { useSelector } from "react-redux";
import { serviceSelectors, useAppDispatch } from "../../../redux";
import { useState } from "react";
import "./AddService.css";
import PathSlice from "../../../redux/slices/PathSlice";
import MessageNotify from "../../../components/Message";
import {
  addService,
  checkServiceCode,
} from "../../../redux/slices/ServiceSlice";
import { IService } from "../../../interfaces";
import { initializeSTT } from "../../../redux/slices/NumberSlice";

function AddService() {
  const { loading } = useSelector(serviceSelectors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    serviceCode: "",
    serviceName: "",
    description: "",
    autoIncrement: {
      checked: false,
      from: "0001",
      to: "9999",
    },
    prefix: {
      checked: false,
      value: "0001",
    },
    surfix: {
      checked: false,
      value: "0001",
    },
    reset: false,
    status: "Hoạt động",
  });

  const {
    serviceCode,
    serviceName,
    description,
    autoIncrement: { from, to },
    prefix,
    surfix,
    reset,
  } = state;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const copyState: any = { ...state };
    copyState[key] = e.target.value;
    setState(copyState);
  };

  const handleBack = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  const handleChecked = (
    e: CheckboxChangeEvent,
    key: "autoIncrement" | "prefix" | "surfix" | "reset"
  ) => {
    const copyState: any = { ...state };
    if (key === "reset") copyState[key] = e.target.checked;
    else copyState[key].checked = e.target.checked;
    setState(copyState);
  };

  const handleChangeInputRule = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "autoIncrement" | "prefix" | "surfix"
  ) => {
    const copyState: any = { ...state };
    copyState[key].value = e.target.value;
    setState(copyState);
  };
  const handleChangeInputAutoIncrement = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "from" | "to"
  ) => {
    const copyState: any = { ...state.autoIncrement };
    copyState[key] = e.target.value;
    setState({
      ...state,
      autoIncrement: copyState,
    });
  };

  const handleAddService = async () => {
    if (!serviceCode || !serviceName) {
      MessageNotify(
        "error",
        <p>
          Các trường có dấu <span className="required">*</span> không được bỏ
          trống!
        </p>,
        "topRight"
      );
      return;
    }
    const response = await dispatch(checkServiceCode(serviceCode));
    if (!response.payload) {
      const res = await dispatch(addService(state as IService));
      if (res.payload) {
        MessageNotify("success", "Đã thêm dịch vụ!", "topRight");
        handleBack();
        dispatch(initializeSTT(serviceCode));
      }
    } else MessageNotify("error", "Mã dịch vụ đã tồn tại!", "topRight");
  };

  return (
    <div className="wrapper_serviceA">
      <h1 className="heading_serviceA">Quản lý dịch vụ</h1>
      <div className="wrap-content_serviceA">
        <h2 className="sub-heading_serviceA">Thông tin dịch vụ</h2>
        <div className="wrap-text-box_serviceA">
          <div className="text-box-item_serviceA">
            <div>
              <span className="title_serviceA">
                Mã dịch vụ:
                <span className="required_serviceA">*</span>
              </span>
              <Input
                spellCheck={false}
                placeholder="Nhập vào mã dịch vụ"
                value={serviceCode}
                onChange={(e) => handleOnChange(e, "serviceCode")}
              />
            </div>
            <div>
              <span className="title_serviceA">
                Tên dịch vụ:
                <span className="required_serviceA">*</span>
              </span>
              <Input
                spellCheck={false}
                placeholder="Nhập vào tên dịch vụ"
                value={serviceName}
                onChange={(e) => handleOnChange(e, "serviceName")}
              />
            </div>
          </div>
          <div className="text-box-item_serviceA">
            <span className="title_serviceA">Mô tả:</span>
            <Input.TextArea
              spellCheck={false}
              placeholder="Mô tả dịch vụ"
              className="desc-box_serviceA"
              value={description}
              onChange={(e) => handleOnChange(e, "description")}
            />
          </div>
        </div>
        <div className="setting-role_serviceA">
          <h2 className="sub-heading_serviceA">Quy tắc cấp số</h2>
          <div className="auto-increase_serviceA">
            <Checkbox
              className="check-box"
              checked={state.autoIncrement.checked}
              onChange={(e) => handleChecked(e, "autoIncrement")}
            >
              Tăng tự động từ:
            </Checkbox>
            <Input
              type="number_serviceA"
              className="number-box_serviceA"
              value={from}
              onChange={(e) => handleChangeInputAutoIncrement(e, "from")}
            />
            <span>đến</span>
            <Input
              type="number_serviceA"
              className="number-box_serviceA"
              value={to}
              onChange={(e) => handleChangeInputAutoIncrement(e, "to")}
            />
          </div>
          <div className="wrap-check-box_serviceA">
            <Checkbox
              className="check-box_serviceA"
              checked={prefix.checked}
              onChange={(e) => handleChecked(e, "prefix")}
            >
              Prefix:
            </Checkbox>
            <Input
              type="number_serviceA"
              className="number-box_serviceA"
              value={prefix.value}
              onChange={(e) => handleChangeInputRule(e, "prefix")}
            />
          </div>
          <div className="wrap-check-box_serviceA">
            <Checkbox
              checked={surfix.checked}
              onChange={(e) => handleChecked(e, "surfix")}
              className="check-box_serviceA"
            >
              Surfix:
            </Checkbox>
            <Input
              type="number_serviceA"
              className="number-box_serviceA"
              value={surfix.value}
              onChange={(e) => handleChangeInputRule(e, "surfix")}
            />
          </div>
          <div className="wrap-check-box_serviceA">
            <Checkbox
              className="check-box_serviceA"
              checked={reset}
              onChange={(e) => handleChecked(e, "reset")}
            >
              Reset mỗi ngày
            </Checkbox>
          </div>
        </div>
        <div className="note_serviceA">
          <span className="required_serviceA">*</span>
          <span className="text_serviceA">Là trường thông tin bắt buộc</span>
        </div>
      </div>
      <div className="wrap-button_serviceA">
        <button onClick={handleBack} className="btn-cancel_serviceA">
          Hủy bỏ
        </button>
        <Button
          onClick={handleAddService}
          className="btn-add_serviceA"
          loading={loading}
        >
          Thêm dịch vụ
        </Button>
      </div>
    </div>
  );
}

export default AddService;
