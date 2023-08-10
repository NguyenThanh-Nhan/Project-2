import { Link, useNavigate } from "react-router-dom";
import { group2, logo } from "../../../assect/img";
import "./EmailForgotPassword.css";
import { useEffect } from "react";
import UserSlice, { CheckEmailExists } from "../../../redux/slices/UserSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../redux/store";
import { userSelectors } from "../../../redux/selectors";
import { Input } from "antd";
import { Button } from "antd";
import { WarningIcon } from "../../../components/icons";

function EmailForgotPassword() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const { loading } = useSelector(userSelectors);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Quên mật khẩu";
  }, []);

  const handleContinue = async () => {
    if (!email.trim()) {
      setError("Trường này là bắt buộc!");
      return;
    }
    const res = await dispatch(CheckEmailExists(email.trim()));
    if (res.payload) {
      dispatch(UserSlice.actions.setUserUpdate);
      navigate("/forgotpassword");
    } else setError("Email không tồn tại trên hệ thống!");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError("");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col bg_Eforgotpass">
          <div className="row text-center">
            <div className="col">
              <img src={logo} alt="" className="img-logo" />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col col-3"></div>
            <div className="col col-7">
              <form>
                <div className="form-group text-center">
                  <label className="label1EForgotPass">Đặt lại mật khẩu</label>
                  <p className="label2EForgotPass mt-2">
                    Vui lòng nhập email để đặt lại mật khẩu của bạn *
                  </p>
                  <Input
                    status={error ? "error" : ""}
                    className="form-control"
                    spellCheck={false}
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <div className="error-message">
                  {error && (
                    <>
                      <WarningIcon />
                      <span>{error}</span>
                    </>
                  )}
                </div>
                <div className="row mt-5 text-center">
                  <div className="col">
                    <Link to={"/login"}>
                      <button className="btn_Cancel">Hủy</button>
                    </Link>
                  </div>
                  <div className="col">
                    <Button
                      className="btn_EForgotPass"
                      onClick={handleContinue}
                      loading={loading}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="col col-7 bgEForgotPass">
          <img src={group2} alt="" className="img_bgEForgotPass" />
        </div>
      </div>
    </div>
  );
}
export default EmailForgotPassword;
