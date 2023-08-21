export default function CheckboxItem({
  checked,
  setSelectedParticipants,
  selectedParticipants,
  text,
  name,
  disabled,
  className,
  otherAction,
}: {
  checked: boolean;
  setSelectedParticipants: any;
  selectedParticipants: string[];
  text: string;
  name: string;
  disabled: boolean;
  className?: string;
  otherAction?: any;
}) {
  return (
    <div className="flex flex-row">
      <input
        type="checkbox"
        disabled
        name={name}
        checked={checked}
        onChange={() => {
          if (checked) {
            setSelectedParticipants(
              selectedParticipants.filter((el) => el !== text)
            );
          } else {
            setSelectedParticipants([...selectedParticipants, text]);
          }
          otherAction?.();
        }}
        className="border rounded-[4px] w-[24px] h-[24px]"
      />
      <div className="mb-2 overflow-auto break-words">
        <span
          className={`ml-2 ${
            checked ? "text-white" : "text-gray-400"
          } ${className}`}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
