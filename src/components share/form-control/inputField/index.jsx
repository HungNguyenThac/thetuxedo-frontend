import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import "./style.scss";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  listenChangeformState: PropTypes.func,
};

InputField.defaultProps = {
  disabled: false,
  listenChangeformState: function () {},
};

function InputField(props) {
  const { form, name, placeholder, disabled, type, id, listenChangeformState } =
    props;
  const {
    control,
    formState: { isValidating },
  } = form;

  useEffect(() => {
    listenChangeformState();
  }, [isValidating]);

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, name },
        fieldState: { invalid },
      }) => (
        <input
          className="block-input"
          id={id}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          error={invalid}
          disabled={disabled}
        />
      )}
    />
  );
}

export default InputField;
