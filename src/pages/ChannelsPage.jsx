import { useState } from 'react';
import ShopifyIntegrate from '../components/ShopifyIntegrate';
import { FaTimes } from 'react-icons/fa';
import shopifyIcon from '../assets/shopify icon.png';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ChannelsPage() {
    const {
        user: { stores },
    } = useSelector(state => state.user);

    const [openPanel, setOpenPanel] = useState(null);
    return (
        <div>
            <h1 className="text-4xl mb-4">Channels</h1>
            <div className="flex flex-col w-full m-auto border rounded p-8">
                <div className="flex items-center justify-between gap-4 mr-4">
                    <span className="flex items-center gap-4 h-12">
                        <img className="h-full" src={shopifyIcon} alt="shopify_icon" />
                        <h2 className="text-lg">Shopify</h2>
                    </span>
                    <button
                        onClick={() => {
                            setOpenPanel('shopify');
                        }}
                        className="bg-ascent rounded cursor-pointer px-4 py-2"
                    >
                        Add Store
                    </button>
                </div>
                <div className="my-4 flex flex-col gap-2">
                    {stores.map(store => (
                        <div key={store.storeId} className="flex items-center justify-between bg-highlight p-4">
                            <span>{store.storeName}</span>
                            <Link to={store.storeId}>
                                <button className="bg-ascent rounded cursor-pointer px-4 py-2">Manage</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {openPanel && (
                <div className="modal">
                    <button
                        onClick={() => {
                            setOpenPanel(null);
                        }}
                        className="fixed top-8 right-8 text-text text-lg"
                    >
                        <FaTimes size={30} />
                    </button>
                    {openPanel === 'shopify' && <ShopifyIntegrate />}
                </div>
            )}
        </div>
    );
}
