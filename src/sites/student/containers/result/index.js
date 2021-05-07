import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import resultProvider from "@data-access/result-provider";
import "@items/style.scss";
import React, { useEffect, useState } from "react";

const Schedule = (props) => {
  const [state, setState] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    resultProvider.search().then((json) => {});
  };
  return (
    <>
      <Head title="Kết quả học tập"></Head>
      <Loading></Loading>
      <div className="content">
        <div className="tbl">
          <table>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Mã Môn học</th>
                <th>Môn học</th>
                <th>Điểm danh</th>
                <th>Điểm giữa kì</th>
                <th>Điểm cuối kì</th>
                <th>Trung bình</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {state.dataRender ? (
                state.dataRender.map((data, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.subject.code}</td>
                    <td>{data.subject.name}</td>
                    <td>{data.muster}</td>
                    <td>{data.midPoint}</td>
                    <td>{data.endPoint}</td>
                    <td>{data.total}</td>
                    <td>{data.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    Không có dữ liệu. Vui lòng chọn khóa học
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
