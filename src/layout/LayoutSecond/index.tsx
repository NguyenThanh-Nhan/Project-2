import OverView from "../../components/OverView/OverView";
import MenuNav from "../Menu";
import Topbar from "../Topbar";
import "./LayoutSecond.css";

export interface IChildren {
  children?: JSX.Element;
}
function LayoutSecond({ children }: IChildren) {
  return (
    <div className="wrapper_SLayout">
      <div className="left_SLayout">
        <MenuNav />
      </div>
      <div className="right_SLayout">
        <Topbar />
        <div className="center_SLayout">
          <div className="content_SLayout">{children}</div>
          <div className="over_view_SLayout">
            <OverView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutSecond;
