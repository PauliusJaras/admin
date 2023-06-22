"use client";

import ConfirmBox from "@/components/shared/ConfirmBox";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProduct() {
  const [productInfo, setProductInfo] = useState();
  const router = useRouter();
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

  function goBack() {
    router.push("/products");
  }

  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }

  return (
    <>
      {productInfo && (
        <>
          <ConfirmBox confirmHandler={deleteProduct} declineHandler={goBack} titleText={`Do you really want to delete product ${productInfo.title}?`}></ConfirmBox>
        </>
      )}
    </>
  );
}
