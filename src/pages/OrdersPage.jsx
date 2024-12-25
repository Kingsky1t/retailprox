import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

export default function OrdersPage() {
    const [orders, setOrders] = useState(null);
    const convertDate = createdAt => {
        const newDate = Date(createdAt);
        const d = newDate.toString().split(' ');
        return d[1] + ' ' + d[2] + ' at ' + d[4];
    };
    useEffect(() => {
        axios
            .get('http://localhost:5000/shopify/fetch-orders/676a55cd01cf8f205e85db59')
            .then(response => {
                console.log(response.data[0]);
                setOrders(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="w-4/5 m-auto">
            <table className="w-full text-center">
                <thead className="text-xs text-white uppercase bg-black overflow-x-auto">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Order
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Customer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Channel
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fulfillment Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Items
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delivery Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Delivery Method
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tags
                        </th>
                    </tr>
                </thead>
                <tbody className="text-xs">
                    {orders &&
                        orders.map((order, index) => (
                            <tr key={index} className="border-b text-white dark:bg-gray-600">
                                <td className="px-6 py-4">#{order['order_number']}</td>

                                <td className="px-6 py-4">{convertDate(order['created_at'])}</td>

                                <td className="px-6 py-4">{order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'N/A'}</td>

                                <td className="px-6 py-4">Online Store</td>

                                <td className="px-6 py-4">₹{order['current_total_price']}</td>

                                <td className="px-6 py-4">{order['financial_status']}</td>

                                <td className="px-6 py-4">{order['fulfillment_status'] || 'Unfulfilled'}</td>

                                <td className="px-6 py-4">
                                    {order.line_items.length} {order.line_items.length > 1 ? 'items' : 'item'}
                                </td>

                                <td className="px-6 py-4">{/* // delivery status */}</td>

                                <td className="px-6 py-4">{order.shipping_lines.length > 0 ? order.shipping_lines[0]['title'] : 'N/A'}</td>

                                <td className="px-6 py-4">{order['tags']}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
