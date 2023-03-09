import axios from "axios";
import React from "react";
import { Bar } from "react-chartjs-2";
import * as consts from "../../consts/consts";

export default function Chart({ currentPost, postLikes, postId }) {
  const dates = consts.handleUniqueDates(postLikes);

  const handleLikesEachDay = (dates, postId) => {
    let likes = [];
    for (let date of dates) {
      const request = {
        date,
        postId,
      };
      axios
        .post("http://localhost:43619/api/Like/GetLikesByDate", request)
        .then((response) => {
          const { data } = response;
          likes.push(data.length);
        });
    }
    return likes;
  };
  const likeEachDay = handleLikesEachDay(dates, postId);
  return (
    <div>
      <Bar
        className="custom-chart"
        data={{
          labels: dates,
          datasets: [
            {
              label: currentPost.header,
              data: [1, 2, 3, 4, 5],
              backgroundColor: consts.BACKGROUND_COLOR_CHART,
              borderColor: consts.BORDER_COLOR_CHART,
              borderWidth: 1,
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
