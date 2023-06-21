"use client";

import ProductForm from "@/components/products/ProductForm";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <>
      <h1>Edit Product</h1>
      {productInfo && (
        <ProductForm {...productInfo}></ProductForm>
      )}
    </>
  );
}
