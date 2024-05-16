import { Input } from "@nextui-org/react";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function CustomInput({
  type = "text",
  lable,
  size = "lg",
  isError,
  errorMessage,
  register,
  className,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      type={type === "password" ? (isVisible ? "text" : "password") : type}
      label={lable}
      size={size}
      color={isError ? "danger" : ""}
      className={`text-black ${className}`}
      errorMessage={errorMessage}
      endContent={
        type === "password" && (
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaRegEye className="text-2xl pointer-events-none text-default-400" />
            ) : (
              <FaRegEyeSlash className="text-2xl pointer-events-none text-default-400" />
            )}
          </button>
        )
      }
      {...props}
      {...register}
    />
  );
}

export default CustomInput;
