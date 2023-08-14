import { Progress } from "antd";
import { IOverview } from "../../interfaces";
import "./CardOverView.css"


type CardOverviewProps = {
  data: IOverview;
};

function CardOverview({ data }: CardOverviewProps) {
  return (
    <div className="card-wrap">
      <div className="progress-wrap">
        <Progress
          className="progress_data"
          type="circle"
          percent={data.percent1}
          format={() => <span className="text-total">{data.percent1}%</span>}
          width={60}
          strokeColor={data.color}
          trailColor="#EAEAEC"
        />
        <Progress
          className="progress_data"
          type="circle"
          percent={data.percent2}
          format={() => ""}
          width={50}
          strokeColor={data.color2}
          trailColor="#EAEAEC"
        />
        {data.percent3 && (
          <Progress
            className="progress_data1"
            type="circle"
            percent={data.percent3}
            format={() =>""}
            width={40}
            strokeColor={data.color3}
            trailColor="#EAEAEC"
          />
        )}
      </div>
      <div className="wrap-total">
        <h1 className="total">
          <span>{data.total}</span>
        </h1>
        <div className="category">
          {data.icon} <span style={{ color: data.color }}>{data.name}</span>
        </div>
      </div>
      <div className="status">
        <span className="status-1">
          <span style={{ color: data.color }} className="dot"></span>
          <span>{data.status1}</span>
        </span>
        <span className="status-2">
          <span style={{ color: data.color2 }} className="dot"></span>
          <span>{data.status2}</span>
        </span>
        {data?.status3 && (
          <span className="status-3">
            <span style={{ color: data.color3 }} className="dot"></span>
            <span>{data?.status3}</span>
          </span>
        )}
      </div>
      <div className="quantity" style={{ color: data.color }}>
        <span>{data.number1}</span>
        <span>{data.number2}</span>
        {data?.number3 && <span>{data?.number3}</span>}
      </div>
    </div>
  );
}

export default CardOverview;
