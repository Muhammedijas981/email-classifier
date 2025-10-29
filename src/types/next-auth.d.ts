// Module augmentation for next-auth to include accessToken/refreshToken on JWT and Session
import "next-auth";

declare module "next-auth" {
  interface Session {
    // OAuth access token for provider APIs (e.g. Gmail)
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

export {};
