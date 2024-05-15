import { useState } from "react";
import styles from "./input.module.css";
import { width } from "../inputSelectWidth";
import Tooltip from "../Tooltip";

function Input({
  type,
  name,
  label,
  icon,
  register,
  size = "half",
  error,
  className,
  edit,
  onChange,
  disabled,
  ...props
}) {
  const [isTyping, setIsTyping] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    if (value.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className={`${styles["input-group"]} ${width[size]} ${className}`}>
        {icon}
        <input
          type={type}
          id={name}
          name={name}
          autoComplete={name}
          className={`${
            disabled &&
            "border border-gray-300 pointer-events-none bg-gray-100 text-gray-600 "
          } w-full ${
            isTyping && !error && !edit
              ? styles["input-typed"]
              : isTyping && error && !edit
              ? styles["input-typed-error"]
              : styles["input"]
          }  ${error ? styles["input-error"] : ""}  
          ${edit ? styles["input-edit"] : ""}
          `}
          disabled={disabled}
          {...props}
          {...register}
          onChange={register ? handleInput : onChange}
          {...props}
        />
        <label
          htmlFor={name}
          className={`${
            !edit ? styles["user-label"] : styles["user-label-edit"]
          } ${
            (isTyping && !edit) || props?.defaultValue
              ? styles["user-label-typed"]
              : ""
          } ${
            disabled
              ? "bg-gray-100"
              : !isTyping && !edit
              ? "bg-transparent"
              : ""
          } ${
            error
              ? `${styles["user-label-typed-focus"]} ${styles["user-label-error"]}`
              : ""
          }`}
        >
          {label}
        </label>

        {error && (
          <Tooltip
            message={typeof error === "object" ? error.message : error}
          />
        )}
      </div>
    </>
  );
}

export default Input;
