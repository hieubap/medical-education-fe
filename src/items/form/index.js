import "@items/style.scss";
import React, { useState } from "react";
import "./style.scss";

const Form = (props) => {
  const { title, index, create, update, data, eventBack } = props.bundle;
  const { height, position } = props;
  const [dataSet, setDataSet] = useState(data);
  const isCreate = data ? false : true;

  const change = (e, value) => {
    if (typeof e === "string") {
      setDataSet({ ...dataSet, [e]: value });
    } else setDataSet({ ...dataSet, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="modal"
      style={{ display: "flex", position: "absolute" }}
      // style={
      //   position
      //     ? { display: "flex", position: "absolute" }
      //     : { display: "flex", position: "fixed" }
      // }
    >
      <div className="overlay" style={{ position: "fixed" }}></div>
      <div className="body">
        <div className="form-base">
          <div className="head-form">
            {isCreate ? "Tạo mới " + title : "Cập nhật " + title}
          </div>
          <props.children
            data={dataSet}
            change={change}
            index={index}
            bundle={props.bundle}
          ></props.children>
          <div className="btn">
            <button className="default-btn" onClick={eventBack}>
              TRỞ LẠI
            </button>
            <button
              className="default-btn"
              onClick={(e) => {
                isCreate ? create(dataSet) : update(dataSet, index);
              }}
            >
              {isCreate ? "THÊM" : "CẬP NHẬT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
