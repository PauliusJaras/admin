"use client";

import Table from "@/components/shared/Table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <h1>Products</h1>
      <Link className="btn-primary" href={"/products/new"}>
        Add new product
      </Link>
      <Table
        values={products}
        columns={["Product Names"]}
        rows={["title"]}
        href={"/products"}
      ></Table>
    </>
  );
}
