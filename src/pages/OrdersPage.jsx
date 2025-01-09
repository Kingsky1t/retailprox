import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from './../redux/StoreSlice';
import { setNotification } from '../redux/NotificationSlice';
import Spinner from '../components/Spinner';

export default function OrdersPage() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector(state => state.orders);
    const { activeStore } = useSelector(state => state.user);
    const { user } = useSelector(state => state.user);

    const convertDate = createdAt => {
        const newDate = new Date(createdAt);
        const d = newDate.toString().split(' ');
        return d[1] + ' ' + d[2] + ' at ' + d[4];
    };

    useEffect(() => {
        if (activeStore) {
            dispatch(fetchOrders(activeStore.storeId));
        } else {
            dispatch(setNotification('No store connected. Cannot show Orders.'));
        }

        if (error) {
            dispatch(setNotification(error));
        }
    }, [user, dispatch, activeStore]);

    if (loading) return <Spinner />;

    return (
        <div className="w-full h-full overflow-auto">
            {orders && orders.length > 0 ? (
                <table className="w-full h-full text-center relative">
                    <thead className="text-xs sticky top-0 text-white uppercase bg-highlight overflow-x-auto">
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
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b text-white bg-background">
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
                                <td className="px-6 py-4">{/* Delivery status logic here */}</td>
                                <td className="px-6 py-4">{order.shipping_lines.length > 0 ? order.shipping_lines[0]['title'] : 'N/A'}</td>
                                <td className="px-6 py-4">{order['tags']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <span>No orders found.</span>
                </div>
            )}
        </div>
    );
}
