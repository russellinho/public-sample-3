import Image from "next/image";

export default function TextInput({
  value,
  setValue,
  name,
  placeholder,
  required = false,
  iconSrc,
  prefix,
  maxLength,
  label,
  type,
  className,
  optional,
  disabled,
}: {
  value: string;
  setValue?: any;
  name: string;
  placeholder: string;
  required?: boolean;
  iconSrc?: string;
  prefix?: string;
  maxLength?: number;
  label?: string;
  type?: string;
  className?: string;
  optional?: boolean;
  disabled?: boolean;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2">
          <label
            htmlFor={name}
            className="text-[16px] font-bold md:text-h4-poppins capitalize"
          >
            {required && <span className="text-error">*</span>} {label}
            {optional && (
              <span className="ml-2 text-gray-600 lowercase">
                {" (optional)"}
              </span>
            )}
          </label>
        </div>
      )}
      <div className="relative">
        {iconSrc && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[20px]">
            <div className="relative w-[20px] h-[20px] mr-[12px]">
              <Image src={iconSrc} alt="icon" layout="fill" />
            </div>
          </div>
        )}
        {!iconSrc && prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[20px]">
            <div className="relative w-[20px] h-[20px] mr-[12px] leading-[20px]">
              {prefix}
            </div>
          </div>
        )}
        <input
          id={name}
          name={name}
          maxLength={maxLength}
          className={`pr-[20px] py-[14px] w-full border-gray-700 bg-transparent border-b-[1px] border-t-0 border-l-0 border-r-0 focus:ring-primary
        text-body2 ${
          iconSrc || prefix ? "pl-[52px]" : "pl-[20px]"
        } ${className}`}
          type={type || "text"}
          required={required}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue?.(e.target.value)}
        />
      </div>
    </div>
  );
}
