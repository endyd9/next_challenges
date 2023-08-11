import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { whitSession } from "../../lib/withSession";

async function login(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { email },
  } = req;

  const client = new PrismaClient();

  try {
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error();

    req.session.user = {
      id: user.id,
    };

    await req.session.save();

    return res.json({ ok: true });
  } catch {
    return res.json({ ok: false });
  }
}

export default whitSession(login);
