import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addUserToShopifyStore, fetchShopifyStoreDetails } from '../redux/ShopifySlice';
import { FaTimes } from 'react-icons/fa';

export default function ChannelManage() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const [currentTab, setCurrentTab] = useState('users');
    const [openModal, setModalOpen] = useState(null);

    const { store, loading } = useSelector(state => state.shopify);

    useEffect(() => {
        dispatch(fetchShopifyStoreDetails(channelId));
    }, [dispatch, channelId]);

    if (loading) {
        return 'Loading...';
    }
    return (
        <div>
            <h1 className="text-4xl mb-4">Manage Channel</h1>
            <div className="flex flex-col rounded">
                <h3 className="flex gap-2 text-lg">
                    <span>Name:</span>
                    <span>{store?.name}</span>
                </h3>
                <h3 className="flex gap-2 text-lg">
                    <span>Email:</span> <span>{store.email}</span>
                </h3>
            </div>
            <div className="my-2 py-4 flex gap-4 border-b">
                <span className={`py-2 px-4 rounded cursor-pointer ${currentTab === 'users' ? 'bg-highlight' : ''}`} onClick={() => setCurrentTab('users')}>
                    Users
                </span>
            </div>
            <div className="w-full overflow-auto hide-scrollbar">
                {currentTab === 'users' && (
                    <>
                        <table className="w-full">
                            <thead className="bg-ascent">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Username</th>
                                    <th className="border px-4 py-2 text-left">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store?.users?.length > 0 ? (
                                    store.users.map((user, index) => (
                                        <tr key={index} className="">
                                            <td className="border px-4 py-2">{user.username}</td>
                                            <td className="border px-4 py-2">{user.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center border px-4 py-2">
                                            No users found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button className="py-2 px-4 bg-ascent my-4 mx-auto rounded" onClick={() => setModalOpen('add-user')}>
                            Add User
                        </button>
                    </>
                )}
            </div>
            {openModal && (
                <div className="modal">
                    <button
                        onClick={() => {
                            setModalOpen(null);
                        }}
                        className="fixed top-8 right-8 text-text text-lg"
                    >
                        <FaTimes size={30} />
                    </button>
                    {openModal === 'add-user' && <AddUser storeId={channelId} />}
                </div>
            )}
        </div>
    );
}

function AddUser({ storeId }) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const handleFormChange = event => {
        const { name, value } = event.target;
        setUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(addUserToShopifyStore({ ...user, storeId }));
    };
    return (
        <div className="modal-content">
            <h1 className="mb-4 text-2xl font-bold text-center">Add User to Store</h1>
            <form onSubmit={handleFormSubmit} autoComplete="off" className="w-full p-6 rounded">
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_user_username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="shopify_user_username"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="username"
                        value={user.username}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_user_email">
                        Email
                    </label>
                    <input
                        type="text"
                        id="shopify_user_email"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="email"
                        value={user.email}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="shopify_user_password">
                        Password
                    </label>
                    <input
                        type="text"
                        id="shopify_user_password"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="password"
                        value={user.password}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <button type="submit" className="bg-ascent uppercase p-4 border-none rounded font-bold cursor-pointer">
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
}
