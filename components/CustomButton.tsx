import React from "react";

type Props = {
  bgColor: string;
  hoverBgColor: string;
  textColor?: string;
  text: string;
  type?: "submit" | "reset" | "button";
  loading?: boolean;
  customFn?: () => void;
  disabled?: boolean
};

const CustomButton = ({
  bgColor,
  hoverBgColor,
  text,
  textColor = "text-white",
  type = "button",
  loading,
  disabled,
  customFn,
}: Props) => {
  return (
    <button
      type={type}
      className={`${
        (loading || disabled) ? "bg-foreground" : bgColor
      } hover:${hoverBgColor} px-6 py-2.5 rounded-sm text-sm ${textColor} font-bold`}
      disabled={(loading || disabled )?? false}
      onClick={type === "button" ? customFn : () => {}}
    >
      {text}
    </button>
  );
};

export default CustomButton;
