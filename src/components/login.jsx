import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "./common/form";
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
        "http://localhost:43619/api/Auth/Login",
        user
      );
      localStorage.setItem("token", jwt.token);
      toast.success("Logging In...");
      setTimeout(() => (window.location = "/feed"), 1000);
    } catch (ex) {
      toast.error("Email or Password Incorrect, Please Try Again or Sign Up");
    }
    // history.replace('/');
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
        <h2 className="m-2">Login </h2>
        <Form
          buttonLabel="Login"
          formInputs={Inputs.LOGIN_FORM_INPUTS}
          onSubmit={this.handleLogin}
          formValues={user}
          onInputChange={this.handleInput}
          data={user}
          schema={this.schema}
          errors={errors}
          activateButton={this.validate()}
        />
      </div>
    );
  }
}

export default Login;
