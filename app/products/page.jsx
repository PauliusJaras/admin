'use client';

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home(){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        })
    }, [])

    return (
        <>
        <Link className="btn-primary" href={'/products/new'}>Add new product</Link>
        <table>
            <thead>
                <tr>
                    <td>
                        Product Name
                    </td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (<tr key={index}>{product.title}</tr>))}
            </tbody>
        </table>
        </>
    )
}