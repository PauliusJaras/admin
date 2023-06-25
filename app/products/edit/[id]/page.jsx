"use client";

import ProductForm from "@/components/products/ProductForm";
import { useGetProducts } from "@/hooks/useGetProducts";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function EditProduct() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [product, setProductUpdate] = useGetProducts();

  useEffect(() => {
    if (!id) {
      return;
    }
    setProductUpdate({id});
  }, [id, setProductUpdate]);

  return (
    <>
      <h1>Edit Product</h1>
      {product && (
        <ProductForm {...product}></ProductForm>
      )}
    </>
  );
}
