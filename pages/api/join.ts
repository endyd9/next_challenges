import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function join(req: NextApiRequest, res: NextApiResponse) {
  const client = new PrismaClient();
  const {
    body: { email, password },
  } = req;

  try {
    await client.user.create({
      data: {
        email,
        password,
      },
    });

    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error,
    });
  }
}
