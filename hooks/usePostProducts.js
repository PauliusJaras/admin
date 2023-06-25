import axios from "axios";
import { useEffect, useState } from "react";

export const usePostProducts = (_) => {
  const [postData, setPostData] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (postData === null) {
      return;
    }
    axios
      .post("/api/products", postData)
      .then((res) => setResponse(res.data));
  }, [postData]);

  return [setPostData, response];
};
