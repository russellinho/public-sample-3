import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { EvmChain } from "@moralisweb3/evm-utils";
import { BUSD_MAINNET, BUSD_TESTNET } from "../../../../utils/constants/tokens";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check session.
  const session = await getSession({ req });
  if (!session) return res.status(403).json({ message: "invalid session. access denied." });

  // Check address.
  const { address } = req.query;
  if (!address) return res.status(400).json({ message: "address is not a valid hex address" });
  const addressToUse = typeof address === "string" ? address : address[0];

  // Using Moralis API
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const isProduction = process.env.APP_ENV === "production";
  const chain = isProduction ? EvmChain.BSC : EvmChain.BSC_TESTNET;
  const tokenAddresses = isProduction ? [BUSD_MAINNET.address] : [BUSD_TESTNET.address];

  const [nativeBalance, tokenBalances] = await Promise.all([
    Moralis.EvmApi.balance.getNativeBalance({ address: addressToUse, chain }),
    Moralis.EvmApi.token.getWalletTokenBalances({ address: addressToUse, chain, tokenAddresses }),
  ]);

  res.status(200).json({
    nativeBalance: nativeBalance.result.balance.ether,
    tokenBalances: tokenBalances.result,
  });
}
