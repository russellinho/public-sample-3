import { Contract, ethers } from "ethers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import ArbitrableEscrowFactory from "../../../../components/web3/contracts/ArbitrableEscrowFactory.json";

// NOTE: [5][0]: Goerli Testnet
// TODO: USE BINANCE Private node.
const provider = new ethers.providers.JsonRpcProvider(
  process.env.APP_ENV !== "production"
    ? "https://data-seed-prebsc-1-s2.binance.org:8545/"
    : "https://bsc-dataseed1.binance.org/"
);

const getApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { address } = req.query;

    if (!address) return res.status(400);

    const contractAddress = process.env.escrowFactoryAddress!;
    const escrowFactoryContract = new Contract(
      contractAddress,
      ArbitrableEscrowFactory,
      provider
    );
    const result = await escrowFactoryContract.escrowsOf(address);

    console.log({ factory: process.env.escrowFactoryAddress!, result });

    return res.status(200).json({ escrowAddresses: result });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getApi(req, res);
  } else {
    return res.status(404).end();
  }
}
