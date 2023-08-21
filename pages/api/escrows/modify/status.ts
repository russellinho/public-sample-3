import axios from "axios";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const postApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { actionName, payerAddress, _id } = req.body;

    const { data } = await axios.post(
      `${process.env.SERVICE_API_URL}/escrows/${actionName}`,
      {
        _id,
        payerAddress,
      },
      {
        headers: {
          "x-api-key": process.env.SERVICE_API_KEY!,
        },
      }
    );

    return res.status(201).json(data);
  } catch (e: any) {
    console.log(e?.response?.data || e);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await postApi(req, res);
  } else {
    return res.status(404).end();
  }
}
