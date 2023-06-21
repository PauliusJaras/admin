'use client';

import LoginButton from "./LoginButton";
import Nav from "./Nav";
import {useSession } from 'next-auth/react';

export default function Wrapper({ children, show, setShowNav }) {


    const {data: session, status} = useSession();

    console.log(session);

    if(session){
        return (
            <>
              <Nav setShowNav={setShowNav} show={show} ></Nav>
              <div className="flex-grow p-4">
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