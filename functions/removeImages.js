import axios from "axios";

export function removeImages(images){
    if (images.length > 0) {
        images.forEach(async (i) => {
          const filename = i.valueOf().split("/").pop();
  
          try {
            await axios.delete(
              "http://localhost:3000/api/upload?filename=" + filename
            );
          } catch (error) {
            console.log("Error:", error);
          }
        });
      }
}