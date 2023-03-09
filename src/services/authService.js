import jwtDecode from "jwt-decode";

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export default {
  getCurrentUser,
  logout,
};
