import { Fragment, memo } from "react";
import Image from "next/image";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";
import { useNetwork, useBalance, useAccount } from "wagmi";
import { BigNumberInput } from "big-number-input";
import { classNames } from "../../utils/helpers";
import { SupportedChainId } from "../../utils/constants/chains";
import { BUSD, USDT } from "../../utils/constants/tokens";
import { BigNumber } from "ethers";
import { Token } from "@uniswap/sdk-core";
import { useState } from "react";
import { useHasMounted } from "../../hooks/useHasMounted";

const style = {
  input: {
    container: "h-[86px]",
    titleContainer: "flex justify-between",
    titleLabel: "text-body3 font-bold text-[#999999]",
    titleAndInputSpace: "mt-[12px]",
    copyEnabled: "pl-[16px] pr-[46px] text-ellipsis",
    copyButton: "absolute inset-y-0 right-0 flex items-center pr-3",
    buttonSize: "w-[28px] h-[28px]",
    area: "block text-body2 placeholder-[#757575] px-[16px] w-full h-[56px] bg-gray-700 rounded-[8px] border-none",
    focused: "focus:ring-primary-light",
    tokenAmountText: "text-right font-bold text-[16px]",
    paddingX: "pr-[16px] pl-[100px]",
    defaultText: "text-white",
    overflowText: "text-red-500",
    readOnly: "read-only:text-[#757575]",
  },
  token: {
    selectionContainer: "absolute inset-y-0 left-0 flex items-center pl-[16px] text-white bg-transparent text-body2",
  },
  balance: {
    container: "flex space-x-1 items-center",
    text: "text-body2 text-[#999999]",
  },
};

export default function TokenInput({
  label,
  placeholder,
  decimals,
  tokenAmount,
  overflow,
  updateTokenAmount,
  allowTokenSelection,
  allowInput,
}: {
  label: string;
  name: string;
  placeholder: string;
  decimals: number;
  tokenAmount: string;
  overflow: boolean;
  updateTokenAmount: (tokenAmount: string) => void;
  allowTokenSelection: boolean;
  allowInput: boolean;
}) {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? 56;
  const availableTokens = [BUSD[chainId as SupportedChainId]];
  const [tokenSelection, setTokenSelection] = useState<Token>(availableTokens[0]);
  const [tokenBalance, setTokenBalance] = useState<BigNumber>(BigNumber.from(0));

  return (
    <div className={style.input.container}>
      <div className={style.input.titleContainer}>
        <label className={style.input.titleLabel}>{label}</label>
        <MemoizedTokenBalance token={tokenSelection} setTokenBalance={setTokenBalance} />
      </div>
      <div className={classNames(style.input.titleAndInputSpace, "relative")}>
        {/* 토큰 표가/선택 */}
        {allowTokenSelection ? <TokenSelection formToken={tokenSelection} updateFormToken={setTokenSelection} availableTokens={availableTokens} /> : <TokenSelectionDisplay />}

        {/* 토큰 개수 입력 */}
        <BigNumberInput
          renderInput={(props) => (
            <input
              className={classNames(
                allowInput ? style.input.focused : "read-only:ring-0",
                overflow ? style.input.overflowText : style.input.defaultText,
                style.input.readOnly,
                style.input.area,
                style.input.paddingX,
                style.input.tokenAmountText,
              )}
              readOnly={!allowInput}
              {...props}
            />
          )}
          decimals={decimals ?? 18}
          placeholder={placeholder}
          value={tokenAmount}
          onChange={(value) => updateTokenAmount(value)}
        />
      </div>
    </div>
  );
}

const MemoizedTokenBalance = memo(function MemoizedTokenBalance({
  token,
  setTokenBalance,
}:
{
  token: any,
  setTokenBalance: any,
}) {
  const { address } = useAccount();

  const { data: tokenBalance } = useBalance({
    addressOrName: address,
    token: token.address,
    onSuccess: (data) => setTokenBalance(data?.value ?? BigNumber.from(0)),
  });

  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <div className={style.balance.container}>
      <Image src={"/icons/Ic_wallet_gray.svg"} alt="wallet" height={16} width={16} />
      <span className={style.balance.text}>
        {tokenBalance?.formatted} {token.symbol}
      </span>
    </div>
  );
});

const TokenSelectionDisplay = (token: any) => {
  return (
    <div className={style.token.selectionContainer}>
      <div className="relative w-[20px] h-[20px] mr-2">
        <Image src={`/icons/tokens/${token.symbol}.svg`} alt={token.symbol} layout="fill" />
      </div>
      <div className="">{token.symbol}</div>
    </div>
  );
};

const TokenSelection = ({
  formToken,
  updateFormToken,
  availableTokens
  }
  :
  {
    formToken: any,
    updateFormToken: any,
    availableTokens: any
  }) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? 56;

  return (
    <div className={style.token.selectionContainer}>
      <Listbox value={formToken} onChange={(token) => updateFormToken(token)}>
        {({ open }) => (
          <>
            {/* 토큰 선택 버튼 */}
            <Listbox.Button className="flex text-left text-body2">
              <div className="relative w-[20px] h-[20px] mr-2">
                <Image src={`/icons/tokens/${formToken.symbol}.svg`} alt={formToken.symbol} layout="fill" />
              </div>
              <div className="">{formToken.symbol}</div>
              <span className="pointer-events-none ml-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            {/* 토큰 선택 옵션 */}
            <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Listbox.Options className="absolute z-10 mt-[130px] max-h-56 w-[150px] overflow-ellipsis rounded-md bg-gray-700 py-1 text-base focus:outline-nonem">
                {availableTokens.map((token: any) => (
                  <Listbox.Option
                    key={token.symbol}
                    className={({ active }) => classNames(active ? "bg-indigo-600" : "", "text-white text-body3 font-bold relative cursor-default select-none py-2 pl-3 pr-9")}
                    value={token}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <div className="relative w-[20px] h-[20px] mr-2">
                            <Image src={`/icons/tokens/${token.symbol}.svg`} alt={token.symbol} layout="fill" />
                          </div>
                          <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>{token.symbol}</span>
                        </div>

                        {selected ? (
                          <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4 text-white")}>
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
};
