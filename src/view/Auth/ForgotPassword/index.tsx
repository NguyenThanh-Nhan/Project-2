import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch, userSelectors } from "../../../redux";
import MessageNotify from "../../../components/Message";
import { updateUser } from "../../../redux/slices/UserSlice";
import { group2, logo } from "../../../assect/img/1index";
import { WarningIcon } from "../../../components/icons";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [error, setError] = useState("");
  const { userUpdate } = useSelector(userSelectors);
  const [state, setState] = useState({
    password: "",
    confirmPass: "",
  });
  const { loading } = useSelector(userSelectors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { password, confirmPass } = state;

  useEffect(() => {
    document.title = "Đặt lại mật khẩu mới";
  }, []);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    payload: string
  ) => {
    const copyState: any = { ...state };
    copyState[payload] = e.target.value;
    setState(copyState);
    setError("");
  };

  const handleResetPass = async () => {
    if (!password || !confirmPass) {
      setError("Các trường dấu * không được bỏ trống!");
      return;
    }
    if (password !== confirmPass) {
      setError("Mật khẩu nhập lại không chính xác!");
      return;
    }
    if (userUpdate._id) {
      const res = await dispatch(
        updateUser({ id: userUpdate._id, payload: { password } })
      );
      if (res.payload) {
        MessageNotify("success", "Đã đổi mật khẩu!");
        navigate("/login");
      } else MessageNotify("error", "Đã có lỗi xảy ra! Vui lòng thử lại!");
    } else MessageNotify("error", "Đã có lỗi xảy ra! Vui lòng thử lại!");
  };
  return (
    <div className="wrapper">
      <div className="content-left">
        <div className="content-left_wrap">
          <img src={logo} alt="" className="img-logo" />
          <div className="d-flex-center d-flex-column">
            <h3 className="title">Đặt lại mật khẩu mới</h3>
            <div>
              <label htmlFor="password">
                Mật khẩu <span className="required">*</span>
              </label>
              <Input.Password
                id="password"
                status={error && "error"}
                className="input"
                value={password}
                onChange={(e) => handleChangeInput(e, "password")}
              />
              <label htmlFor="confirm" className="confirm">
                Nhập lại mật khẩu <span className="required">*</span>
              </label>
              <Input.Password
                id="confirm"
                status={error && "error"}
                className="input"
                value={confirmPass}
                onChange={(e) => handleChangeInput(e, "confirmPass")}
              />
            </div>
          </div>
          <div className="error-message">
            {error && (
              <>
                <WarningIcon /> {error}
              </>
            )}
          </div>
          <div className="wrap-button">
            <Button
              size={"large"}
              className="btn-confirm"
              onClick={handleResetPass}
              loading={loading}
            >
              Xác nhận
            </Button>
          </div>
        </div>
      </div>
      <div className="content-right">
        <img src={group2} alt="" className="img_bgForgotPassword" />
      </div>
    </div>
  );
}

export default ForgotPassword;
