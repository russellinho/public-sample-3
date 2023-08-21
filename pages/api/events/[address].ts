// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const getApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVICE_API_URL}/events/${
        req.query.address || ""
      }?address=true`,
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

const patchApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.patch(
      `${process.env.SERVICE_API_URL}/events/${
        req.query.address || ""
      }?address=true`,
      req.body,
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
  if (req.method === "GET") return getApi(req, res);
  if (req.method === "PATCH") return patchApi(req, res);

  return res.status(404).end();
}
