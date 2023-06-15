"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct(event) {
    event.preventDefault();
    const productData = {
      title: String(title),
      description: String(description),
      price: Number(price),
    };
    await axios.post("/api/products", productData);
    setGoToProducts(true);
  }
  
  if(goToProducts){
    router.push('/products');
  }

  return (
    <>
      <form onSubmit={createProduct}>
        <h1>New Product</h1>
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
