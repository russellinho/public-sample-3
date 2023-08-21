import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useNetwork } from "wagmi";
import { useAllowance, useApproval } from "../../hooks/useContract";
import { escrowState } from "../../recoil/escrow/escrowState";
import { SupportedChainId } from "../../utils/constants/chains";
import { BUSD } from "../../utils/constants/tokens";
import PrimaryButton from "../buttons/PrimaryButton";

export default function EnableAndDepositButton({
  address,
  contractAddress,
  contractDetail,
  editable,
  onClick,
}: {
  address: string;
  contractAddress: string | any;
  contractDetail: any;
  editable: boolean;
  onClick: any;
}) {
  const escrowStateValue = useRecoilValue(escrowState);

  const [approved, setApproved] = useState(false);
  const [isApproving, setIsApproving] = useState<boolean>(false);

  const { chain } = useNetwork();
  const chainId = chain?.id ?? "56";
  const tokenAddress = BUSD[chainId as SupportedChainId].address;

  const { data, isLoading: isAllowanceLoading } = useAllowance(
    tokenAddress,
    address,
    contractAddress
  );

  const { isFetching: isApprovalLoading, write: approve } = useApproval(
    tokenAddress,
    contractAddress,
    ethers.constants.MaxUint256,
    () => {
      setIsApproving(false);
      setApproved(true);
    },
    () => {
      setIsApproving(false);
    }
  );

  useEffect(() => {
    if (!isAllowanceLoading && data) {
      setApproved(Number(data) >= Number(ethers.constants.MaxUint256));
    }
  }, [data, isAllowanceLoading]);

  return (
    <div className="py-4 min-w-[200px]">
      {editable && (
        <PrimaryButton
          id="deposit_btn"
          disabled={isAllowanceLoading || isApprovalLoading}
          onClick={() => {
            if (approved) onClick();
            else {
              approve?.();
              setIsApproving(true);
            }
          }}
        >
          {isApproving
            ? "Enabling.."
            : contractDetail && +contractDetail[1] > 0
            ? "Deposit More"
            : approved
            ? "Deposit"
            : "Enable"}
        </PrimaryButton>
      )}
    </div>
  );
}
