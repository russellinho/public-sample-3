import { ReactElement } from "react";

export default function PrimaryButton({
  id,
  className,
  children,
  onClick,
  disabled,
  type,
  isFixed,
}: {
  id?: string;
  className?: string;
  children?: ReactElement | string;
  onClick?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isFixed?: boolean;
  customWidth?: string;
}) {
  return (
    <button
      id={id}
      className={`${
        isFixed
          ? "fixed bottom-0 md:relative md:rounded-[100px]"
          : "relative rounded-[100px]"
      } w-full h-[56px]
    font-medium text-[18px] leading-[26px] tracking-[0.0125em] uppercase
    hover:opacity-80 transition-opacity
    ${disabled ? "bg-gray-300" : "bg-primary-gradient"}
    ${className}`}
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
