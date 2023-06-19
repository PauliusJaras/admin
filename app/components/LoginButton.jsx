"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <div className="flex items-center text-center w-full">
      <div className="text-center w-full">
        <button
          className="bg-white p-2 px-4 rounded-lg"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
