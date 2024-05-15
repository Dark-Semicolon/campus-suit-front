import { Tooltip as TooltipHover } from "@nextui-org/react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Inside your component
function Tooltip({ message, top = 4, right = 10 }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TooltipHover
      showArrow={true}
      content={message}
      className="font-bold text-small"
    >
      <ErrorOutlineIcon
        sx={{
          color: "red",
          mr: 1,
          my: 2,
          position: "absolute ",
          top: top,
          right: right,
          fontSize: isSmallScreen ? "17px" : "22px",
        }}
      />

      {/* {icon} */}
    </TooltipHover>
  );
}

export default Tooltip;
