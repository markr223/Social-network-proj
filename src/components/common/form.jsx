import React from "react";
import Input from "./input";

export default function Form({
  buttonLabel,
  formInputs,
  onSubmit,
  formValues,
  onInputChange,
  errors,
  activateButton,
  inputTextArea,
}) {
  return (
    <div className="board">
      <form onSubmit={(e) => e.preventDefault()}>
        {formInputs.map((input) => (
          <Input
            key={input.id}
            onChange={(e) => onInputChange(e, input.id)}
            value={formValues[input.id]}
            label={input.label}
            type={input.type}
            error={errors[input.id]}
            inputTextArea={inputTextArea}
          />
        ))}
      </form>
      <div className="formButton">
        <button
          disabled={activateButton}
          type="submit"
          onClick={onSubmit}
          className="btn btn-primary m-2"
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
