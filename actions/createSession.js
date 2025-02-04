"use server";

import { cookies } from "next/headers";
import { createAdminClient } from "@/config/appwrite";

async function createSession(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email, password);

  if (!email || !password) {
    return {
      error: "Please fill out all fields",
    };
  }

  //   Get account instance
  const { account } = await createAdminClient();

  try {
    // Generate a session
    const session = await account.createEmailPasswordSession(email, password);

    // Create cookie
    (await cookies()).set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(session.expire),
      path: "/",
    });

    return {
      success: true,
    };
  } catch (error) {
    console.log("Authentication Error:", error);

    return {
      error: "Invalid Credentials",
    };
  }
}

export default createSession;
