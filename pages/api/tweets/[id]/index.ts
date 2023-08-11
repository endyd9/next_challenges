import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { whitSession } from "../../../../lib/withSession";

async function getTweets(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id },
  } = req;

  const client = new PrismaClient();

  try {
    const post = await client.tweet.findFirst({
      where: {
        id: +id,
      },
      select: {
        content: true,
        creator: {
          select: {
            email: true,
          },
        },
      },
    });
    const isLike = Boolean(
      await client.like.findFirst({
        where: {
          tweetId: +id,
          userId: user!.id,
        },
      })
    );

    return res.json({ ok: true, post, isLike });
  } catch {
    return res.json({ ok: false });
  }
}

export default whitSession(getTweets);
