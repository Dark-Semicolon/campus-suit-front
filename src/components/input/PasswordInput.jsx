import { IconButton, InputAdornment } from "@mui/material";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";
import { Input } from "@mui/material";
import { useState } from "react";
import styles from "./password.module.css";
import { width } from "../inputSelectWidth";
import Tooltip from "../Tooltip";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function PasswordInput({
  edit,
  name,
  label,
  register,
  size = "half",
  error,
  className,
  ...props
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const [isTyping, setIsTyping] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    const input = document.getElementById(name);
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;

    setShowPassword((show) => !show);

    // Restore cursor position after state update
    setTimeout(() => {
      input.setSelectionRange(selectionStart, selectionEnd);
    }, 0);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (event) => {
    const value = event.target.value;
    if (value.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  return (
    <div className={`${styles["input-group"]} ${width[size]} ${className}`}>
      <RiLockPasswordLine className="absolute top-[17px] right-[10px] text-xl 2xl:text-[25px] z-10 text-gray-color-primary" />
      <Input
        type={showPassword ? "text" : "password"}
        name={name}
        id={name}
        autoComplete={name}
        className={`px-3 w-full ${
          isTyping ? styles["input-typed"] : styles.input
        } ${error ? styles["input-error"] : ""}`}
        {...props}
        {...register}
        onChange={handleInput}
        sx={{
          ".muirtl-1x51dt5-MuiInputBase-input-MuiInput-input": {
            paddingLeft: "25px",
          },
          ".muirtl-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
            fontSize: isSmallScreen ? "14px" : "20px",
          },
          "&.MuiInputBase-root::before": {
            content: "none",
          },
          "&.MuiInputBase-root::after": {
            content: "none",
          },
          "&.Mui-focused": {
            backgroundColor: "#ffffff",
            color: "#050505",
            minWidth: 30,
          },
          borderColor: !error ? "" : "red",
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </IconButton>
          </InputAdornment>
        }
      />
      {error && (
        <Tooltip
          message={typeof error === "object" ? error.message : error}
          right={25}
          top={"8px"}
        />
      )}
      <label
        htmlFor={name}
        className={`${
          !edit ? styles["user-label"] : styles["user-label-edit"]
        } ${isTyping ? styles["user-label-typed"] : ""}  ${
          error
            ? `${styles["user-label-typed-focus"]} ${styles["user-label-error"]}`
            : ""
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default PasswordInput;
