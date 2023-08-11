import { withIronSessionApiRoute } from "iron-session/next";
import { IronSessionOptions } from "iron-session";
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions: IronSessionOptions = {
  cookieName: "logincookie",
  password: "VERYVERYLONGANDSTRONGPASSWORD123456789!@#$%^&*(",
};

export function whitSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
