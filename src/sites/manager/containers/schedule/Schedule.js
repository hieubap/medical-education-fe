import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import scheduleProvider from "@data-access/schedule-provider";
import "@items/style.scss";
import { defaultState } from "@utils/common";
import React,{ useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Schedule = (props) => {
  const userApp = useSelector((state) => state.userApp);
  const [state, setState] = useState({
    ...defaultState,
    token: userApp.token,
  });

  const getData = () => {
    scheduleProvider.getSchedule().then((json) => {
      console.log(json);
      if (json && json.code === 200) {
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
  };
  useEffect(() => {
    getData();
  }, []);

  const child = (props) => {
    const { index, data } = props;

    return (
      <tr>
        <td style={{ minWidth: "50px" }}>{index + 1}</td>
        <td style={{ minWidth: "150px" }}>{data.subject.code}</td>
        <td style={{ minWidth: "200px" }}>{data.subject.name}</td>
        <td style={{ minWidth: "50px" }}>{data.day || ""}</td>
        <td style={{ minWidth: "150px" }}>
          {data.startTime + " - " + data.endTime}
        </td>
        <td style={{ minWidth: "150px" }}>{data.teacher || ""}</td>
        <td style={{ minWidth: "150px" }}>{data.place.address}</td>
        <td style={{ minWidth: "80px" }}>{data.subject.lesson || ""}</td>
      </tr>
    );
  };

  return (
    <>
      <Head title="Lịch"></Head>
      <Loading loading={state.loading}></Loading>
      <div className="content" style={{ fontSize: "15px" }}>
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th style={{ minWidth: "3%" }}>STT</th>
                <th style={{ minWidth: "20%" }}>Mã môn</th>
                <th style={{ minWidth: "20%" }}>Tên môn</th>
                <th style={{ minWidth: "20%" }}>Thứ</th>
                <th style={{ minWidth: "20%" }}>Thời gian</th>
                <th style={{ minWidth: "20%" }}>Giảng viên</th>
                <th style={{ minWidth: "20%" }}>Địa điểm</th>
              </tr>
            </thead>
            <tbody>
              {state.dataRender && state.dataRender.listSchedules ? (
                state.dataRender.listSchedules.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.subject.code}</td>
                    <td>{data.subject.name}</td>
                    <td>{data.day || ""}</td>
                    <td>{data.startTime + " - " + data.endTime}</td>
                    <td>{data.teacher || ""}</td>
                    <td>{data.place.address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-data">
                    Không có dữ liệu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
