import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./common/form";
import * as Inputs from "../consts/consts";
import { Button } from "antd";
import SignUp from "./signUp";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: {},
    isSignUpPage: false
  };
  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const { error } = Joi.validate(this.state.user, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleLogin = async () => {
    const { user } = this.state;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    try {
      const { data: jwt } = await axios.post(
        Inputs.serverURI + "/api/Auth/Login",
        user,
        Inputs.defaultConfig
      );
      localStorage.setItem("token", jwt.token);
      toast.success("Logging In...");
      setTimeout(() => (window.location = "/feed"), 1000);
    } catch (ex) {
      toast.error("Email or Password Incorrect, Please Try Again or Sign Up");
    }
  };
  handleInput = (e, value) => {
    let user = { ...this.state.user };
    user[value] = e.currentTarget.value;
    this.setState({ user });
  };
  handleSignUpLinkClick = () => {
    this.setState({isSignUpPage: true})
  };

  render() {
    const { user, errors, isSignUpPage } = this.state;
    return (
        <div className="formDisplay">
          <div className="form-container">
            { !isSignUpPage ? 
          <> 
            <span className="form-welcome">
                Login
            </span>
            <Form
              buttonLabel="Login"
              formInputs={Inputs.LOGIN_FORM_INPUTS}
              onLoginClick={this.handleLogin}
              formValues={user}
              onInputChange={this.handleInput}
              data={user}
              schema={this.schema}
              errors={errors}
              isLogin={true}
              activateButton={this.validate()}
            />
            <span className="form-signup">
              OR 
              <Button type="link" className="form-signup-button" onClick={() => this.handleSignUpLinkClick()}>
                sign-up
              </Button>
            </span>
          </> :
          <SignUp />
          }
          </div> 
        </div>
    );
  }
}

export default Login;
