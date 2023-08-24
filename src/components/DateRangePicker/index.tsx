import { DatePicker } from "antd";
import { ArrowRightIcon } from "../icons";
import "./DatePicker.css";

function DateRangePicker() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectionRange = {
    key: "selection",
  };
  return (
    <div>
      <DatePicker.RangePicker
        suffixIcon={null}
        format="DD/MM/YYYY"
        separator={<ArrowRightIcon />}
        placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
      />
    </div>
  );
}

export default DateRangePicker;
