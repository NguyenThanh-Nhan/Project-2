import { notification } from "antd";
import { ReactElement } from "react";
type MessageNotifyType = "success" | "info" | "warning" | "error";
function MessageNotify(
  type: MessageNotifyType,
  message: string | ReactElement,
  placement = "topLeft" 
) {
  return notification[type]({
    message,
    duration: 3,
  });
}

export default MessageNotify;
