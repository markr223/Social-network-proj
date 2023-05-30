import React from "react";
import Input from "./input";
import { Button } from "antd";
import { MailOutlined, SmallDashOutlined} from "@ant-design/icons";

const Form = (props) => {
  const {formInputs,
    formValues,
    onInputChange,
    errors,
    onLoginClick,
    isLogin,
    inputTextArea} = props;
    console.log(formInputs);
    const addIconForLogin = (input) => {
      if(isLogin) {
        if(input.id === "email") {
          return <MailOutlined/>
        } else if (input.id === "password") {
          return <SmallDashOutlined/>
        }
      }
    }
  return (
    <div className="board">
      <form onSubmit={(e) => e.preventDefault()}>
        {formInputs.map((input) => (
          <div className={isLogin ? 'login-form-container' : ''}>
            <Input
              key={input.id}
              onChange={(e) => onInputChange(e, input.id)}
              value={formValues[input.id]}
              label={input.label}
              type={input.type}
              error={errors[input.id]}
              inputTextArea={inputTextArea}
              prefix={addIconForLogin(input)}
            />
          </div>
        ))}
      </form>
      {isLogin && <div className="formButton">
        <Button type="primary" className="formButton-login" onClick={()=> onLoginClick()}>
          Login  
        </Button>
      </div> }
    </div>
  );
}

export default Form