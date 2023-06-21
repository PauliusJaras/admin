"use client";

import Nav from "./Nav";
import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import Logo from "./Logo";
import HamburgerButton from "./HamburgerButton";

export default function Wrapper({ children}) {
  const { data: session, status } = useSession();

  if (session) {
    return (
      <>
      <div className="flex items-center justify-between md:hidden">
              <Logo className={"m-4"}></Logo>
              <HamburgerButton></HamburgerButton>
            </div>
        <div className="flex h-full">
          <Nav></Nav>
          <div className="flex-grow p-4">{children}</div>
        </div>
      </>
    );
  } else {
    return (
      <div className="flex h-full">
        <LoginButton></LoginButton>
      </div>
    );
  }
}
