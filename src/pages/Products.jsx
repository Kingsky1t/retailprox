import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInventory } from '../redux/StoreSlice'; // Update with the correct path to ProductsSlice

export default function ProductsPage() {
    const dispatch = useDispatch();
    const { inventory, loading, error } = useSelector((state) => state.inventory);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
            if (user?.stores?.length > 0) {
                const storeId = user.stores[0].storeId; // Extract the first storeId
                // console.log('Using Store ID:', storeId);
                dispatch(fetchInventory(storeId));
            }
        }, [user, dispatch]);
    
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;

    return (
        <div className="m-auto">
    {inventory && inventory.length > 0 ? (
        <div className="w-full">
            <table className="w-full text-center">
                <thead className="text-xs text-white uppercase bg-highlight">
                    <tr>
                        <th scope="col" className="px-6 py-3">Product</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Inventory</th>
                        <th scope="col" className="px-6 py-3">Sales Channel</th>
                        <th scope="col" className="px-6 py-3">Markets</th>
                        <th scope="col" className="px-6 py-3">Catalogs</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Type</th>
                        <th scope="col" className="px-6 py-3">Vendor</th>
                    </tr>
                </thead>
            </table>
            <div className="overflow-auto max-h-[670px]">
                <table className="w-full text-center">
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
            </div>
        </div>
    ) : (
        !loading && <p>No products found.</p>
    )}
</div>



    );
}
