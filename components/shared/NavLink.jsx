import Link from "next/link";
import SvgIcon from "./SvgIcon";
import { usePathname } from "next/navigation";

export default function NavLink({ iconName, href, linkTitle }) {
  const pathname = usePathname();
  const inactiveLink = "flex gap-1 p-1 mb-2";
  const activeLink = inactiveLink + " bg-highlight text-black rounded-md";
  const inactiveIcon = "w-6 h-6";
  const activeIcon = inactiveIcon + " text-primary";

  if (href === "/") {
    return (
      <Link
        href={href}
        className={pathname === href ? activeLink : inactiveLink}
      >
        <SvgIcon
          iconName={iconName}
          className={pathname === href ? activeIcon : inactiveIcon}
        ></SvgIcon>
        {linkTitle}
      </Link>
    );
  } else {
    return (
      <Link
        href={href}
        className={pathname.includes(href) ? activeLink : inactiveLink}
      >
        <SvgIcon
          iconName={iconName}
          className={pathname.includes(href) ? activeIcon : inactiveIcon}
        ></SvgIcon>
        {linkTitle}
      </Link>
    );
  }
}
