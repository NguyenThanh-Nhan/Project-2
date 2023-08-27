import { Button, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roleSelectors, useAppDispatch, userSelectors } from "../../../redux";
import { IDropdown, IUser } from "../../../interfaces";
import {
  fetchAllRole,
  increaseQuantityUser,
} from "../../../redux/slices/RoleSlice";
import "./AddAccount.css";
import MessageNotify from "../../../components/Message";
import { CheckEmailExists, addUser } from "../../../redux/slices/UserSlice";
import PathSlice from "../../../redux/slices/PathSlice";
import Dropdown from "../../../components/Dropdown";

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
type StateType = {
  displayName: string;
  userName: string;
  phone: string;
  password: string;
  confirmPass?: string;
  email: string;
  role: string;
  status: string;
};
function AddAccount() {
  const { loading } = useSelector(userSelectors);
  const { roles } = useSelector(roleSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [roleList, setRoleList] = useState<IDropdown[]>([]);
  const [state, setState] = useState<StateType>({
    displayName: "",
    userName: "",
    phone: "",
    password: "",
    confirmPass: "",
    email: "",
    role: "",
    status: "",
  });
  const {
    displayName,
    userName,
    phone,
    password,
    confirmPass,
    email,
    role,
    status,
  } = state;

  useEffect(() => {
    dispatch(fetchAllRole());
    let data: IDropdown[] = [];
    roles.forEach((role) => {
      data.push({
        label: role.roleName,
        value: role.roleName,
      });
    });
    setRoleList(data);
  }, [dispatch, roles, roles.length]);
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
    copyState[payload] = String(value);
    setState(copyState);
  };
  const handleAddAccount = async () => {
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
      MessageNotify(
        "error",
        <div>
          Các trường có dấu <span className="required">*</span> là bắt buộc!{" "}
          <br /> Vui lòng kiểm tra lại.
        </div>,
        "topRight"
      );
      return;
    }

    if (password !== confirmPass) {
      MessageNotify("error", "Mật khẩu nhập lại không chính xác!", "topRight");
      return;
    }

    const response = await dispatch(CheckEmailExists(email));
    if (response.payload) {
      MessageNotify(
        "error",
        <p>
          Email đã tồn tại trong hệ thống! <br /> Vui lòng chọn email khác
        </p>,
        "topRight"
      );
      return;
    }
    delete state["confirmPass"];
    const res = await dispatch(addUser(state as IUser));
    if (res.payload) {
      notification.success({
        message: "Thêm tài khoản thành công!",
        placement: "topRight",
      });

      dispatch(PathSlice.actions.back());
      navigate(-1);
      dispatch(increaseQuantityUser(role));
    } else {
      notification.error({
        message: "Thêm tài khoản thất bại!",
        placement: "topRight",
      });
    }
  };

  const handleBack = () => {
    dispatch(PathSlice.actions.back());
    navigate(-1);
  };

  return (
    <div className="wrapper_accountA">
      <h1 className="heading_accountA">Quản lý tài khoản</h1>
      <div className="wrap_accountA">
        <h2 className="sub-heading_accountA">Thông tin tài khoản</h2>
        <div className="wrap-content_accountA">
          <div>
            <p className="title_accountA">
              Họ tên <span className="required_accountA">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập họ tên"
              value={displayName}
              onChange={(e) => handleChangeInput(e, "displayName")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Tên đăng nhập <span className="required_accountA">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập tên đăng nhập"
              value={userName}
              onChange={(e) => handleChangeInput(e, "userName")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Số điện thoại <span className="required_accountA">*</span>
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
            <p className="title_accountA">
              Mật khẩu <span className="required_accountA">*</span>
            </p>
            <Input.Password
              spellCheck={false}
              className="input-password_accountA"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => handleChangeInput(e, "password")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Email <span className="required_accountA">*</span>
            </p>
            <Input
              spellCheck={false}
              placeholder="Nhập email"
              value={email}
              onChange={(e) => handleChangeInput(e, "email")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Nhập lại mật khẩu <span className="required_accountA">*</span>
            </p>
            <Input.Password
              spellCheck={false}
              className="input-password_accountA"
              placeholder="Nhập lại mật khẩu"
              value={confirmPass}
              onChange={(e) => handleChangeInput(e, "confirmPass")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Vai trò <span className="required_accountA">*</span>
            </p>
            <Dropdown
              options={roleList}
              placeholder="Chọn vai trò"
              onChange={(value) => handleSelect(value, "role")}
            />
          </div>
          <div>
            <p className="title_accountA">
              Tình trạng <span className="required_accountA">*</span>
            </p>
            <Dropdown
              options={statuses}
              placeholder="Chọn trạng thái"
              onChange={(value) => handleSelect(value, "status")}
            />
          </div>
        </div>
        <p>
          <span className="required_accountA">*</span> Là trường thông tin bắt
          buộc
        </p>
      </div>
      <div className="footer_accountA">
        <button onClick={handleBack} className="cancel-btn_accountA">
          Hủy bỏ
        </button>
        <Button
          className="add-btn_accountA"
          onClick={handleAddAccount}
          loading={loading}
        >
          Thêm
        </Button>
      </div>
    </div>
  );
}

export default AddAccount;
