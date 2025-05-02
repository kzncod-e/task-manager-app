// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// const GOGGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOGGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: GOGGLE_CLIENT_ID || "",
//       clientSecret: GOGGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   callbacks:{
//     async signIn({account, profile}) {
//     if(!profile?.email){
//       throw new Error("No Profile");
//     }

//   }
// };
