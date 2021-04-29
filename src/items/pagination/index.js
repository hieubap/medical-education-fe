import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./style.scss";
const initConstant = {
  totalShow: 5,
};
const Pagination = (props) => {
  const [totalPage, setTotalPage] = useState(props.totalPage);
  const totalElements = props.totalElements;
  const [page, setPage] = useState(props.page);
  const [size, setSize] = useState(props.size);

  useEffect(() => {
    setTotalPage(props.totalPage);
    setPage(props.page);
  });

  var listPage = [];

  listPage.push(
    <li key="start">
      <button onClick={() => handleChangePage(0)}>
        <FontAwesomeIcon
          icon={faAngleDoubleLeft}
          style={{ fontSize: "10px" }}
        ></FontAwesomeIcon>
      </button>
    </li>
  );
  if (page < initConstant.totalShow / 2) {
    for (let i = 0; i < initConstant.totalShow && i < totalPage; i++) {
      listPage.push(
        <li key={i} onClick={() => handleChangePage(i)}>
          <button className={i === page ? "active" : ""}>{i + 1}</button>
        </li>
      );
    }
  } else if (page > totalPage - initConstant.totalShow / 2) {
    for (
      let i = totalPage - parseInt(initConstant.totalShow);
      i < totalPage;
      i++
    ) {
      listPage.push(
        <li key={i} onClick={() => handleChangePage(i)}>
          <button className={i === page ? "active" : ""}>{i + 1}</button>
        </li>
      );
    }
  } else {
    for (
      let i = page - parseInt(initConstant.totalShow / 2);
      i < page + parseInt(initConstant.totalShow / 2 + 1);
      i++
    ) {
      listPage.push(
        <li key={i} onClick={() => handleChangePage(i)}>
          <button className={i === page ? "active" : ""}>{i + 1}</button>
        </li>
      );
    }
  }
  listPage.push(
    <li key="end">
      <button onClick={() => handleChangePage(totalPage - 1)}>
        <FontAwesomeIcon
          icon={faAngleDoubleRight}
          style={{ fontSize: "10px" }}
        ></FontAwesomeIcon>
      </button>
    </li>
  );
  const handleChangePage = (value) => {
    if (value > -1 && value < totalPage) {
      props.changePage(value);
    }
  };

  return (
    <div className="pagination">
      <div>
        <span>hiển thị</span>
        <select onChange={(e) => props.changeSize(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>
          {totalElements} bản ghi
        </span>
      </div>

      <span>
        {page + 1} / {totalPage} trang
      </span>
      <ul>{listPage}</ul>
    </div>
  );
};

export default Pagination;
