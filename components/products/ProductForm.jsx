import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectProductCategory from "./SelectProductCategory";
import SelectProductProperties from "./SelectProductProperties";
import UploadProductImages from "./UploadProductImages";
import { usePostProducts } from "@/hooks/usePostProducts";
import { usePutProducts } from "@/hooks/usePutProducts";
import { useDeleteImage } from "@/hooks/useDeleteImage";

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
  const [category, setCategory] = useState(existingCategory || "");
  const [productProperties, setProductProperties] = useState(
    existingProperties || {}
  );
  const [categories, setCategories] = useState([]);
  const [removableImages, setRemovableImages] = useState([]);
  const [setCreateProduct] = usePostProducts();
  const [setEditProduct] = usePutProducts();
  const [setDeleteProductImages] = useDeleteImage(); 
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveProduct(event) {
    event.preventDefault();
    if (removableImages.length > 0) {
      setDeleteProductImages(removableImages);
    }

    const productData = {
      title: String(title),
      description: String(description),
      price: Number(price),
      images: images,
      category: category,
      properties: productProperties,
    };

    if (_id) {
      await setEditProduct({ _id, ...productData });
    } else {
      await setCreateProduct(productData);
    }
    router.push("/products");
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
        <SelectProductCategory
          setCategory={setCategory}
          category={category}
          categories={categories}
        ></SelectProductCategory>
        <SelectProductProperties
          propertiesToFill={propertiesToFill}
          productProperties={productProperties}
          setProductProperties={setProductProperties}
        ></SelectProductProperties>
        <UploadProductImages
          images={images}
          setImages={setImages}
          setRemovableImages={setRemovableImages}
        ></UploadProductImages>
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
