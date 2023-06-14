"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  function createProduct(){
    
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
      <button type="submit" className="btn-primary">Save</button>
      </form>
    </>
  );
}
