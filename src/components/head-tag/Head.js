import "./style.scss";

const Head = (props) => {
  return (
    <div className="head-tag">
      {props.changeModel != null && (
        <button
          className="default-btn"
          onClick={() => props.changeModel()}
        >
          Thêm mới
        </button>
      )}
      <h2 className="text-center" data-wow-duration="1s" data-wow-delay="0.1s">
        {props.title}
      </h2>
    </div>
  );
};

export default Head;
