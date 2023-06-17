"use client";

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
          <h1 className="text-center">Do you really want to delete product {productInfo?.title}?</h1>
          <div className="flex gap-2 justify-center">
            <button className="btn-red" onClick={deleteProduct}>
              Yes
            </button>
            <button className="btn-default" onClick={goBack}>
              No
            </button>
          </div>
        </>
      )}
    </>
  );
}
