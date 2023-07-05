import Link from "next/link";
import SvgIcon from "./SvgIcon";

export default function Button({ text, iconName, href, handler }) {
  return (
    <>
      <Link className="btn-action" href={href} onClick={handler}>
        <SvgIcon iconName={iconName}></SvgIcon>
        {text}
      </Link>
    </>
  );
}
