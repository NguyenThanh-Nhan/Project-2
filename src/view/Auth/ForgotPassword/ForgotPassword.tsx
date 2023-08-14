import React, { useEffect, useState } from "react";
import { group2, logo } from "../../../assect/img";
import "./ForgotPassword.css";
import { useSelector } from "react-redux";
import { userSelectors } from "../../../redux/selectors";
import { useAppDispatch } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../../redux/slices/UserSlice";
import MessageNotify from "../../../components/Message";
import { WarningIcon } from "../../../components/icons";
import { Button, Input } from "antd";

function ForgotPassword() {
  const { loading } = useSelector(userSelectors);
  const [error, setError] = useState("");
  const { userUpdate } = useSelector(userSelectors);
  const [state, setState] = useState({
    password: "",
    confirmPass: "",
  });
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
    <div className="container-fluid">
      <div className="row">
        <div className="col bg_ForgotPassword">
          <div className="row text-center">
            <div className="col">
              <img src={logo} alt="" className="img-logo" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col col-3"></div>
            <div className="col col-6">
              <form>
                <div className="row">
                  <p className="forgotPass_text text-center">
                    Đặt lại mật khẩu mới
                  </p>
                </div>
                <div className="form-group">
                  <label className="labelForgotPassword">Mật khẩu *</label>
                  <Input.Password
                    id="password"
                    status={error && "error"}
                    className="input"
                    value={password}
                    onChange={(e) => handleChangeInput(e, "password")}
                  />
                </div>
                <div className="form-group">
                  <label className="labelForgotPassword">
                    Nhập lại mật khẩu *
                  </label>
                  <Input.Password
                    id="confirm"
                    status={error && "error"}
                    className="input"
                    value={confirmPass}
                    onChange={(e) => handleChangeInput(e, "confirmPass")}
                  />
                </div>
                <div className="error-message">
                  {error && (
                    <>
                      <WarningIcon />
                      {error}
                    </>
                  )}
                </div>
                <div className="row mt-3">
                  <div className="col">
                    <Button
                      className="btn_ForgotPassword"
                      onClick={handleResetPass}
                      loading={loading}
                    >
                      Xác nhận
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="col col-7 bgForgotPassword">
          <img src={group2} alt="" className="img_bgForgotPassword" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
