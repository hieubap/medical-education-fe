import React, { Component } from "react";
import { api_class_register } from "@utils/API.js";
import Head from "@components/head-tag/Head";
import Loading from "@components/loading";
import { BaseComponent, connect } from "@utils/BaseComponent";

class Schedule extends BaseComponent {
  constructor(props) {
    super(props);
    this.api_get = api_class_register;
    this.nameComponent = "Lịch";
  }

  // componentDidMount() {
  //   fetch(api_class_register)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       const size = parseInt(json.totalElements / this.state.size) + 1;
  //       console.log(json.data);
  //       this.setState({
  //         ...this.state,
  //         loading: false,
  //         data: json.data,
  //         detail: new Array(json.data.length).fill(true),
  //         sizePage: size,
  //       });
  //     });

  //   console.log("call api product");
  // }

  setPage = (index) => {
    const newState = Object.assign({}, this.state);
    newState.page = index;
    this.setState(newState);
  };

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  delete = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data = newState.data.splice(index, 1);
    this.setState(newState);
  };

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>Thời gian</th>
        <th>Lớp</th>
        <th>Địa điểm</th>
      </tr>
    );
  }

  bodyTable(obj, index) {
    return (
      <tr style={{ fontSize: "17px" }}>
        <td>{index + 1}</td>
        <td>{obj.classInfo.time}</td>
        <td>{obj.classInfo.subject.name}</td>
        <td>{obj.classInfo.place.address}</td>
      </tr>
    );
  }

  // render() {
  //   var listPage = [];
  //   for (let i = 0; i < 5; i++) {
  //     listPage.push(
  //       <li key={i}>
  //         <button onClick={() => this.setPage(i)}>{i + 1}</button>
  //       </li>
  //     );
  //   }

  //   return (
  //     <>
  //       <Head title="Lịch"></Head>
  //       {this.state.loading && <Loading></Loading>}
  //       <div>
  //         <table style={{}}>
  //           <tr>
  //             <th>stt</th>
  //             <th>Thời gian</th>
  //             <th>Lớp</th>
  //             <th>Địa điểm</th>
  //           </tr>
  //           {this.state.data
  //             .filter(
  //               (o, index) =>
  //                 this.state.page * this.state.size <= index &&
  //                 index < (this.state.page + 1) * this.state.size
  //             )
  //             .map((obj, index) => {
  //               return (
  //                 <tr style={{ fontSize: "17px" }}>
  //                   <td>{index + 1}</td>
  //                   <td>{obj.classInfo.time}</td>
  //                   <td>{obj.classInfo.subject.name}</td>
  //                   <td>{obj.classInfo.place.address}</td>
  //                 </tr>
  //               );
  //             })}
  //         </table>
  //       </div>
  //       <ul class="pagination" id="pageTag1">
  //         {listPage}
  //       </ul>
  //     </>
  //   );
  // }
}

export default connect(Schedule);
