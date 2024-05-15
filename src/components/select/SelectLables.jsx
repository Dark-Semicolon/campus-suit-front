import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import { styled } from "@mui/system";
import { width } from "../inputSelectWidth";
import Tooltip from "../Tooltip";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Inside your component

const MyForm = styled(FormControl)({});

function SelectLabels({
  label,
  size = "full",
  options,
  register,
  error,
  className,
  ...props
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xl"));

  const [selectValue, setSelectValue] = useState("");

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <div className={className}>
      <MyForm className={`${width[size]}`}>
        <InputLabel
          id="demo-simple-select-helper-label"
          sx={{
            "&.MuiFormLabel-root": {
              backgroundColor: selectValue !== "" ? "#ffffff" : "#f5f5f7",
              color: error ? "red" : "#7a869a",
              fontSize: isSmallScreen ? "13px" : "inherit",
            },
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              color: "#050505",
              minWidth: 30,
            },
          }}
        >
          {label}
        </InputLabel>

        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectValue}
          label="selectValue"
          {...props}
          {...register}
          onChange={handleChange}
          // onClick={(e) => e.stopPropagation()}
          sx={{
            borderRadius: "10px",
            borderWidth: 0,
            borderColor: !error ? "#7a869a" : "#ff0000",
            backgroundColor: selectValue !== "" ? "#ffffff" : "#f5f5f7",
            color: "#050505",
            "&.Mui-focused": {
              backgroundColor: "#ffffff",
              borderColor: "#1212ff",
              ".MuiOutlinedInput-notchedOutline": {
                borderWidth: 2,
                borderColor: !error ? "#7a869a" : "#ff0000",
              },
            },
            ".MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
              borderColor: !error ? "#7a869a" : "#ff0000",
            },
            "&.MuiInputBase-root": {
              "&:hover": {},
            },
          }}
        >
          {options.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.text}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <Tooltip
            message={typeof error === "object" ? error.message : error}
            right={22}
            top={"1.5px"}
          />
        )}
      </MyForm>
    </div>
  );
}

export default SelectLabels;
