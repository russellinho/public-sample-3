export default function TextArea({
  value,
  setValue,
  name,
  placeholder,
  label,
  disabled,
  required,
  className,
}: {
  value: string;
  setValue?: any;
  name: string;
  placeholder: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className="relative">
      {label && (
        <div className="mb-2">
          <label
            htmlFor={name}
            className="text-[16px] font-bold md:text-h4-poppins capitalize"
          >
            {required && <span className="text-error">*</span>} {label}{" "}
            {!required && (
              <span className="ml-2 text-gray-600 lowercase">
                {"(optional)"}
              </span>
            )}
          </label>
        </div>
      )}
      <textarea
        name={name}
        className={`p-[20px] w-full h-[400px] border-none focus:ring-primary bg-gray-800 rounded-[8px] resize-none
        text-[14px] leading-[20px] placeholder:text-gray-600 ${className}`}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => setValue?.(e.target.value)}
      />
    </div>
  );
}
