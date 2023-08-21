import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SiweMessage } from "siwe";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}")
          );

          const nextAuthUrl = process.env.NEXTAUTH_URL;
          if (!nextAuthUrl) {
            return null;
          }

          const nextAuthHost = new URL(nextAuthUrl).host;
          if (siwe.domain !== nextAuthHost) {
            return null;
          }

          if (siwe.nonce !== (await getCsrfToken({ req }))) {
            return null;
          }

          await siwe.validate(credentials?.signature || "");
          return {
            id: siwe.address,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }: any) {
        // if (session && (!session.user?._id || !session.dao?._id) && token.sub) {
        //   try {
        //     const { data } = await axios.get(
        //       process.env.SERVICE_API_URL +
        //         "/gig-profiles/" +
        //         token.sub +
        //         "?address=true",
        //       {
        //         headers: {
        //           "x-api-key": process.env.SERVICE_API_KEY,
        //         },
        //       }
        //     );
        //     session.user = data;

        //     if (!data) {
        //       const daoRes = await axios.get(
        //         process.env.SERVICE_API_URL +
        //           "/daos/" +
        //           token.sub +
        //           "?address=true",
        //         {
        //           headers: {
        //             "x-api-key": process.env.SERVICE_API_KEY,
        //           },
        //         }
        //       );
        //       session.dao = daoRes.data;
        //     }
        //   } catch (e: any) {
        //     console.log(e?.response?.data || e);
        //     console.log("?");
        //     session.user = null;
        //   }
        // }
        return session;
      },
    },
    debug: true,
  });
}
