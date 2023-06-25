"use client";

import ConfirmBox from "@/components/shared/ConfirmBox";
import { useDeleteProduct } from "@/hooks/UseDeleteProduct";
import { useGetProducts } from "@/hooks/useGetProducts";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteProduct() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  const [product, setProductUpdate] = useGetProducts();
  const [setDeleteProductId] = useDeleteProduct();

  useEffect(() => {
    if (!id) {
      return;
    }
    setProductUpdate({ id });
  }, [id, setProductUpdate]);

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await setDeleteProductId(id);
    setProductUpdate(Date.now);
    goBack();
  }

  return (
    <>
      {product && (
        <>
          <ConfirmBox
            confirmHandler={deleteProduct}
            declineHandler={goBack}
            titleText={`Do you really want to delete product ${product.title}?`}
          ></ConfirmBox>
        </>
      )}
    </>
  );
}
