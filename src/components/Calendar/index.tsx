import { useState } from "react";
import { Button, Calendar as CustomCalendar } from "antd";
import moment from "moment";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./Calendar.css";

function Calendar() {
  moment.updateLocale("vn", {
    weekdaysMin: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [preNextMonth, setPreNextMonth] = useState(moment());

  return (
    <div className="calendar-wrap">
      <CustomCalendar
        fullscreen={false}
        headerRender={({ value }) => {
          const year: number = value.year();
          const month: number = value.month();
          const date: number = value.date();

          const monthName: string = moment.months(month).substring(0, 3);
          return (
            <div className="calendar_header">
              <Button type="link" className="btn-prev">
                <LeftOutlined style={{ color: "#ff7506" }} />
              </Button>
              <div className="date-time">
                <span>{date}</span>
                <span className="month">{monthName}</span>
                <span>{year}</span>
              </div>
              <Button type="link" className="btn-next">
                <RightOutlined style={{ color: "#ff7506" }} />
              </Button>
            </div>
          );
        }}
      />
    </div>
  );
}

export default Calendar;
