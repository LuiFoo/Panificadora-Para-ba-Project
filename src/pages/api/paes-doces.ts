import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/modules/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await client.connect();
    const dbSampleMflix = client.db("padaria");

    const paesDoces = await dbSampleMflix
      .collection("paes-doces")
      .find({})
      .sort({
        metacritic: -1,
      })
      .limit(10)
      .toArray();

    return res.status(200).json({
        paesDoces: paesDoces,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ name: "Internal server error" });
  }
}