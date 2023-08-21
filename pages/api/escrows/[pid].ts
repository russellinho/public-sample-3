import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const getApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { pid, address } = req.query;

    const { data } = await axios.get(
      `${process.env.SERVICE_API_URL}/escrows/${pid}${
        address ? "?address=" + address : ""
      }`,
      {
        headers: {
          "x-api-key": process.env.SERVICE_API_KEY!,
        },
      }
    );

    return res.status(200).json(data);
  } catch (e: any) {
    console.log(e?.response?.data || e);
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
