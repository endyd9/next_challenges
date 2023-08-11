import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { whitSession } from "../../lib/withSession";

async function uploadTweet(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { tweet },
    session: { user },
  } = req;

  const client = new PrismaClient();

  try {
    await client.tweet.create({
      data: {
        content: tweet,
        creator: {
          connect: {
            id: user!.id,
          },
        },
      },
    });

    return res.json({ ok: true });
  } catch {
    return res.json({ ok: false });
  }
}

export default whitSession(uploadTweet);
