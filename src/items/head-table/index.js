import React from "react";
const index = (props) => {
  return (
    <tr>
      {props.fields.map((name,index) => {
        return <th key={index}>{name}</th>;
      })}
    </tr>
  );
};

export default index;
