import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function OrdersPage() {
    const [products, setProducts] = useState(null);
    const convertDate = createdAt => {
        const newDate = Date(createdAt);
        const d = newDate.toString().split(' ');
        return d[1] + ' ' + d[2] + ' at ' + d[4];
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/shopify/fetch-products/676bc84d2d6a8d748016594b')
            .then(response => {
                console.log(response.data[0]);
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className=" m-auto">
            <table className="w-full text-center"> 
                <thead className="text-xs text-white uppercase bg-black overflow-x-auto">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Inventory
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sales Channel
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Markets
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Catalogs
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Vendor
                        </th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {products &&
                        products.map((product, index) => (
                            <tr key={index} className="border-b text-white dark:bg-gray-600">
                                <td className="px-6 py-4">{product.title}</td>

                                <td className="px-6 py-4">{product.status}</td>

                                <td className="px-6 py-4">{'NA'}</td>

                                <td className="px-6 py-4">Online Store</td>

                                <td className="px-6 py-4">₹{'NA'}</td>

                                <td className="px-6 py-4">{'NA'}</td>

                                <td className="px-6 py-4">{'Unfulfilled'}</td>

                                <td className="px-6 py-4">
                                    {product.product_type}
                                </td>

                                <td className="px-6 py-4">{product.vendor}</td>

                                {/* <td className="px-6 py-4">{order.shipping_lines.length > 0 ? order.shipping_lines[0]['title'] : 'N/A'}</td> */}

                                
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
