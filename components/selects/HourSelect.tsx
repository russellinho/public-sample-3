export default function HourSelect({
  value,
  setValue,
}: {
  value: string;
  setValue: any;
}) {
  return (
    <select
      id="hour"
      className="w-full px-[20px] md:max-w-[320px] h-[48px] bg-gray-800 rounded-[8px]
      focus:ring-primary border-none
        text-body1 capitalize"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {Array(24)
        .fill(0)
        .map((_, i) => i)
        .map((el) => (el < 10 ? "0" + el : String(el)))
        .map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
    </select>
  );
}
