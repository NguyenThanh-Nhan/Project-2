import { group, logo } from "../../../assect/img";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, userSelectors } from "../../../redux";
import { WarningIcon } from "../../../components/icons";
import { SignIn } from "../../../redux/slices/UserSlice";
import { Button, notification, Input } from "antd";
import { IUser } from "../../../interfaces";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading } = useSelector(userSelectors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    payload: string
  ) => {
    payload === "userName"
      ? setUserName(e.target.value)
      : setPassword(e.target.value);
    setError("");
  };

  const handleLogin = async () => {
    if (!userName || !password) {
      notification.error({
        message: "Tên đăng nhập và mật khẩu không được bỏ trống!",
        placement: "topLeft",
      });
      return;
    }
    const user = await dispatch(SignIn({ userName, password } as IUser));
    if (user.payload) navigate("/dashboard");
    else setError("Sai mật khẩu hoặc tên đăng nhập");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col bg_login">
          <div className="row text-center">
            <div className="col">
              <img src={logo} alt="" className="img-logo" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-3"></div>
            <div className="col col-6">
              <div className="form-group">
                <label className="labelLogin">Tên đăng nhập *</label>
                <Input
                  id="user-name"
                  value={userName}
                  onChange={(e) => handleChangeInput(e, "userName")}
                  status={error && "error"}
                  className="input_login"
                  spellCheck={false}
                  placeholder="Nhập vào tài khoản"
                />
              </div>
              <div className="form-group">
                <label className="labelLogin">Mật khẩu *</label>

                <Input.Password
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => handleChangeInput(e, "password")}
                  placeholder="Nhập vào mật khẩu"
                  status={error && "error"}
                  className="input_login"
                  spellCheck={false}
                />
                {error ? (
                  <div className="error-message mt-3">
                    <WarningIcon />
                    <span>{error}</span>
                  </div>
                ) : (
                  <Link to={"/emailForgotPassword"} className="forgotPassword">
                    Quên mật khẩu?
                  </Link>
                )}
              </div>
              <Button
                className="btn_login"
                onClick={handleLogin}
                loading={loading}
              >
                Đăng nhập
              </Button>
              {error && (
                <Link to={"/emailForgotPassword"} className="forgotPassword1">
                  Quên mật khẩu?
                </Link>
              )}
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="col-7 bgLogin">
          <img src={group} alt="" className="img_bgLogin" />
          <p className="text1">Hệ thống</p>
          <p className="text2">QUẢN LÝ XẾP HÀNG</p>
        </div>
      </div>
    </div>
  );
}
export default Login;
