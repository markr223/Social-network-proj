import React from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import * as Inputs from "../consts/consts";

class SignUp extends React.Component {
  state = {
    newUser: {
      userName: "",
      email: "",
      password: "",
    },
    errors: {},
  };
  schema = {
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const { error } = Joi.validate(this.state.newUser, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleInput = (e, value) => {
    let newUser = { ...this.state.newUser };
    newUser[value] = e.currentTarget.value;
    this.setState({ newUser });
  };
  handleSignUp = async (history, newUser) => {
    try {
      const response = await axios.post(
        "http://localhost:43619/api/Auth/Register",
        newUser
      );
      toast.success(response.data.message);
      setTimeout(() => (window.location = "/login"), 1000);
    } catch (ex) {
      const { message } = ex.response.data;
      toast.error(message);
    }
  };
  render() {
    const { history } = this.props;
    const { newUser, errors } = this.state;
    return (
      <div className="formDisplay">
        <h2 className="m-2">Sign Up </h2>
        <Form
          buttonLabel="Sign Up"
          formInputs={Inputs.SIGN_UP_FORM_INPUTS}
          onSubmit={() => this.handleSignUp(history, newUser)}
          formValues={newUser}
          onInputChange={this.handleInput}
          errors={errors}
          activateButton={this.validate()}
        />
      </div>
    );
  }
}

export default SignUp;
