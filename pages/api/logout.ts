import { NextApiRequest, NextApiResponse } from "next";
import { whitSession } from "../../lib/withSession";

async function logout(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  return res.json({ ok: true });
}

export default whitSession(logout);
