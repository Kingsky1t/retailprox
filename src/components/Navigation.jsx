import { Link } from 'react-router-dom';
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
} from 'react-icons/fa';
import logo from '../assets/RetailProX logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/UserSlice';

export default function Navigation() {
    const {
        user: { stores },
    } = useSelector(state => state.user);
    const dispatch = useDispatch();
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
                <Link to="/channels" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaBroadcastTower /> Channels
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaCubes /> POS
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaClipboardList /> Inventory
                </Link>

                <Link to="/orders" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaShoppingCart /> Orders
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaUserAlt /> Customers
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaShippingFast /> Logistics
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaChartLine /> Marketing
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaGlobe /> Global and Compliance
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaShieldAlt /> Security
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaTools /> Developer Tools
                </Link>
                <Link to="/" className="w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4">
                    <FaHeadset /> Support
                </Link>
            </div>
        </div>
    );
}
