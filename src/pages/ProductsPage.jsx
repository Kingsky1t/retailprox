import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../redux/StoreSlice'; // Update with the correct path to ProductsSlice
import { setNotification } from '../redux/NotificationSlice';
import Spinner from '../components/Spinner';

export default function ProductsPage() {
    const dispatch = useDispatch();
    const { inventory, loading, error } = useSelector(state => state.inventory);
    const { user, activeStore } = useSelector(state => state.user);

    useEffect(() => {
        if (activeStore) {
            dispatch(fetchInventory(activeStore.storeId));
        } else {
            dispatch(setNotification('No store connected. Cannot show Products.'));
        }

        if (error) {
            dispatch(setNotification(error));
        }
    }, [user, dispatch, activeStore]);

    if (loading) return <Spinner />;

    return (
        <div className="w-full h-full overflow-auto">
            {inventory && inventory.length > 0 ? (
                <table className="w-full h-full text-center relative">
                    <thead className="text-xs sticky top-0 text-white uppercase bg-highlight">
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
                        {inventory.map((product, index) => (
                            <tr key={index} className="border-b text-white bg-background">
                                <td className="px-6 py-4">{product.title || 'N/A'}</td>
                                <td className="px-6 py-4">{product.status || 'N/A'}</td>
                                <td className="px-6 py-4">N/A</td>
                                <td className="px-6 py-4">Online Store</td>
                                <td className="px-6 py-4">₹{'N/A'}</td>
                                <td className="px-6 py-4">N/A</td>
                                <td className="px-6 py-4">Unfulfilled</td>
                                <td className="px-6 py-4">{product.product_type || 'N/A'}</td>
                                <td className="px-6 py-4">{product.vendor || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="w-full text-center">
                    <span>No inventory found.</span>
                </div>
            )}
        </div>
    );
}
