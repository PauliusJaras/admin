'use client';

import { createContext, useState, useEffect} from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    const [showNav, setShowNav] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    //Categories
    const [editedCategory, setEditedCategory] = useState(null);
    const [title, setTitle] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    const [resetData, setResetData] = useState(false);

    useEffect(() => {
        axios.get("/api/categories").then((response) => {
          setCategories(response.data);
        });
      }, [resetData]);

    return (
        <GlobalContext.Provider value={{
            showNav, setShowNav,
            isUploading, setIsUploading,
            //categories
            editedCategory, setEditedCategory,
            title, setTitle,
            parentCategory, setParentCategory,
            categories, setCategories,
            properties, setProperties,
            resetData, setResetData 
        }}>
            {children}
        </GlobalContext.Provider>
    )


}