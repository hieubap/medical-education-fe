import React from "react";
import HeadTable from "@items/head-table";

const BodyTable = (props) => {
  const { fields } = props;
  const { data } = props;
  if (data === null || data === undefined)
    return (
      <table>
        <thead>
          <HeadTable fields={fields}></HeadTable>
        </thead>
      </table>
    );
  else
    return (
      <table>
        <thead>
          <HeadTable fields={fields}></HeadTable>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <props.children key={index} index={index} data={data} />
          ))}
        </tbody>
      </table>
    );
};

export default BodyTable;
