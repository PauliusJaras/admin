import Link from "next/link";
import SvgIcon from "./SvgIcon";

export default function Button({ text, iconName, href }) {
  return (
    <>
      <Link className="btn-action" href={href}>
        <SvgIcon iconName={iconName}></SvgIcon>
        {text}
      </Link>
    </>
  );
}
