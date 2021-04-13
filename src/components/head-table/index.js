import React from "react";
import PropTypes from "prop-types";

const index = (props) => {
  return (
    <>
      {props.map((name) => {
        return <th>{name}</th>;
      })}
    </>
  );
};

export default index;
