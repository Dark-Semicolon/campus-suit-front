import { Tooltip as TooltipHover } from "@nextui-org/react";

// Inside your component
function Tooltip({ message, children }) {
  return (
    <TooltipHover showArrow={true} content={message} className="font-bold text-small">
      {children}
    </TooltipHover>
  );
}

export default Tooltip;
