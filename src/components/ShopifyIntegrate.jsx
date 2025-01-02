import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addShopifyStore } from '../redux/ShopifySlice';

export default function AddShopifyStore() {
    const [storeDetails, setStoreDetails] = useState({ storeName: '', accessToken: '', apiKey: '', apiSecretKey: '' });
    const dispatch = useDispatch();

    const handleSubmit = event => {
        event.preventDefault();
        event.target.reset();
        dispatch(addShopifyStore(storeDetails));
    };

    const handleFormChange = event => {
        const { name, value } = event.target;
        setStoreDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    return (
        <div className="modal-content">
            <h1 className="mb-4 text-2xl font-bold text-center">Enter Your store credentials</h1>
            <form onSubmit={handleSubmit} className="w-full p-6 rounded">
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_store_name">
                        Shopify Store Name:
                    </label>
                    <input
                        type="text"
                        id="shopify_store_name"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="storeName"
                        value={storeDetails.storeName}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_access_token">
                        Shopify Access Token:
                    </label>
                    <input
                        type="text"
                        id="shopify_access_token"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="accessToken"
                        value={storeDetails.accessToken}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_api_key">
                        Shopify API key:
                    </label>
                    <input
                        type="text"
                        id="shopify_api_key"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="apiKey"
                        value={storeDetails.apiKey}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_api_secret">
                        Shopify API Secret:
                    </label>
                    <input
                        type="text"
                        id="shopify_api_secret"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="apiSecretKey"
                        value={storeDetails.apiSecretKey}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <button type="submit" className="bg-ascent uppercase p-4 border-none rounded font-bold cursor-pointer">
                        Integrate with Shopify
                    </button>
                </div>
            </form>
        </div>
    );
}
