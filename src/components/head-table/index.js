import React from "react";
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
