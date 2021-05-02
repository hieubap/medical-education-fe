import Form from "@items/form";
import React from "react";

const FormCourse = (props) => {
  const child = (props) => {
    const { change } = props;
    const data = props.data || { name: "", price: "" };

    let list = [];
    for (let i = 0; i < 100; i++) {
      list.push(<li>Môn học {i}</li>);
    }
    return (
      <div className="body-form">
        <div className="base-content">
          <div>
            <label>Tên cơ sở</label>
            <label>Địa chỉ</label>
          </div>
          <div>
            <input
              name="healthFacilityId"
              type="text"
              value={data.healthFacilityId || ""}
              onChange={(e) => change(e)}
            />
            <input
              name="address"
              type="text"
              value={data.address || ""}
              onChange={(e) => change(e)}
            />
          </div>
        </div>
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default FormCourse;
