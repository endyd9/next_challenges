import { NextApiRequest, NextApiResponse } from "next";
import { whitSession } from "../../lib/withSession";

async function isLoggedIn(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  if (!user) {
    return res.json({
      ok: false,
    });
  }
  return res.json({
    ok: true,
  });
}

export default whitSession(isLoggedIn);
