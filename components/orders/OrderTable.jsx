"use client";

import { useGetOrders } from "@/hooks/useGetOrders";
import { useEffect } from "react";

export default function OrderTable() {
  const [orderData, setOrderUpdate] = useGetOrders();

  useEffect(() => {
    setOrderUpdate(Date.now);
  }, [setOrderUpdate]);

  return (
    <>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orderData !== null &&
            orderData.map((order, index) => (
              <tr key={index}>
                <td>{order?.createdAt?.replace('T', ' ').substring(0, 19)}</td>
                <td>
                  {order.name} {order.email} {order.address} {order.postalCode}{" "}
                  {order.city} {order.country}
                </td>
                <td>{order.line_items.map((l, index) => ( <span className="block" key={index}>
                    {l?.price_data.product_data.name} : {l?.quantity} 
                    </span> 
                ))}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
