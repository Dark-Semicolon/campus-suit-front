import styles from "./select.module.css";
import { width } from "../inputSelectWidth";
import Tooltip from "../Tooltip";

function CustomSelect({
  name,
  label,
  options,
  register,
  size = "half",
  error,
  className,
  setValue,
  watch,

  ...props
}) {
  const handleSelected = (event) => {
    setValue(name, event.target.value);
  };

  return (
    <div className={`${styles["input-group"]} ${width[size]} ${className}`}>
      <label
        htmlFor={label}
        className={`${styles["user-label"]}   ${
          watch?.(name) || props?.defaultValue ? styles["user-label-typed"] : ""
        } ${
          props.disabled
            ? "bg-gray-100"
            : !watch?.(name)
            ? "bg-transparent"
            : ""
        } ${
          error
            ? `${styles["user-label-typed-focus"]} ${styles["user-label-error"]}`
            : ""
        } `}
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={`${
          watch?.(name) && !error
            ? styles["select-typed"]
            : watch?.(name) && error
            ? styles["select-typed-error"]
            : styles["select"]
        } ${error ? styles["select-error"] : ""} w-full ${
          props.disabled &&
          "border border-gray-300 pointer-events-none bg-gray-100"
        }
          `}
        value={watch?.(name) !== undefined ? watch?.(name) : ""}
        onChange={handleSelected}
        {...props}
        {...register}
      >
        <option value="" disabled hidden></option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {/* <div className={styles["select-arrow"]}></div> */}
      {error && (
        <Tooltip message={typeof error === "object" ? error.message : error} />
      )}
    </div>
  );
}

export default CustomSelect;
