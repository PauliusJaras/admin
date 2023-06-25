import axios from "axios";
import { useEffect, useState } from "react";

export const useDeleteProduct = (_) => {
  const [deleteData, setDeleteData] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (deleteData === null) {
      return;
    }
    axios
      .delete("/api/products?id=" + deleteData)
      .then((res) => setResponse(res.data));
  }, [deleteData]);

  return [setDeleteData, response];
};
