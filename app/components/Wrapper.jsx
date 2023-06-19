'use client';

import LoginButton from "./LoginButton";
import Nav from "./Nav";
import {useSession } from 'next-auth/react';

export default function Wrapper({ children }) {


    const {data: session, status} = useSession();

    console.log(status);

    if(session){
        return (
            <>
              <Nav></Nav>
              <div className="bg-white flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
                {children}
              </div>
            </>
          );
    } else{
        return (
            <LoginButton></LoginButton>
        )
    }

}