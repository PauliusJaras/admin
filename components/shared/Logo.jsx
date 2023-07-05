import Link from "next/link"
import SvgIcon from "./SvgIcon"

export default function Logo({className}){
    return (
        <>
        <Link href={"/"} className={"flex gap-1 " + className}>
        <SvgIcon iconName={"logo"}></SvgIcon>
        <span>Ecommerce Admin</span>
      </Link>
        </>
    )
}