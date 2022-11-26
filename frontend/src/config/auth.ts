import { LoginDocument, RegisterDocument } from "@/graphql/generated";
import Cookies from "js-cookie";
import client from "./apollo";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  if (typeof window === "undefined") {
    console.warn('[WARN] function "registerUser" ran in server');
    return;
  }

  const res = await client.mutate({
    mutation: RegisterDocument,
    variables: { input: { username, password, email } },
  });

  const { data } = res;
  if (!data) throw new Error("[registerUser]: Failed: no data returned");
  const jwt = data.register.jwt;
  if (!jwt) throw new Error("[registerUser]: Failed: no JWT returned");

  localStorage.setItem("token", jwt);
  Cookies.set("token", jwt);

  return res;
};

export const loginUser = async (identifier: string, password: string) => {
  if (typeof window === "undefined") {
    console.warn('[WARN] function "login" ran in server');
    return;
  }

  const res = await client.mutate({
    mutation: LoginDocument,
    variables: {
      input: {
        identifier,
        password,
      },
    },
  });

  const { data } = res;
  if (!data) throw new Error("[registerUser]: Failed: no data returned");
  const jwt = data.login.jwt;
  if (!jwt) throw new Error("[registerUser]: Failed: no JWT returned");

  localStorage.setItem("token", jwt);
  Cookies.set("token", jwt);

  return res;
};
