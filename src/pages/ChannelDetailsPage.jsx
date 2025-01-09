import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addUserToShopifyStore, fetchShopifyStoreDetails } from '../redux/ShopifySlice';
import { FaTimes } from 'react-icons/fa';
import { fetchUsers } from '../redux/TeamSlice';
import Spinner from '../components/Spinner';
import AddUser from '../components/AddUserToShopifyStore';

export default function ChannelDetailsPage() {
    const dispatch = useDispatch();
    const { channelId } = useParams();
    const {
        store: { name, email, users },
        loading,
    } = useSelector(state => state.shopify);

    const [currentTab, setCurrentTab] = useState('users');
    const [openModal, setOpenModal] = useState(null);

    useEffect(() => {
        dispatch(fetchShopifyStoreDetails(channelId));
    }, [dispatch, channelId]);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <h1 className="text-4xl mb-4">Manage Channel</h1>
            <div className="flex flex-col rounded">
                <h3 className="flex gap-2 text-lg">
                    <span>Name:</span>
                    <span>{name}</span>
                </h3>
                <h3 className="flex gap-2 text-lg">
                    <span>Email:</span> <span>{email}</span>
                </h3>
            </div>

            <div className="my-2 py-4 flex gap-4 border-b">
                <span className={`py-2 px-4 rounded cursor-pointer ${currentTab === 'users' ? 'bg-highlight' : ''}`} onClick={() => setCurrentTab('users')}>
                    Users
                </span>
                <span className={`py-2 px-4 rounded cursor-pointer ${currentTab === 'roles' ? 'bg-highlight' : ''}`} onClick={() => setCurrentTab('roles')}>
                    Roles
                </span>
            </div>

            <div className="w-full overflow-auto hide-scrollbar">{currentTab === 'users' && <UsersTab users={users} setOpenModal={setOpenModal} />}</div>

            {openModal && <div className="modal">{openModal === 'add-user' && <AddUser storeId={channelId} setOpenModal={setOpenModal} />}</div>}
        </div>
    );
}

const UsersTab = ({ users, setOpenModal }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full flex justify-end">
                <button className="py-2 px-4 bg-ascent my-4 rounded" onClick={() => setOpenModal('add-user')}>
                    Add User
                </button>
            </div>

            {users?.length > 0 ? (
                <table className="w-full">
                    <thead className="bg-ascent">
                        <tr>
                            <th className="border px-4 py-2 text-left">Username</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="">
                                <td className="border px-4 py-2">{user.username}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <span>No users found in your store.</span>
            )}
        </div>
    );
};


