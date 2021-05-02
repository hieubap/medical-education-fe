import React from "react";

const Modal = (props) => {
  const form = props.form;
  const show = props.show;

  if (show)
    return (
      <div className="modal" style={{ display: "flex" }}>
        <div className="modal__overlay"></div>
        <div className="modal__body">{form}</div>
      </div>
    );
  else return <div></div>;
};

export default Modal;
