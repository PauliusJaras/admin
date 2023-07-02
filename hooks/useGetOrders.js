import axios from "axios";
import { useEffect, useState } from "react"

export const useGetOrders = (_) => {
    const [orderData, setOrderData] = useState(null);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        if(update === null){
            return;
        }
        axios.get("/api/orders").then(response => setOrderData(response.data));
    }, [update])

    return [orderData, setUpdate];


}
