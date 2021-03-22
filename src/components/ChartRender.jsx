import React, { Component, useState } from "react";
import { Bar } from 'react-chartjs-2'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { convertPrice } from "./common.js";

import "./../CSS/manageAdmin.css";
import "./../CSS/main.css";
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 0,
      size: 30,
      sizePage: 0,
    };
  }

  render() {
    return (
        <div
        id="screen4"
        className="container screen"
        style={{ fontSize: "17px" }}
      >
        <h2
          className=" text-center head_tag"
          data-wow-duration="1s"
          data-wow-delay="0.1s"
        >
          Thông báo
        </h2>
        <Bar
    data={{
      labels: [
        "Africa",
        "Asia",
        "Europe",
        "Latin America",
        "North America"
      ],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850"
          ],
          data: [2478, 5267, 734, 784, 433]
        }
      ]
    }}
    options={{
      legend: { display: false },
      title: {
        display: true,
        text: "Biều đồ thống kê gì gì đó =))"
      }
    }}/>
  </div>
  )
  }
}

export default Notification;
