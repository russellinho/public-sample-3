import { ReactElement } from "react";

export default function PrimaryButtonAlt({
  id,
  className,
  children,
  onClick,
  disabled,
  type,
}: {
  id?: string;
  className?: string;
  children?: ReactElement | string;
  onClick?: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <button
      id={id}
      className={`relative rounded-[100px]
    font-medium text-[18px] leading-[26px] tracking-[0.0125em] uppercase
    hover:opacity-80 transition-opacity border border-primary-400}
    ${className}`}
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
