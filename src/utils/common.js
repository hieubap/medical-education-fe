import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";

const Common = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState({
    loading: true,
    isShowDetail: false,
    isShowModal: false,
    idDetail: null,
    indexDetail: null,
    dataDetail: null,

    dataRender: null,

    page: 0,
    size: 10,
    totalPage: 0,
    token: userApp.token,
  });
  const role = userApp.currentUser.authorities[0];
  const name = props.name;
  const has_action = true;
  const api_get = props.api;
  const api_post = null;
  const api_update = null;
  const api_delete = null;

  console.log(props.bodyTable);
  const beforeTable = () => {};
  const headTable = props.headTable != null ? props.headTable : () => {};
  const bodyTable = props.bodyTable != null ? (obj,index) => props.bodyTable(obj,index) : () => {};
  const action = props.action!=null? (obj, index) => props.action(obj,index):() => {};

  useEffect(() => {
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
            window.location.href = "/login";
          } else {
            // setState({
            //   loading: false
            // });
            toast.error(json.message);
          }
        });
  },[]);

  const setPage = (index) => {
    var newState = Object.assign({}, state);
    newState.page = index;
    setState(newState);
  };
  const updateDataRender = (data, index) => {
    var newData = Object.assign([], state.dataRender);

    if (index === null) {
      newData = [data, ...newData];
    } else newData[index] = data;

    const newState = { ...state, dataRender: newData };
    setState(newState);
  };
  const changeModel = (id, index) => {
    var newState = Object.assign({}, state);
    newState.showModal = !newState.showModal;
    if (id != null)
      newState = {
        ...newState,
        idDetail: id,
        indexDetail: index,
        dataDetail: state.dataRender[index],
      };
    else
      newState = {
        ...newState,
        idDetail: null,
        indexDetail: null,
        dataDetail: null,
      };
    console.log(newState);
    setState(newState);
  };

  const changeData = (e) => {
    var newDataDetail = Object.assign({}, state.dataDetail);
    newDataDetail = { ...newDataDetail, [e.target.name]: e.target.value };
    console.log(e.target.name);
    console.log(e.target.value);

    setState({ ...state, dataDetail: newDataDetail });
  };

  const back = () => {
    setState({ ...state, isDetail: false });
  };

  const detail = (id) => {
    var newState = Object.assign({}, state);
    newState.isDetail = true;
    newState.idDetail = id;
    setState(newState);
  };
  const form = () => {};

  let listPage = [];
  for (let i = 0; i < state.totalPage; i++) {
    listPage.push(
      <li key={i}>
        <button onClick={() => setPage(i)}>{i + 1}</button>
      </li>
    );
  }

  return (
    <>
      <Head title={name} changeModel={changeModel}></Head>
      <div className="content" style={{ fontSize: "15px" }}>
        {state.loading && <Loading></Loading>}
        {beforeTable()}
        <div>
          <table>
            <tbody>
              <tr>
                {headTable()}
                {has_action ? <th></th> : null}
              </tr>
              {state.dataRender != null &&
                state.dataRender
                  .filter((o, index) => {
                    return (
                      state.page * state.size <= index &&
                      index < (state.page + 1) * state.size
                    );
                  })
                  .map((o, index) => {
                    return (
                      <tr key={o.id}>
                        {bodyTable(o, index + state.page * state.size)}
                        {has_action ? action(o, index) : null}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
        <ul className="pagination">{listPage}</ul>
        {state.showModal ? (
          <div className="modal" style={{ display: "flex" }}>
            <div className="modal__overlay"></div>
            <div className="modal__body">{form()}</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Common;
