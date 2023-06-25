import axios from "axios";
import { useEffect, useState } from "react"

export const UseDeleteImage = _ =>{
    const [images, setImages] = useState(null);

    useEffect(() => {

        if(images === null){
            return;
        }
        console.log(images);

        images.forEach(async (i) => {
            const filename = i.valueOf().split("/").pop();
    
            try {
              await axios.delete(
                "/api/upload?filename=" + filename
              );
            } catch (error) {
              console.log("Error:", error);
            }
          });

    }, [images]);

    return [setImages];
}