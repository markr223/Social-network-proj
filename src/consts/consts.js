export const LOGIN_FORM_INPUTS = [
  { id: "email", type: "email", label: "Email" },
  { id: "password", type: "password", label: "Password" },
];
export const SIGN_UP_FORM_INPUTS = [
  { id: "userName", type: "text", label: "User Name" },
  { id: "email", type: "email", label: "Email" },
  { id: "password", type: "password", label: "Password" },
];
export const ADD_POST_FORM_INPUTS = [
  { id: "header", type: "text", label: "Header" },
  { id: "description", type: "text", label: "Description" },
];
export const BACKGROUND_COLOR_CHART = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];
export const BORDER_COLOR_CHART = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];
const dateNow = new Date();
export const currentDate =
  dateNow.getFullYear() +
  "-" +
  (dateNow.getMonth() + 1) +
  "-" +
  dateNow.getDate();
// export const NO_POSTS_TO_SHOW = (
//   <h5 className="Empty-Wall">Wall Is Empty...</h5>
// );

export const handleUniqueDates = (data) => {
  const dates = [];
  for (let date of data) dates.push(date.date);
  const datesSliced = [];
  for (let date of dates) {
    datesSliced.push(date.slice(0, 10));
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  return datesSliced.filter(onlyUnique);
};
