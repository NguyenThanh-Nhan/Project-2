import "./Notification.css";

type CardNotifyProps = {
  name: string | undefined;
  time: string;
};

function CardNotify({ name, time }: CardNotifyProps) {
  return (
    <div className="card_notify">
      <span className="username_notify">Người dùng: {name}</span>
      <span className="time_notify">Thời gian nhận số: {time}</span>
      <span className="line_notify"></span>
    </div>
  );
}

export default CardNotify;
