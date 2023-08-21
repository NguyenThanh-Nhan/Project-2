import { Link } from "react-router-dom";
import { Button, Avatar } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationIcon } from "../../components/icons";
import { useAppDispatch, userSelectors } from "../../redux";
import PathSlice from "../../redux/slices/PathSlice";
import Tippy from "@tippyjs/react";
import "./Topbar.css";
import Notification from "../../components/Notification";
import Path from "../../components/Path";

function Topbar() {
  const { currentUser } = useSelector(userSelectors);
  const [clicked, setClicked] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.addEventListener("click", () => {
      setClicked(false);
    });
  }, []);
  const handleClick = () => {
    dispatch(
      PathSlice.actions.setPath([
        {
          name: "Thông tin cá nhân",
          link: "/profile",
        },
      ])
    );
  };
  return (
    <div className="wrapper_Topbar">
      <div className="path _Topbar">
        <Path />
      </div>
      <div className="user-wrap_Topbar">
        <div>
          <Tippy
            render={(attrs) => (
              <div
                className="box_Topbar"
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
                {...attrs}
              >
                <Notification />
              </div>
            )}
            delay={[100, 200]}
            trigger="click"
            placement="bottom-start"
            interactive={true}
            offset={[242, 27]}
          >
            <Button
              className="btn-notify"
              shape="circle"
              onClick={(e) => {
                e.stopPropagation();
                setClicked(!clicked);
              }}
            >
              <NotificationIcon />
            </Button>
          </Tippy>
        </div>
        <Link to="/profile" onClick={handleClick} className="d-flex-center">
          <Avatar
            className="avatar_Topbar"
            src={currentUser?.photoURL}
            icon={
              <span className="span_topbar">
                {currentUser?.displayName?.charAt(0)?.toUpperCase()}
              </span>
            }
          />
          <div className="info_Topbar">
            <span className="greet_Topbar">Xin chào</span>
            <p className="user-name_Topbar">{currentUser?.displayName}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
