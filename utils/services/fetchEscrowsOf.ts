import axios from "axios";

export const fetchEscrowsOf = async (address: string) => {
  const res = await axios.get(`/api/contract/escrows?address=${address}`);
  return res.data.escrowAddresses as string[];
};
