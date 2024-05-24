import { useCheckbox, Chip, VisuallyHidden, tv } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa";

const checkbox = tv({
  slots: {
    base: "border-default  h-10",
    content: "text-default-500",
  },
  variants: {
    isSelected: {
      true: {
        base: "bg-blue-color-light hover:border-blue-500",
        content: "text-primary-foreground px-3 text-white text-lg font-bolde",
      },
    },
    isFocusVisible: {
      true: {
        base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
      },
    },
  },
});

export const CustomCheckbox = (props) => {
  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({
    ...props,
  });

  const styles = checkbox({ isSelected, isFocusVisible });

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content(),
        }}
        color="primary"
        startContent={isSelected ? <FaCheck className="ml-1 text-white" /> : null}
        variant="faded"
        {...getLabelProps()}
      >
        {children ? children : isSelected ? "Enabled" : "Disabled"}
      </Chip>
    </label>
  );
};
