import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers } from '../redux/StoreSlice'; // Update with the correct path to StoreSlice

export default function CustomersPage() {
    const dispatch = useDispatch();
    const { customers, loading, error } = useSelector(state => state.customers);
    const { user, activeStore } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchCustomers(activeStore.storeId));
    }, [user, dispatch, activeStore]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="m-auto">
            {customers && customers.length > 0 ? (
                <table className="w-full text-center">
                    <thead className="text-xs text-white uppercase bg-highlight">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Customer name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Note
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email subscription
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Orders
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Amount spent
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-xs">
                        {customers.map((customer, index) => (
                            <tr key={index} className="border-b text-white bg-background">
                                <td className="px-6 py-4">
                                    {customer.first_name} {customer.last_name}
                                </td>
                                <td className="px-6 py-4">{customer.note || 'N/A'}</td>
                                <td className="px-6 py-4">{customer.email || 'N/A'}</td>
                                <td className="px-6 py-4">{customer.addresses?.[0]?.city || 'N/A'}</td>
                                <td className="px-6 py-4">{customer.orders_count}</td>
                                <td className="px-6 py-4">{customer.total_spent}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No customers found.</p>
            )}
        </div>
    );
}
