import { useState } from 'react';
import ShopifyIntegrate from '../components/ShopifyIntegrate';
import { FaTimes } from 'react-icons/fa';
import shopifyIcon from '../assets/shopify icon.png';

export default function ChannelsPage() {
    const [openPanel, setOpenPanel] = useState(null);
    return (
        <div>
            <h1 className="text-4xl mb-4">Channels</h1>
            <div className="flex flex-col w-4/5 m-auto border rounded p-8">
                <div className="flex items-center justify-between gap-4">
                    <span className='flex items-center gap-4 h-12'>
                        <img className='h-full' src={shopifyIcon} alt="shopify_icon" />
                        <h2 className='text-lg'>Shopify</h2>
                    </span>
                    <button
                        onClick={() => {
                            setOpenPanel('shopify');
                        }}
                        className="bg-ascent rounded cursor-pointer px-4 py-2"
                    >
                        Integrate
                    </button>
                </div>
            </div>

            {openPanel && (
                <div className="fixed right-0 top-0 bg-highlight text-text w-1/2 h-full p-4">
                    <button
                        onClick={() => {
                            setOpenPanel(null);
                        }}
                        className="fixed top-8 right-8 text-text text-lg"
                    >
                        <FaTimes size={30} />
                    </button>
                    {openPanel === 'shopify' && <ShopifyIntegrate setOpenPanel={setOpenPanel} />}
                </div>
            )}
        </div>
    );
}
