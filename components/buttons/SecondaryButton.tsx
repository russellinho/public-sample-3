import { ReactElement } from "react";

export default function SecondaryButton({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children?: ReactElement | string;
  onClick?: any;
  disabled?: boolean;
}) {
  return (
    <button
      className={`w-full h-[56px] rounded-[100px]
  font-bold text-[18px] leading-[26px] tracking-[0.0125em] uppercase
  ${disabled ? "bg-gray-300" : "bg-secondary-gradient"}
  ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
