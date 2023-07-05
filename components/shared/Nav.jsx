"use client";

import Logo from "./Logo";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import NavLink from "./NavLink";
import LogoutButton from "./LogoutButton";

export default function Nav() {

  const {showNav, setShowNav} = useContext(GlobalContext);

  return (
    <aside onClick={() => setShowNav(false)}
      className={
        (showNav ? "left-0" : "-left-full") +
        " top-0 text-gray-500 p-4 fixed w-full bg-bgGray h-screen md:static md:w-auto transition-all z-10"
      }
    >
      <Logo className={"mr-2 mb-4"}></Logo>
      <nav>
        <NavLink iconName={"home"} href={"/"} linkTitle={"Dashboard"}></NavLink>
        <NavLink iconName={"products"} href={"/products"} linkTitle={"Products"}></NavLink>
        <NavLink iconName={"categories"} href={"/categories"} linkTitle={"Categories"}></NavLink>
        <NavLink iconName={"orders"} href={"/orders"} linkTitle={"Orders"}></NavLink>
        <NavLink iconName={"settings"} href={"/settings"} linkTitle={"Settings"}></NavLink>
        <LogoutButton></LogoutButton>
      </nav>
    </aside>
  );
}
