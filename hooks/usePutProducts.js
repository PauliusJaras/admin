import axios from "axios";
import { useEffect, useState } from "react";

export const usePutProducts = (_) => {
  const [putData, setPutData] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (putData === null) {
      return;
    }
    axios
      .put("/api/products", putData)
      .then((res) => setResponse(res.data));
  }, [putData]);

  return [setPutData, response];
};
