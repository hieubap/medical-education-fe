import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import Table from "@items/table/Table";
import { api_class_register } from "@utils/API.js";
import { changeModal,defaultState,setPage } from "@utils/common";
import React,{ useCallback, useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Schedule = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const api_get = api_class_register;
  const [state, setState] = useState({
    ...defaultState,
    token: userApp.token,
  });

  const fet = useCallback(() => {
    if (api_get != null)
      fetch(api_get, {
        headers: {
          "content-type": "application/json",
          Authorization: state.token,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.code === 200) {
            const size = parseInt(json.totalElements / state.size) + 1;
            setState({
              ...state,
              loading: false,
              dataRender: json.data,
              totalPage: size,
            });
          } else if (json.code === 401) {
            setState({
              loading: false,
            });
            // window.location.href = "/login";
          } else {
            toast.error(json.message);
          }
        });
  },[api_get,state])
  useEffect(() => {
    fet();
  }, [fet]);

  const form = () => {
    return <h1 style={{ fontSize: "50px" }}>nội dung</h1>;
  };

  var listPage = [];
  for (let i = 0; i < state.totalPage; i++) {
    listPage.push(
      <li key={i}>
        <button onClick={() => setPage(i)}>{i + 1}</button>
      </li>
    );
  }

  const child = (props) => {
    const index = props.index;
    const data = props.data;

    return (
      <tr>
        <td>{index + 1}</td>
        <td>{data.classInfo.time}</td>
        <td>{data.classInfo.subject.name}</td>
        <td>{data.classInfo.place.address}</td>
      </tr>
    );
  };

  return (
    <>
      <Head title="Lịch" changeModel={changeModal}></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content" style={{ fontSize: "15px" }}>
        <Table
          fields={["STT", "Thời gian", "Lớp", "Địa điểm"]}
          data={state.dataRender}
        >
          {child}
        </Table>
        <ul className="pagination">{listPage}</ul>
        {/* <Modal form={form()} show={state.showModal}></Modal> */}
        {state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal__overlay"></div>
            <div className="modal__body">{form}</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Schedule;
