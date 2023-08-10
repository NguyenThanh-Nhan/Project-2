import { Route, Routes } from "react-router-dom";
import Dashboard from "../view/Dashboard/Dashboard";
import PayError from "../view/PayError";
import Login from "../view/Auth/Login/Login";
import EmailForgotPassword from "../view/Auth/EmailForgotPassword/EmailForgotPassword";
import ForgotPassword from "../view/Auth/ForgotPassword/ForgotPassword";

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<PayError />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payerror" element={<PayError />} />
      <Route path="/emailforgotpassword" element={<EmailForgotPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
    </Routes>
  );
};

export default Routers;
