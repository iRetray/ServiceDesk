import React, { Fragment } from "react";
import { Bar } from "react-chartjs-2";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Graph = ({ data }) => {
  return (
    <Fragment>
      <Bar data={data} options={options} />
    </Fragment>
  );
};

export default Graph;
