export default function TimezoneSelect({
  value,
  setValue,
  name,
  label,
  required,
}: {
  value: string;
  setValue: any;
  name: string;
  label?: string;
  required?: boolean;
}) {
  return (
    <div>
      {label && (
        <div className="mb-2">
          <label htmlFor={name} className="text-body2 capitalize">
            {required && <span className="text-error">*</span>} {label}
          </label>
        </div>
      )}
      <select
        id={name}
        name={name}
        className="w-full px-[20px] h-[48px] bg-gray-800 rounded-[8px]
        focus:ring-primary border-none
          text-body2 capitalize"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {new Array(26)
          .fill(-12)
          .map((el, index) =>
            el + index >= 0 ? "+" + String(el + index) : String(el + index)
          )
          .map((item) => (
            <option key={item} value={item}>
              GMT {item}
            </option>
          ))}
      </select>
    </div>
  );
}
