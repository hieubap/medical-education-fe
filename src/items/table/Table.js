import React from "react";
import "./style.scss";

const HeadTable = (props) => {
  return (
    <tr>
      {props.fields.map((name, index) => {
        return (
          <th key={index}>
            {name}
          </th>
        );
      })}
    </tr>
  );
};

const BodyTable = (props) => {
  const { fields } = props;
  const { data } = props;
  if (data === null || data === undefined)
    return (
      <div className="table">
        <table>
          <thead>
            <HeadTable fields={fields}></HeadTable>
          </thead>
        </table>
      </div>
    );
  else
    return (
      <div className="table">
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
      </div>
    );
};

export default BodyTable;
