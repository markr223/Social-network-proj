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
  (dateNow.getMonth() < 10 ? "0" + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1) +
  "-" +
  dateNow.getDate();

export const serverURI = "https://95a5-31-154-77-130.ngrok-free.app";
export const defaultConfig = {
    headers: {
      "ngrok-skip-browser-warning": "any value",
      "Accept": "application/json",
      "content-type": "application/json"
    }
  };

export const patternLC = /[ -~]*[a-z][ -~]*/; // at least 1 lower-case
export const patternUC = /[ -~]*[A-Z][ -~]*/; // at least 1 upper-case
export const patternSC = /[ -~]*(?=[ -~])[^0-9a-zA-Z][ -~]*/; // basically: [ -~] && [^0-9a-zA-Z], at least 1 special character
export const patternN = /[ -~]*[0-9][ -~]*/; // at least 1 number
export const infoPass = "This password should be contains min 8 characters long, at least 1 lower-case, at least 1 upper-case, at least 1 number and at least 1 special character.";