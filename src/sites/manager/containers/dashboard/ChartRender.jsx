import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import Head from "@components/head-tag/Head";
import Loading from '@components/loading';
import './style.scss';

class ChartRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 0,
      size: 30,
      sizePage: 0,
    };
  }

  render() {
    return (
      <div>
        {this.state.loading && <Loading></Loading>}
        <Head title="Thống kê"></Head>
        <div className="content content-chart">
          <Bar
            data={{
              labels: [
                "Africa",
                "Asia",
                "Europe",
                "Latin America",
                "North America",
              ],
              datasets: [
                {
                  label: "Population (millions)",
                  backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                  ],
                  data: [2478, 5267, 734, 784, 433],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: {
                display: true,
                text: "Biều đồ thống kê gì gì đó =))",
              },
            }}
          />
        </div>
      </div>
    );
  }
}

export default ChartRender;
