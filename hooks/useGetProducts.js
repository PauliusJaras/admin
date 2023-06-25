import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProducts = (_) => {
  const [productData, setProductData] = useState(null);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    if (update === null) {
      return;
    }
    if (update?.id) {
      axios.get("/api/products?id=" + update.id).then((response) => {
        setProductData(response.data);
      });
    } else {
      axios.get("/api/products").then((response) => {
        setProductData(response.data);
      });
    }
  }, [update]);

  return [productData, setUpdate];
};
