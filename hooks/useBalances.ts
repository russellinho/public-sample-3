import useSWR from "swr";
import { useAccount } from "wagmi";

export const useBalances = () => {
  const { address } = useAccount();

  const key = `/api/evm/balances/${address}`;

  const { data, error } = useSWR(key);

  return {
    data,
    error,
    isFetching: !error && !data,
  };
};
