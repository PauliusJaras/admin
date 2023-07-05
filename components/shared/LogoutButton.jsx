import { signOut } from "next-auth/react";
import SvgIcon from "./SvgIcon";

async function logout() {
  await signOut({
    callbackUrl: "/",
  });
}

export default function LogoutButton() {
  return (
    <>
      <button onClick={() => logout()} className="flex gap-1 p-1 mb-2">
        <SvgIcon iconName={"logout"}></SvgIcon>
        Logout
      </button>
    </>
  );
}
