import { useSelector } from "react-redux";
import CardNotify from "./CardNotify";
import "./Notification.css";
import { userSelectors } from "../../redux/selectors";
import { convertTimeToString } from "../../utils/utils";

const data: number[] = [];
for (let i = 0; i < 10; i++) {
  data.push(i);
}

function Notification() {
  const { currentUser } = useSelector(userSelectors);
  return (
    <div className="wrapper_notification">
      <header className="header_notification">
        <span className="span_notification">Thông báo</span>
      </header>
      <div className="list_notification">
        {data?.map((item) => (
          <CardNotify
            key={item}
            name={currentUser?.displayName}
            time={convertTimeToString(new Date(), "HH:mm - DD/MM/YYYY")}
          />
        ))}
      </div>
    </div>
  );
}

export default Notification;
