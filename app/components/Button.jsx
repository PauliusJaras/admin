'use client';

import {signIn, signOut, useSession} from 'next-auth/react';

export default function ProfileIcon() {

    const {data: session, status} = useSession();

    if(status ==="authenticated"){
        return <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signOut()}>Sign Out</button>
    }


  return <button className='bg-white p-2 px-4 rounded-lg' onClick={() => signIn()}>Sign In</button>;
}
