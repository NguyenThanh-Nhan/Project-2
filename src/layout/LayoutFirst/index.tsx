import MenuNav from "../Menu";
import Topbar from "../Topbar";
import "./LayoutFirst.css"

export interface IChildren {
  children?: JSX.Element;
}

function MainLayout({ children }: IChildren) {
  return (
    <div className="wrapper_Flayout">
      <div className="left_Flayout">
        <MenuNav />
      </div>
      <div className="right_Flayout">
        <Topbar />
        <div className="content_Flayout">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
