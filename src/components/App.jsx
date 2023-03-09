import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import Navbar from "./common/navBar";
import Login from "./login";
import Logout from "./logout";
import SignUp from "./signUp";
import Feed from "./feed";
import PostsDetails from "./postsDetails";
import auth from "../services/authService";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { user: auth.getCurrentUser() };
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <Navbar userAuth={user} />
        <div className="content">
          {user && (
            <Switch>
              <Route path="/postsDetails" component={PostsDetails} />
              <Route path="/logout" component={Logout} />
              <Route
                path="/feed"
                render={(props) => <Feed {...props} loggedUser={user} />}
              />
              <Redirect to="/feed" />
            </Switch>
          )}
          {!user && (
            <Switch>
              <Route path="/signUp" render={(props) => <SignUp {...props} />} />
              <Route path="/login" render={(props) => <Login {...props} />} />
              <Redirect to="/login" />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

export default App;
