import { useArbitrableEscrowFactoryConfig } from "./useContract";
import { useContractWrite } from "wagmi";

export const useCreateEscrowAsFunder = (
  payeeAddress: string,
  contractTitle: string
) => {
  const funderConfig = useArbitrableEscrowFactoryConfig(
    "createEscrowAsFunder",
    [payeeAddress, contractTitle]
  );
  return useContractWrite({
    ...funderConfig,

    onError(error) {
      console.log("Error", error);
    },
  });
};

export const useCreateEscrowAsPayee = (
  funderAddress: string,
  contractTitle: string
) => {
  const funderConfig = useArbitrableEscrowFactoryConfig("createEscrowAsPayee", [
    funderAddress,
    contractTitle,
  ]);
  return useContractWrite({
    ...funderConfig,

    onError(error) {
      console.log("Error", error);
    },
  });
};
