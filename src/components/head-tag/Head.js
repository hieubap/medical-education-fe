import { Tooltip } from "antd";
import "./style.scss";

const Head = (props) => {
  return (
    <div className="head-tag">
      {props.changeModal != null && (
        <button className="default-btn" onClick={() => props.changeModal()}>
          {props.textSubmit || "Thêm mới"}
        </button>
      )}
      <Tooltip title="Tiêu đề">
        <h2
          className="text-center"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          {props.title}
        </h2>
      </Tooltip>
    </div>
  );
};

export default Head;
