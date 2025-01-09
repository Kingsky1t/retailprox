import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/TeamSlice';
import CreateUserModal from '../components/CreateUserModal';
import Spinner from '../components/Spinner';

export default function TeamPage() {
    const dispatch = useDispatch();
    const [currentTab, setCurrentTab] = useState('users');

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div>
            <h1 className="text-4xl mb-4">Team</h1>

            <div className="my-2 py-4 flex gap-4 border-b">
                <span className={`py-2 px-4 rounded cursor-pointer ${currentTab === 'users' ? 'bg-highlight' : ''}`} onClick={() => setCurrentTab('users')}>
                    Users
                </span>
                <span className={`py-2 px-4 rounded cursor-pointer ${currentTab === 'roles' ? 'bg-highlight' : ''}`} onClick={() => setCurrentTab('roles')}>
                    Roles
                </span>
            </div>

            <div className="w-full overflow-auto hide-scrollbar">{currentTab === 'users' && <UsersTab />}</div>
        </div>
    );
}

const UsersTab = () => {
    const [openModal, setOpenModal] = useState(null);
    const { usersInTeam, loading } = useSelector(state => state.team);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="flex flex-col items-center relative">
            <div className="w-full flex justify-end">
                <button className="py-2 px-4 bg-ascent my-4 rounded" onClick={() => setOpenModal('create-user')}>
                    Create User
                </button>
            </div>
            <div className="overflow-x-auto w-full">
                {usersInTeam.length > 0 ? (
                    <table className="table-auto w-full border-collapse border">
                        <thead className="bg-ascent">
                            <tr>
                                <th className="border px-4 py-2 text-left">Username</th>
                                <th className="border px-4 py-2 text-left">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersInTeam.map((user, index) => (
                                <tr key={index} className="">
                                    <td className="border px-4 py-2">{user.username}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <span>No users found.</span>
                )}
            </div>
            {openModal && <div className="modal">{openModal === 'create-user' && <CreateUserModal setOpenModal={setOpenModal} />}</div>}
        </div>
    );
};
