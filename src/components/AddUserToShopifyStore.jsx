import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/TeamSlice';
import { FaTimes } from 'react-icons/fa';
import { addUserToShopifyStore } from '../redux/ShopifySlice';

export default function AddUser({ storeId, setOpenModal }) {
    const dispatch = useDispatch();

    const [user, setUser] = useState({ storeId, userIdToAdd: '' });
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
        setOpenModal(null);
    };

    const { usersInTeam } = useSelector(state => state.team);
    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div className="modal-content">
            <button
                onClick={() => {
                    setOpenModal(null);
                }}
                className="fixed top-8 right-8 text-text text-lg"
            >
                <FaTimes size={30} />
            </button>
            <h1 className="mb-4 text-2xl font-bold text-center">Add User to Store</h1>
            <form onSubmit={handleFormSubmit} autoComplete="off" className="w-full p-6 ">
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="add_user_userid">
                        Select User:
                    </label>
                    <select
                        className="w-full p-4 rounded outline-none border-none text-black focus:outline-ascent"
                        name="userIdToAdd"
                        id="add_user_userid"
                        onChange={handleFormChange}
                    >
                        {usersInTeam.map((user, index) => (
                            <option key={index} value={user.userId}>{`${user.username} (${user.email})`}</option>
                        ))}
                    </select>
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
