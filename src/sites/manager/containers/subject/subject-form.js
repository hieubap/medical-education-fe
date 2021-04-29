import Form from "@items/form";
import React from "react";
import '@items/style.scss'

const SubjectForm = (props) => {

  const child = (props) => {
    const { change } = props;
    const data = props.data || {name:'',price:''}

    return (
      <div className="body-form">
        <div className="base-content">
        <div>
          <label>Mã môn học</label>
          <label>Tên môn học</label>
          <label>Loại</label>
          <label>Số tiết</label>
        </div>
        <div>
          <input
            name="code"
            type="text"
            value={data.code || ''}
            onChange={(e) => change(e)}
          />
          <input
            name="name"
            type="text"
            value={data.name || ''}
            onChange={(e) => change(e)}
          />
          <input
            name="type"
            type="text"
            value={data.type || ''}
            onChange={(e) => change(e)}
          />
          <input
            name="lesson"
            type="number"
            value={data.lesson || ''}
            onChange={(e) => change(e)}
          />
        </div>
        </div>
        
      </div>
    );
  };
  return <Form bundle={props}>{child}</Form>;
};

export default SubjectForm;
