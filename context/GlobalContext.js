'use client';

import { createContext, useState} from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    const [showNav, setShowNav] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    return (
        <GlobalContext.Provider value={{
            showNav, setShowNav,
            isUploading, setIsUploading,
            
        }}>
            {children}
        </GlobalContext.Provider>
    )


}