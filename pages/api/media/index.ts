// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileData = await new Promise<any>((resolve, reject) => {
      const form = new formidable.IncomingForm({
        maxFileSize: 10 * 1024 * 1024,
        keepExtensions: true,
      });

      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        return resolve(files);
      });
    });

    if (!fileData?.file)
      return res.status(400).json({ message: "No file exists" });

    const formData = new FormData();
    const file = fileData.file;
    const readStream = fs.createReadStream(file.filepath);

    formData.append("files", readStream);
    formData.append("type", "image");
    formData.append("model", "Event");
    formData.append("application", "image");

    const { data } = await axios.post(
      `${process.env.SERVICE_API_URL}/media`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=" + formData.getBoundary(),
          "x-api-key": process.env.SERVICE_API_KEY!,
        },
      }
    );

    return res.status(201).json(data);
  } catch (e: any) {
    console.log(e?.response?.data || e);
    return res.status(500).json({ message: "Server Error" });
  }
}
