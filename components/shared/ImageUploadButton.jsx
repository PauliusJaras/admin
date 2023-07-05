'use client';

import { useContext } from "react";
import SvgIcon from "./SvgIcon";
import { GlobalContext } from "@/context/GlobalContext";
import axios from "axios";

export default function ImageUploadButton({setImages}) {

  const {setIsUploading} = useContext(GlobalContext);

  async function uploadImages(event) {
    const files = event.target?.files;
    if (files?.length > 0) {
      setIsUploading(true);
      const formData = new FormData();
      for (const file of files) {
        formData.append("file", file, file.name);
      }
      const response = await axios.post("/api/upload", formData);
      setImages((oldImages) => [...oldImages, ...response.data.links]);
    }
    setIsUploading(false);
  }

  return (
    <>
      <label
        className="w-24 h-24 flex items-center 
          justify-center text-sm gap-1 text-primary rounded-md
          bg-white shadow-sm border border-primary/50"
      >
        <SvgIcon iconName={"upload"}></SvgIcon>
        <span>Upload</span>
        <input type="file" className="hidden" onChange={uploadImages}></input>
      </label>
    </>
  );
}
