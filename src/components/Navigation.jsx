import { Link, useLocation } from 'react-router-dom';
import {
    FaBroadcastTower,
    FaChartLine,
    FaClipboardList,
    FaCubes,
    FaGlobe,
    FaHeadset,
    FaHome,
    FaShieldAlt,
    FaShippingFast,
    FaShoppingCart,
    FaTools,
    FaUserAlt,
    FaCaretUp,
    FaCaretDown,
} from 'react-icons/fa';
import logo from '../assets/RetailProX logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { useState } from 'react';

export default function Navigation() {
    const {
        user: { stores },
    } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };
    return (
        <div className="navigation-container">
            <h2 className="px-4 border-b">
                <Link to="/">
                    <img src={logo} alt="RetailProX" />
                </Link>
            </h2>
            <div>
                <select name="" className="flex w-full p-2 px-4 appearance-none cursor-pointer">
                    {stores.map(store => (
                        <option key={store.storeId} value="">
                            {store.storeName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col my-2 items-start text-lg grow overflow-auto hide-scrollbar">
                <Link to="/dashboard" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaHome /> Dashboard
                </Link>
                <Link
                    to="/channels"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/channels') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaBroadcastTower /> Channels
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaCubes /> POS
                </Link>
                <Link
                    to="/inventory"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/inventory') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaClipboardList /> Inventory
                </Link>
                <Link
                    to="/orders"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/orders') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaShoppingCart /> Orders
                </Link>
                <Link
                    to="/customers"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/customers') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaUserAlt /> Customers
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaShippingFast /> Logistics
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaChartLine /> Marketing
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaGlobe /> Global and Compliance
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaShieldAlt /> Security
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaTools /> Developer Tools
                </Link>
                <Link
                    to="/"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/') ? 'bg-highlight text-active' : ''}`}
                >
                    <FaHeadset /> Support
                </Link>
            </div>
            <div className="border-t-[0.27px] border-white w-full mt-20 md:mt-auto p-1 relative">
                <div
                    className="flex gap-2 items-center px-5 pt-2 cursor-pointer"
                    onClick={toggleDropdown}
                >
                    <div
                        className="flex justify-center items-center text-xs whitespace-nowrap rounded-full border border-white"
                        style={{ width: '50px', height: '50px' }}
                    >
                        B+NG
                    </div>
                    <div className="flex flex-col w-[60%] px-2">
                        <div className="text-xs font-medium">Brad NextGen</div>
                        <div className="mt-1 text-xs">Brad@gmail.com</div>
                    </div>
                    <div>{dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
                </div>
                {dropdownOpen && (
                    <div className="absolute bottom-[100%] mb-2 bg-background shadow-lg border rounded-md w-[97%] z-10">
                        <button
                            onClick={() => alert('Profile clicked')}
                            className="w-full text-left px-4 py-2 hover:bg-highlight"
                        >
                            Profile
                        </button>
                        <button
                            onClick={() => dispatch(logout())}
                            className="w-full text-left px-4 py-2 hover:bg-highlight"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
