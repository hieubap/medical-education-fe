import React from "react";

const index = (props) => {
  if (props.loading) return <div className="loader"></div>;
  else return <div></div>;
};

export default index;
