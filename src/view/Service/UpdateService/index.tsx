import { Input, Checkbox, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { serviceSelectors, useAppDispatch } from "../../../redux";
import PathSlice from "../../../redux/slices/PathSlice";
import "./UpdateService.css";
import MessageNotify from "../../../components/Message";
import { updateService } from "../../../redux/slices/ServiceSlice";
import { CheckboxChangeEvent } from "antd/lib/checkbox";

function UpdateService() {
  const { loading, detailService } = useSelector(serviceSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState(detailService);
  const {
    serviceCode,
    serviceName,
    description,
    autoIncrement,
    prefix,
    surfix,
    reset,
  } = state;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    payload: string
  ) => {
    const copyState: any = { ...state };
    copyState[payload] = e.target.value;
    setState(copyState);
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

  const handleBackPage = () => {
    dispatch(PathSlice.actions.back());
    navigate("/service-list");
  };

  const handleUpdate = async () => {
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
    const res = await dispatch(
      updateService({ id: detailService._id, payload: state })
    );
    if (res.payload) {
      MessageNotify("success", "Đã cập nhật dịch vụ!", "topRight");
      handleBackPage();
    } else MessageNotify("error", "Đã có lỗi xảy ra!", "topRight");
  };

  return (
    <div className="wrapper_serviceU">
      <h1 className="heading_serviceU">Quản lý dịch vụ</h1>
      <div className="wrap-content_serviceU">
        <h2 className="sub-heading_serviceU">Thông tin dịch vụ</h2>
        <div className="wrap-text-box_serviceU">
          <div className="text-box-item_serviceU">
            <div>
              <span className="title_serviceU">
                Mã dịch vụ:
                <span className="required_serviceU">*</span>
              </span>
              <Input
                placeholder="Nhập vào mã dịch vụ"
                spellCheck={false}
                value={serviceCode}
                onChange={(e) => handleOnChange(e, "serviceCode")}
              />
            </div>
            <div>
              <span className="title_serviceU">
                Tên dịch vụ:
                <span className="required_serviceU">*</span>
              </span>
              <Input
                placeholder="Nhập vào tên dịch vụ"
                spellCheck={false}
                value={serviceName}
                onChange={(e) => handleOnChange(e, "serviceName")}
              />
            </div>
          </div>
          <div className="text-box-item_serviceU">
            <span className="title_serviceU">Mô tả:</span>
            <Input.TextArea
              placeholder="Mô tả dịch vụ"
              className="desc-box_serviceU"
              spellCheck={false}
              value={description}
              onChange={(e) => handleOnChange(e, "description")}
            />
          </div>
        </div>
        <div className="setting-role_serviceU">
          <h2 className="sub-heading_serviceU">Quy tắc cấp số</h2>
          <div className="auto-increase_serviceU">
            <Checkbox
              className="check-box_serviceU"
              checked={autoIncrement?.checked}
              onChange={(e) => handleChecked(e, "autoIncrement")}
            >
              Tăng tự động từ:
            </Checkbox>
            <Input
              type="number"
              className="number-box_serviceU"
              value={autoIncrement?.from}
              onChange={(e) => handleChangeInputAutoIncrement(e, "from")}
            />
            <span>đến</span>
            <Input
              type="number"
              className="number-box_serviceU"
              value={autoIncrement?.to}
              onChange={(e) => handleChangeInputAutoIncrement(e, "to")}
            />
          </div>
          <div className="wrap-check-box_serviceU">
            <Checkbox
              className="check-box_serviceU"
              checked={prefix?.checked}
              onChange={(e) => handleChecked(e, "prefix")}
            >
              Prefix:
            </Checkbox>
            <Input
              type="number"
              className="number-box_serviceU"
              value={prefix?.value}
              onChange={(e) => handleChangeInputRule(e, "prefix")}
            />
          </div>
          <div className="wrap-check-box_serviceU">
            <Checkbox
              className="check-box_serviceU"
              checked={surfix?.checked}
              onChange={(e) => handleChecked(e, "surfix")}
            >
              Surfix:
            </Checkbox>
            <Input
              type="number"
              className="number-box_serviceU"
              value={surfix?.value}
              onChange={(e) => handleChangeInputRule(e, "surfix")}
            />
          </div>
          <div className="wrap-check-box_serviceU">
            <Checkbox
              className="check-box_serviceU"
              checked={reset}
              onChange={(e) => handleChecked(e, "reset")}
            >
              Reset mỗi ngày
            </Checkbox>
          </div>
        </div>
        <div className="note_serviceU">
          <span className="required_serviceU">*</span>
          <span className="text_serviceU">Là trường thông tin bắt buộc</span>
        </div>
      </div>
      <div className="wrap-button_serviceU">
        <button onClick={handleBackPage} className="btn-cancel_serviceU">
          Hủy bỏ
        </button>
        <Button
          onClick={handleUpdate}
          className="btn-add_serviceU"
          loading={loading}
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default UpdateService;
