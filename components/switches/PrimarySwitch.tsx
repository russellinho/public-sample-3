import { Switch } from "@headlessui/react";

export default function PrimarySwitch({
  name,
  enabled,
  setEnabled,
}: {
  name: string;
  enabled: boolean;
  setEnabled: any;
}) {
  return (
    <div className="flex items-center space-x-[12px]">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer 
        items-center justify-center rounded-full"
      >
        <span
          aria-hidden="true"
          className={`
            ${enabled ? "bg-primary-400" : "bg-gray-700"}
            pointer-events-none absolute mx-auto w-[40px] h-[20px] rounded-full transition-colors duration-200 ease-in-out
          `}
        />
        <span
          aria-hidden="true"
          className={`
          ${enabled ? "translate-x-5" : "translate-x-0"}
          pointer-events-none absolute left-0 inline-block w-[22px] h-[22px] transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out
        `}
        />
      </Switch>
      <span className="text-body1">{name}</span>
    </div>
  );
}
