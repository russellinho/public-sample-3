export default function SalaryFrequencySelect({
  value,
  setValue,
}: {
  value: string;
  setValue: any;
}) {
  return (
    <select
      id="frequency"
      className="w-full px-[20px] md:max-w-[320px] h-[48px] bg-gray-800 rounded-[8px]
      focus:ring-primary border-none
        text-body1 capitalize"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {["monthly", "daily", "hourly"].map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
