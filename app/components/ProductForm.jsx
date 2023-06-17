import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

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

  async function saveProduct(event) {
    event.preventDefault();
    const productData = {
      title: String(title),
      description: String(description),
      price: Number(price),
      images: images,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { _id, ...productData });
    } else {
      //create
      await axios.post("/api/products", productData);
    }
    setGoToProducts(true);
  }

  function updateImagesOrder(images){
    setImages(images);
  }

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <>
      <form onSubmit={saveProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Images</label>
        <div className="mb-2 flex flex-wrap gap-2">
          <ReactSortable className="flex flex-wrap gap-1" list={images} setList={updateImagesOrder}>
            {!!images?.length &&
              images.map((link, index) => (
                <div className="h-24" key={index}>
                  <img className="rounded-lg" src={link} alt="product image" />
                </div>
              ))}
          </ReactSortable>
          {isUploading && (
            <div className="h-24 p-1 flex items-center">
              <Spinner />
            </div>
          )}
          <label
            className="w-24 h-24 flex items-center 
          justify-center text-sm gap-1 text-gray-500 rounded-md
          bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span>Upload</span>
            <input
              type="file"
              className="hidden"
              onChange={uploadImages}
            ></input>
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
        <label>Price (in USD)</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        ></input>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
