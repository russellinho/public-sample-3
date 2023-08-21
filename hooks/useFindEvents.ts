import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
// TODO: Replace
// import StandardEscrowABI from "../contracts/StandardEscrow.json"; 

export function useFindEvents({ address, cursor, size, watch, enabled }: { address: string, cursor: BigNumber; size: BigNumber; watch?: boolean; enabled?: boolean }) {
//   return useContractRead({
//     addressOrName: process.env.escrowAddress!,
//     contractInterface: StandardEscrowABI,
//     functionName: "useFindEvents",
//     args: [address, cursor, size],
//     watch,
//     enabled,
//     staleTime: 10_000,
//     cacheTime: 120_000,
//   });
    return [];
}
