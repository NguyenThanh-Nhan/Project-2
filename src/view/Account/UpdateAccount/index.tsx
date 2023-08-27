import { Button, Input, notification } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UpdateAccount.css";
import { IUser } from "../../../interfaces";
import { useAppDispatch, userSelectors } from "../../../redux";
import { updateUser } from "../../../redux/slices/UserSlice";
import PathSlice from "../../../redux/slices/PathSlice";
import Dropdown from "../../../components/Dropdown";

const roles = [
  {
    label: "Kế toán",
    value: "Kế toán",
  },
  {
    label: "Quản lý",
    value: "Quản lý",
  },
  {
    label: "Admin",
    value: "Admin",
  },
];
const statuses = [
  {
    label: "Hoạt động",
    value: "Hoạt động",
  },
  {
    label: "Ngừng hoạt động",
    value: "Ngừng hoạt động",
  },
];

interface IUserUpdateProps extends IUser {
  confirmPass?: string;
}

function UpdateAccount() {
  const dispatch = useAppDispatch();
  const { loading, userUpdate } = useSelector(userSelectors);
  const [state, setState] = useState<IUserUpdateProps>(
    userUpdate as IUserUpdateProps
  );
  const { userName, displayName, password, email, phone, role, status } = state;
  const [confirmPass, setConfirmPass] = useState(password);
  const navigate = useNavigate();
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    payload: string
  ) => {
    const copyState: any = { ...state };
    copyState[payload] = e.target.value;
    setState(copyState);
  };
  const handleSelect = (
    value: React.ChangeEvent<HTMLInputElement>,
    payload: string
  ) => {
    const copyState: any = { ...state };
    copyState[payload] = value;
    setState(copyState);
  };

  const handleUpdate = async () => {
    if (
      !displayName ||
      !userName ||
      !phone ||
      !password ||
      !confirmPass ||
      !email ||
      !role ||
      !status
    ) {
      notification.error({
        message: (
          <div>
            Các trường có dấu <span className="required_accountU">*</span> là
            bắt buộc!
          </div>
        ),
        placement: "topLeft",
      });
      return;
    }

    if (password !== confirmPass) {
      notification.error({
        message: "Mật khẩu nhập lại không chính xác!",
        placement: "topLeft",
      });
      return;
    }
    const payload = {
      userName,
      displayName,
      password,
      email,
      phone,
      role,
      status,
    };
    await dispatch(updateUser({ id: userUpdate._id, payload }));
    notification.success({
      message: "Cập nhật tài khoản thành công!",
      placement: "topRight",
    });
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  const handleBack = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  return (
    <div className="wrapper_accountU">
      <h1 className="heading_accountU">Quản lý tài khoản</h1>
      <div className="wrap_accountU">
        <h2 className="sub-heading_accountU">Thông tin tài khoản</h2>
        <div className="wrap-content_accountU">
          <div>
            <p className="title_accountU">
              Họ tên <span className="required_accountU">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập họ tên"
              value={displayName}
              onChange={(e) => handleChangeInput(e, "displayName")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Tên đăng nhập <span className="required_accountU">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập tên đăng nhập"
              value={userName}
              onChange={(e) => handleChangeInput(e, "userName")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Số điện thoại <span className="required_accountU">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập số điện thoại"
              maxLength={11}
              type="number"
              value={phone}
              onChange={(e) => handleChangeInput(e, "phone")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Mật khẩu <span className="required_accountU">*</span>
            </p>
            <Input.Password
              spellCheck={false}
              className="input-password_accountU"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => handleChangeInput(e, "password")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Email <span className="required_accountU">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập email"
              value={email}
              onChange={(e) => handleChangeInput(e, "email")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Nhập lại mật khẩu <span className="required_accountU">*</span>
            </p>
            <Input.Password
              spellCheck={false}
              className="input-password_accountU"
              placeholder="Nhập lại mật khẩu"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <div>
            <p className="title_accountU">
              Vai trò <span className="required_accountU">*</span>
            </p>
            <Dropdown
              options={roles}
              placeholder="Chọn vai trò"
              value={role}
              onChange={(value) => handleSelect(value, "role")}
            />
          </div>
          <div>
            <p className="title_accountU">
              Tình trạng <span className="required_accountU">*</span>
            </p>
            <Dropdown
              options={statuses}
              placeholder="Chọn trạng thái"
              value={status}
              onChange={(value) => handleSelect(value, "status")}
            />
          </div>
        </div>
        <p>
          <span className="required_accountU">*</span> Là trường thông tin bắt
          buộc
        </p>
      </div>
      <div className="footer_accountU">
        <button onClick={handleBack} className="cancel-btn_accountU">
          Hủy bỏ
        </button>
        <Button
          loading={loading}
          onClick={handleUpdate}
          className="update-btn_accountU"
        >
          Cập nhật
        </Button>
      </div>
    </div>
  );
}

export default UpdateAccount;
