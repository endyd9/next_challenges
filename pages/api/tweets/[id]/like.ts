import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { whitSession } from "../../../../lib/withSession";

async function Like(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
    query: { id },
  } = req;

  const client = new PrismaClient();

  try {
    const isLike = await client.like.findFirst({
      where: {
        tweetId: +id,
        userId: user!.id,
      },
    });
    if (isLike) {
      await client.like.delete({
        where: {
          id: isLike.id,
        },
      });
    } else {
      await client.like.create({
        data: {
          user: {
            connect: {
              id: user?.id,
            },
          },
          tweet: {
            connect: {
              id: +id!.toString(),
            },
          },
        },
      });
    }

    return res.json({
      ok: true,
    });
  } catch {
    return res.json({ ok: false });
  }
}

export default whitSession(Like);
