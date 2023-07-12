import React from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import Form from "./common/form";
import * as Inputs from "../consts/consts";
import { Button } from "antd";
import Login from "./login";

class SignUp extends React.Component {
  state = {
    newUser: {
      userName: "",
      email: "",
      password: "",
    },
    errors: {},
    isLoginPage: false,
  };
  schema = {
    userName: Joi.string().required().label("User Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string()
    .regex(Inputs.patternLC)
    .regex(Inputs.patternUC)
    .regex(Inputs.patternSC)
    .regex(Inputs.patternN)
    .min(8)
  };
  validate = () => {
    const { error } = Joi.validate(this.state.newUser, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      console.log(item);
      let errorMassage = item.message;
      if (item.context.key === "password") {
        if (item.context?.pattern?.toString() === Inputs.patternLC.toString()) {
          errorMassage = "Your password should contain at least 1 lowercase letter";
        }
        if (item.context?.pattern?.toString() === Inputs.patternUC.toString()) {
          errorMassage = "Your password should contain at least 1 uppercase latter";
        }
        if (item.context?.pattern?.toString() === Inputs.patternSC.toString()) {
          errorMassage = "Your password should contain at least 1 special character";
        }
        else if (item.context?.pattern?.toString() === Inputs.patternN.toString()) {
          errorMassage = "Your password should contain at least 1 number";
        }
        else if (item.context?.limit) {
          errorMassage = "Your password length must be at least 8 characters long";
        }
      }
      errors[item.path[0]] = errorMassage;
    }
    return errors;
  };

  handleInput = (e, value) => {
    let newUser = { ...this.state.newUser };
    newUser[value] = e.currentTarget.value;
    this.setState({ newUser });
  };
  handleSignUp = async (history, newUser) => {
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    try {
      const response = await axios.post(
        Inputs.serverURI + "/api/Auth/Register",
        newUser,
        Inputs.defaultConfig
      );
      toast.success(response.data.message);
      setTimeout(() => (window.location = "/login"), 1000);
    } catch (ex) {
      const { message } = ex.response.data;
      toast.error(message);
    }
  };
  handleLoginLinkClick = () => {
    this.setState({isLoginPage: true})
  };
  render() {
    const { history } = this.props;
    const { newUser, errors, isLoginPage } = this.state;
    return (
      <div className="formDisplay">
         { !isLoginPage ? 
          <> 
        <h2 className="m-2">Sign Up </h2>
        <Form
            buttonLabel="Sign Up"
            isSignUp
            formInputs={Inputs.SIGN_UP_FORM_INPUTS}
            onSubmit={() => this.handleSignUp(history, newUser)}
            formValues={newUser}
            onInputChange={this.handleInput}
            errors={errors}
            activateButton={this.validate()}
            infoPass={Inputs.infoPass} />
            <span className="form-signup">
              OR
              <Button type="link" className="form-login-button" onClick={() => this.handleLoginLinkClick()}>
                login
              </Button>
            </span>
            </> :
          <Login />
          }
    </div>
    );
  }
}

export default SignUp;
