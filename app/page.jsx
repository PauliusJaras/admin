'use client';

import { useSession } from "next-auth/react";
import Image from 'next/image'

export default function Home() {

  const {data: session, status} = useSession();

  console.log(session);
  
  return (
    <div>
    <h1>Hello, {session?.user?.name} <span className="inline-block"><Image className="rounded-md" width={40} height={40} src={session?.user?.image} alt="user image"></Image></span></h1>
    <h3>Welcome to the admin panel!</h3>
    </div>
  )

}
