import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api_place } from "./API";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import PlaceForm from "./PlaceForm";
import BaseComponent from "./BaseComponent";

class Place extends BaseComponent {
  afterInit() {
    this.nameComponent = "Quản Lý Địa Điểm";
    this.api_get = api_place;
    this.api_delete = api_place + "/";
  }

  setData = (data, index) => {
    var newData = Object.assign([], this.state.data);
    if (index === -1) {
      console.log(newData.length);
      newData = [data, ...newData];
      console.log(data);
      console.log(newData);
    } else newData[index] = data;

    const newState = { ...this.state, data: newData };
    this.setState(newState);
  };

  read = (index, id) => {
    const newState = Object.assign({}, this.state);
    newState.data[index].isRead = 0;
    this.setState(newState);
  };

  // delete = (index, id) => {
  //   this.state.loading = true;
  //   fetch(api_place + "/" + id, {
  //     method: "delete",
  //     headers: {
  //       "content-type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       if (json.code === 200) {
  //         const newState = Object.assign({}, this.state);
  //         newState.data.splice(index, 1);
  //         this.setState({ ...newState, loading: false });
  //         toast.success("Delete Successful");
  //       }
  //     });
  // };

  headTable() {
    return (
      <tr>
        <th>stt</th>
        <th>địa điểm</th>
        <th>Ngày tạo</th>
        <th>Ngày sửa</th>
        <th></th>
      </tr>
    );
  }

  bodyTable(o, index) {
    return (
      <tr key={o.id} style={{ fontSize: "17px" }}>
        <td>
          {index + 1}
        </td>
        <td>{o.address}</td>
        <td>{o.createAt}</td>
        <td>{o.updateAt}</td>
        <td style={{ width: "10%" }}>
          <button className="but btn-red" onClick={() => this.delete(index, o.id)}>
            <FontAwesomeIcon icon={faTrashAlt} className="icon" />
          </button>
          <button
            className="but btn-blue"
            onClick={() => this.changeModel(o, index)}
          >
            <FontAwesomeIcon icon={faEdit} className="icon" />
          </button>
        </td>
      </tr>
    );
  }

  form() {
    return (
      <PlaceForm
        param={this.state.param}
        eventBack={() => this.changeModel()}
        setData={this.setData}
        index={this.state.index}
      ></PlaceForm>
    );
  }

  render() {
    return super.render();
  }

  // render() {
  //   var listPage = [];
  //   for (let i = 0; i < 5; i++) {
  //     listPage.push(
  //       <li>
  //         <a href="#" onClick={() => this.setPage(i)}>
  //           {i + 1}
  //         </a>
  //       </li>
  //     );
  //   }

  //   return (
  //     <div
  //       id="screen4"
  //       className="container screen"
  //       style={{ fontSize: "17px" }}
  //     >
  //       {this.state.loading && <div className="loader" id="loader"></div>}
  //       <button className="dropbtn dropup" onClick={() => this.changeModel()}>
  //         Thêm mới
  //       </button>
  //       <h2
  //         className=" text-center head_tag"
  //         data-wow-duration="1s"
  //         data-wow-delay="0.1s"
  //       >
  //         Thông báo
  //       </h2>
  //       <div>
  //         <table>
  //           <tr>
  //             <th>stt</th>
  //             <th>địa điểm</th>
  //             <th>Ngày tạo</th>
  //             <th>Ngày sửa</th>
  //             <th></th>
  //           </tr>
  //           {this.state.data.map((feedback, index) => {
  //             if (
  //               this.state.page * this.state.size <= index &&
  //               index < (this.state.page + 1) * this.state.size
  //             )
  //               return (
  //                 <tr style={{ fontSize: "17px" }}>
  //                   <td
  //                     style={{
  //                       width: "5%",
  //                       fontSize: "17px",
  //                     }}
  //                   >
  //                     {index + 1}
  //                   </td>
  //                   <td>{feedback.address}</td>
  //                   <td>{feedback.createAt}</td>
  //                   <td>{feedback.updateAt}</td>
  //                   <td style={{ width: "10%" }}>
  //                     <button
  //                       style={{ marginRight: "20px" }}
  //                       className="btn btn-default btn-rm"
  //                       onClick={() => this.delete(index, feedback.id)}
  //                     >
  //                       <FontAwesomeIcon icon={faTrashAlt} className="icon" />
  //                     </button>
  //                     <button
  //                       className="btn btn-default btn-ud"
  //                       onClick={() => this.changeModel(feedback, index)}
  //                     >
  //                       <FontAwesomeIcon icon={faEdit} className="icon" />
  //                     </button>
  //                   </td>
  //                 </tr>
  //               );
  //           })}
  //         </table>
  //       </div>
  //       <ul className="pagination" id="pageTag1">
  //         {listPage}
  //       </ul>
  //       {this.state.showModal ? (
  //         <div className="modal" style={{ display: "flex" }}>
  //           <div className="modal__overlay"></div>
  //           <div className="modal__body">
  //             <PlaceForm
  //               param={this.state.param}
  //               eventBack={() => this.changeModel()}
  //               setData={this.setData}
  //               index={this.state.index}
  //             ></PlaceForm>
  //           </div>
  //         </div>
  //       ) : null}
  //     </div>
  //   );
  // }
}

export default Place;
