import { Route, Routes } from "react-router-dom";
import Login from "../view/Login/Login";

function Routers() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default Routers;
