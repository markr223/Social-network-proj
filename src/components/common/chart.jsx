import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto'
import * as consts from "../../consts/consts";

export default function Chart({ posts }) {
  
  const handleUniqueDates = (data) => {
    let dates = [];
    for (let date of data) {
      dates.push(date.date.slice(0, 10));
    }
    const countDates = [];
    const newDatesArray = dates.filter((item, pos, self) => {
      return self.indexOf(item) === pos;
    })
    newDatesArray.forEach((date) => {
      const found = dates.filter(d => date === d);
      countDates.push(found.length);
    })
    return {newDatesArray, countDates};
  };

  const dates = handleUniqueDates(posts);
  return (
    <div>
      <Bar
        className="custom-chart"
        data={{
          labels: dates.newDatesArray,
          datasets: [
            {
              label: '# Of posts for date',
              data: dates.countDates,
              backgroundColor: consts.BACKGROUND_COLOR_CHART,
              borderColor: consts.BORDER_COLOR_CHART,
              borderWidth: 2,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
