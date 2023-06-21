"use client";

import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";
import SvgIcon from "./SvgIcon";

export default function HamburgerButton() {
  const { setShowNav } = useContext(GlobalContext);

  return (
    <>
      <button onClick={() => setShowNav(true)} className="m-4">
        <SvgIcon iconName={"hamburger"}></SvgIcon>
      </button>
    </>
  );
}
