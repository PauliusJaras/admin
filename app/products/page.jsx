"use client";

import Table from "/components/shared/Table";
import { useGetProducts } from "/hooks/useGetProducts";
import Link from "next/link";
import { useEffect } from "react";

export default function Products() {
  const [products, setProductUpdate] = useGetProducts();

  useEffect(() => {
      setProductUpdate(Date.now);
  }, [setProductUpdate]);

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
