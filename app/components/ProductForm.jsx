import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveProduct(event) {
    event.preventDefault();
    const productData = {
      title: String(title),
      description: String(description),
      price: Number(price),
    };
    if (_id) {
      //update
      await axios.put("/api/products", {_id, ...productData});
    } else {
      //create
      await axios.post("/api/products", productData);
    }
    setGoToProducts(true);
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
