import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@src/CSS/manageAdmin.css";
import "@src/CSS/main.css";
import Head from "../../../../components/head-tag/Head";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 10,
      sizePage: 0,
      data: [
        {
          id: 1,
          createdAt: "19-03-2021 06:00:00",
          createdBy: "ngo quang hieu",
          content: "phản hồi từ ngô hiếu",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
        {
          id: 2,
          createdAt: "19-03-2021 12:00:00",
          createdBy: "đỗ tuấn",
          content: "phản hồi từ đỗ tuấn",
        },
      ],
    };
  }

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

  render() {
    var listPage = [];
    for (let i = 0; i < 5; i++) {
      listPage.push(
        <li>
          <button onClick={() => this.setPage(i)}>{i + 1}</button>
        </li>
      );
    }

    return (
      <>
        {this.state.loading && <div class="loader" id="loader"></div>}
        <Head title="Phản hồi"></Head>
        <div>
          <table>
            <tr>
              <th style={{padding:"0"}}>ID</th>
              <th>thời gian</th>
              <th>người tạo</th>
              <th>nội dung</th>
              <th></th>
            </tr>
            {this.state.data
              .filter(
                (o, index) =>
                  this.state.page * this.state.size <= index &&
                  index < (this.state.page + 1) * this.state.size
              )
              .map((feedback, index) => {
                return (
                  <tr>
                    <td
                      style={{width: "3%"}}
                      onClick={() => this.read(index, feedback.id)}
                    >
                      {feedback.id}
                    </td>
                    <td style={{ width: "15%" }}>{feedback.createdAt}</td>
                    <td style={{ width: "15%" }}>{feedback.createdBy}</td>
                    <td>{feedback.content}</td>
                    <td style={{ width: "2%" }}>
                      <div
                        className="i"
                        onClick={() => this.delete(index, feedback.id)}
                      >
                        <FontAwesomeIcon icon={faWindowClose} className="icon-red" />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
        <ul class="pagination" id="pageTag1">
          {listPage}
        </ul>
      </>
    );
  }
}

export default FeedBack;
