import React from "react";
import HeadTable from "../table/HeadTable";

const BodyTable = (props) => {
  const data = props.data;
  if (data === null || data === undefined) return <div></div>;
  else
    return (
      <>
        {data.map((data, index) => (
          <props.children key={index} index={index} data={data} />
        ))}
      </>
    );
};

export default BodyTable;
