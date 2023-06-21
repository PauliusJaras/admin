import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../shared/Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  properties: existingProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [removableImages, setRemovableImages] = useState([]);
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    existingProperties || {}
  );
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

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

  function removeImage(index, link) {
    setImages((images) => {
      const allImages = [...images];
      allImages.splice(index, 1);
      setRemovableImages((prev) => [...prev, link]);
      return allImages;
    });
  }

  async function saveProduct(event) {
    if (removableImages.length > 0) {
      removableImages.forEach(async (i) => {
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

    event.preventDefault();
    const productData = {
      title: String(title),
      description: String(description),
      price: Number(price),
      images: images,
      category: category,
      properties: productProperties,
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

  function updateImagesOrder(images) {
    setImages(images);
  }

  if (goToProducts) {
    router.push("/products");
  }

  function setProductProp(propName, value) {
    setProductProperties((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(
        ({ _id }) => _id === catInfo?.parent?._id
      );
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
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
        <label>Category</label>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        >
          <option value="">No category</option>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option key={index} value={category._id}>
                {category.title}
              </option>
            ))}
        </select>
        {propertiesToFill.length > 0 && <label>Properties</label>}
        {propertiesToFill.length > 0 &&
          propertiesToFill.map((p, index) => (
            <div className="" key={index}>
              <label className="capitalize text-sm text-gray-600">
                {p.name}
              </label>
              <select
                value={productProperties[p.name]}
                onChange={(event) => setProductProp(p.name, event.target.value)}
              >
                {p.values.map((v, index) => (
                  <option key={index}>{v}</option>
                ))}
              </select>
            </div>
          ))}
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
                    {" "}
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <img
                    className="rounded-lg bg-white p-2 shadow-sm rounded-sm border border-gray-100"
                    src={link}
                    alt="product image"
                  />
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
          justify-center text-sm gap-1 text-primary rounded-md
          bg-white shadow-sm border border-primary/50"
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
