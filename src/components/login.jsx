import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./common/form";
import { Typewriter } from 'react-simple-typewriter'
import * as Inputs from "../consts/consts";

class Login extends React.Component {
  state = {
    user: {
      email: "",
      password: "",
    },
    errors: {},
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

  render() {
    const { user, errors } = this.state;
    return (
        <div className="formDisplay">
          <div className="form-mainTitle">
            OPENU-SOCIAL
          </div>
          <div className="form-container">
          <span className="form-welcome">
            <Typewriter className="form-welcome" words={['Welcome to openu-social']}/> 
          </span>
          <span className="form-subTitle">
            <Typewriter className="form-welcome" words={['Let`s log you in!']}/> 
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
          </div>
        </div>
    );
  }
}

export default Login;
