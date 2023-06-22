/* eslint-disable @next/next/no-img-element */
"use client";

import { ReactSortable } from "react-sortablejs";
import Spinner from "../shared/Spinner";
import { useContext } from "react";
import ImageUploadButton from "../shared/ImageUploadButton";
import SvgIcon from "../shared/SvgIcon";
import { GlobalContext } from "@/context/GlobalContext";

export default function UploadProductImages({
  images,
  setImages,
  setRemovableImages,
}) {
  const {isUploading} = useContext(GlobalContext);

  function removeImage(index, link) {
    setImages((images) => {
      const allImages = [...images];
      allImages.splice(index, 1);
      setRemovableImages((prev) => [...prev, link]);
      return allImages;
    });
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  return (
    <>
      <label>Images</label>
      <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable
          className="flex flex-wrap gap-1"
          list={images}
          setList={updateImagesOrder}
        >
          {!!images?.length &&
            images.map((link, index) => (
              <div className="h-24 relative z-0" key={index}>
                <button
                  type="button"
                  onClick={() => removeImage(index, link)}
                  className="btn-remove"
                >
                  <SvgIcon iconName={"x"}></SvgIcon>
                </button>
                <img
                  className="rounded-lg bg-white p-2 shadow-sm rounded-sm border border-gray-100"
                  src={link}
                  alt={"product image " + index}
                />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 p-1 flex items-center">
            <Spinner />
          </div>
        )}
        <ImageUploadButton setImages={setImages}></ImageUploadButton>
      </div>
    </>
  );
}
