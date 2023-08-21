// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const deleteApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.delete(
      `${process.env.SERVICE_API_URL}/events/${req.query._id || ""}`,
      {
        headers: {
          "x-api-key": process.env.SERVICE_API_KEY_ADMIN!,
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
  if (req.method === "DELETE") return deleteApi(req, res);

  return res.status(404).end();
}
