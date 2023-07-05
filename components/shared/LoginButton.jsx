"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {

  const loginButton = (
    <button
      className="bg-primary text-white p-2 px-4 rounded-lg"
      onClick={()=> signIn()}
    >
      Sign In
    </button>
  );

  return (
        <div className="grid h-screen w-screen place-items-center">
          {loginButton}
        </div>
    );
}
