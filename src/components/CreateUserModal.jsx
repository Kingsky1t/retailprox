import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/TeamSlice';

export default function CreateUserModal({ setOpenModal }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleFormChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(createUser(formData));
        setOpenModal(null);
    };

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
            <h1 className="mb-4 text-2xl font-bold text-center">Create a user</h1>
            <form onSubmit={handleFormSubmit} className="w-full p-6">
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="create_user_username">
                        Username:
                    </label>
                    <input
                        type="text"
                        id="create_user_username"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="username"
                        value={formData.username}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="create_user_email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="create_user_email"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="w-full p-4 flex flex-col">
                    <label className="block mb-2 font-medium" htmlFor="create_user_password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="create_user_password"
                        className="w-full px-4 py-2 rounded outline-none border-none text-black focus:outline-ascent"
                        name="password"
                        value={formData.password}
                        onChange={handleFormChange}
                    />
                </div>

                <div className="w-full p-4 flex flex-col">
                    <button type="submit" className="bg-ascent uppercase p-4 border-none rounded font-bold cursor-pointer">
                        Create User
                    </button>
                </div>
            </form>
        </div>
    );
}
