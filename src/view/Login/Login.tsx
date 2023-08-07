import React from "react";
import { logo } from "../../assect/img";

function Login() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col col-5">
          <div className="row">
            <div className="col">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col">
                          <label htmlFor="">Tên đăng nhập</label>
                          <input type="text" placeholder=" Tên đăng nhập" />
            </div>
          </div>
        </div>
        <div className="col col-7"></div>
      </div>
    </div>
  );
}

export default Login;
