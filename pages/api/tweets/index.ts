import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { whitSession } from "../../../lib/withSession";

async function getTweets(req: NextApiRequest, res: NextApiResponse) {
  const {} = req;

  const client = new PrismaClient();

  try {
    const posts = await client.tweet.findMany({
      select: {
        id: true,
        content: true,
        creator: {
          select: {
            email: true,
          },
        },
      },
    });

    return res.json({ ok: true, posts });
  } catch {
    return res.json({ ok: false });
  }
}

export default whitSession(getTweets);
