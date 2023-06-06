import React from "react";
import { Bar } from "react-chartjs-2";
import 'chart.js/auto'
import * as consts from "../../consts/consts";

export default function Chart({ currentPost, postLikes }) {
  const dates = consts.handleUniqueDates(postLikes);
  // const handleLikesEachDay = (dates, postId) => {
  //   let likes = [];
  //   for (let date of dates) {
  //     const request = {
  //       date,
  //       postId,
  //     };
  //     axios
  //       .post(consts.serverURI + "/api/Like/GetLikesByDate", request, consts.defaultConfig)
  //       .then((response) => {
  //         const { data } = response;
  //         likes.push(data.length);
  //       });
  //   }
  //   return likes;
  // };
  // const likeEachDay = handleLikesEachDay(dates, postId);
  console.log(dates);
  return (
    <div>
      <Bar
        className="custom-chart"
        data={{
          labels: dates,
          datasets: [
            {
              label: currentPost.header,
              data: [1, 2, 3, 4, 5, 6, 7],
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
