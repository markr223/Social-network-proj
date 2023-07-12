import React from "react";
import Input from "./input";
import { Button, Tooltip } from "antd";
import { MailOutlined, SmallDashOutlined, InfoCircleFilled} from "@ant-design/icons";

const Form = (props) => {
  const {formInputs,
    formValues,
    onInputChange,
    errors,
    onLoginClick,
    isLogin,
    isSignUp,
    onSubmit,
    buttonLabel,
    infoPass,
    inputTextArea} = props;
    const addIconForForm = (input) => {
      if(isLogin) {
        if(input.id === "email") {
          return <MailOutlined/>
        } else if (input.id === "password") {
          return <SmallDashOutlined/>
        }
      }
      else  if(input.id === "password"){
        return <Tooltip title={infoPass}><InfoCircleFilled/></Tooltip>
      }
    }
  return (
    <div className="board">
      <form onSubmit={(e) => e.preventDefault()}>
        {formInputs.map((input) => (
          <div className={isLogin ? 'login-form-container' : 'signup-form-container'}>
            <Input
              key={input.id}
              onChange={(e) => onInputChange(e, input.id)}
              value={formValues[input.id]}
              label={input.label}
              type={input.type}
              error={errors[input.id]}
              inputTextArea={inputTextArea}
              prefix={addIconForForm(input)}
            />
          </div>
        ))}
      </form>
      {isLogin && <div className="formButton">
        <Button type="primary" className="formButton-login" onClick={()=> onLoginClick()}>
          Login  
        </Button>
      </div> }
      {isSignUp && <div className="formButton">
        <Button type="primary" className="formButton-login" onClick={()=> onSubmit()}>
        {buttonLabel}  
        </Button>
      </div> }
    </div>
  );
}

export default Form