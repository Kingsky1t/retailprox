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
import { changeActiveStore, logout } from '../redux/UserSlice';
import { useState } from 'react';
import smallLogo from '../assets/retailprox-logo.svg';

// export default function Navigation() {
//     const {
//         user: { username, email, stores },
//         activeStore,
//     } = useSelector(state => state.user);
//     const dispatch = useDispatch();

//     const location = useLocation();
//     const isActive = path => (location.pathname === path ? 'bg-highlight' : '');

//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const toggleDropdown = () => {
//         setDropdownOpen(prev => !prev);
//     };
//     console.log(activeStore);
//     return (
//         <div className="navigation-container">
//             <h2 className="px-4 border-b">
//                 <Link to="/">
//                     <img src={logo} alt="RetailProX" />
//                 </Link>
//             </h2>
//             <div>
//                 <select 
//                     onChange={event => dispatch(changeActiveStore(event.target.value))} 
//                     className="flex w-full p-2 px-4 appearance-none cursor-pointer">
//                     {stores.map(store => (
//                         <option key={store.storeId} value={JSON.stringify(store)}>
//                             {store.storeName}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <div className="flex flex-col my-2 items-start text-lg grow overflow-auto hide-scrollbar">
//                 <Link to="/dashboard" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/dashboard')}`}>
//                     <FaHome /> Dashboard
//                 </Link>

//                 <Link to="/channels" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/channels')}`}>
//                     <FaBroadcastTower /> Channels
//                 </Link>

//                 <Link to="/pos" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/pos')}`}>
//                     <FaCubes /> POS
//                 </Link>

//                 <Link to="/inventory" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/inventory')}`}>
//                     <FaClipboardList /> Inventory
//                 </Link>

//                 <Link to="/orders" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/orders')}`}>
//                     <FaShoppingCart /> Orders
//                 </Link>

//                 <Link to="/customers" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/customers')}`}>
//                     <FaUserAlt /> Customers
//                 </Link>

//                 <Link to="/logistics" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/logistics')}`}>
//                     <FaShippingFast /> Logistics
//                 </Link>

//                 <Link to="/marketing" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/marketing')}`}>
//                     <FaChartLine /> Marketing
//                 </Link>

//                 <Link
//                     to="/global-and-compliance"
//                     className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/global-and-compliance')}`}
//                 >
//                     <FaGlobe /> Global and Compliance
//                 </Link>

//                 <Link to="/security" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/security')}`}>
//                     <FaShieldAlt /> Security
//                 </Link>

//                 <Link
//                     to="/developer-tools"
//                     className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/developer-tools')}`}
//                 >
//                     <FaTools /> Developer Tools
//                 </Link>

//                 <Link to="/support" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/support')}`}>
//                     <FaHeadset /> Support
//                 </Link>
//             </div>
//             <div className="border-t-[1px] border-white w-full relative p-2">
//                 <div className="flex gap-2 items-center p-2 cursor-pointer" onClick={toggleDropdown}>
//                     <div className="flex justify-center items-center border-white border-2 p-1 rounded-full  overflow-hidden">
//                         <img src={smallLogo} alt="logo" className="w-[40px] h-[40px]" />
//                     </div>
//                     <div className="flex gap-1 flex-col w-3/5">
//                         <div className="text-xs font-medium">{username}</div>
//                         <div className="text-xs">{email}</div>
//                     </div>
//                     <div>{dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
//                 </div>
//                 {dropdownOpen && (
//                     <div className="absolute w-full bottom-[100%] border-y p-2 bg-background z-10">
//                         <Link to="/profile">
//                             <button className="w-full text-left px-4 py-2 hover:bg-highlight rounded">Profile</button>
//                         </Link>
//                         <button onClick={() => dispatch(logout())} className="w-full text-left px-4 py-2 hover:bg-highlight rounded">
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
export default function Navigation() {
    const {
        user: { username, email, stores },
        activeStore,
    } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const location = useLocation();
    const isActive = path => (location.pathname === path ? 'bg-highlight' : '');

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };
    
    console.log(activeStore);

    // Condition to show content even if no stores
    const hasStores = stores && stores.length > 0;

    return (
        <div className="navigation-container">
            <h2 className="px-4 border-b">
                <Link to="/">
                    <img src={logo} alt="RetailProX" />
                </Link>
            </h2>
            <div>
                {/* Show store selection only if stores are available */}
                {hasStores ? (
                    <select 
                        onChange={event => dispatch(changeActiveStore(event.target.value))} 
                        className="flex w-full p-2 px-4 appearance-none cursor-pointer"
                    >
                        {stores.map(store => (
                            <option key={store.storeId} value={JSON.stringify(store)}>
                                {store.storeName}
                            </option>
                        ))}
                    </select>
                ) : (
                    // Show a message if no stores are available
                    <div>No stores available</div>
                )}
            </div>
            <div className="flex flex-col my-2 items-start text-lg grow overflow-auto hide-scrollbar">
                <Link to="/dashboard" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/dashboard')}`}>
                    <FaHome /> Dashboard
                </Link>

                <Link to="/channels" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/channels')}`}>
                    <FaBroadcastTower /> Channels
                </Link>

                <Link to="/pos" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/pos')}`}>
                    <FaCubes /> POS
                </Link>

                <Link to="/inventory" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/inventory')}`}>
                    <FaClipboardList /> Inventory
                </Link>

                <Link to="/orders" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/orders')}`}>
                    <FaShoppingCart /> Orders
                </Link>

                <Link to="/customers" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/customers')}`}>
                    <FaUserAlt /> Customers
                </Link>

                <Link to="/logistics" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/logistics')}`}>
                    <FaShippingFast /> Logistics
                </Link>

                <Link to="/marketing" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/marketing')}`}>
                    <FaChartLine /> Marketing
                </Link>

                <Link
                    to="/global-and-compliance"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/global-and-compliance')}`}
                >
                    <FaGlobe /> Global and Compliance
                </Link>

                <Link to="/security" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/security')}`}>
                    <FaShieldAlt /> Security
                </Link>

                <Link
                    to="/developer-tools"
                    className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/developer-tools')}`}
                >
                    <FaTools /> Developer Tools
                </Link>

                <Link to="/support" className={`w-full px-8 py-3 hover:bg-highlight flex items-center justify-start gap-4 ${isActive('/support')}`}>
                    <FaHeadset /> Support
                </Link>
            </div>
            <div className="border-t-[1px] border-white w-full relative p-2">
                <div className="flex gap-2 items-center p-2 cursor-pointer" onClick={toggleDropdown}>
                    <div className="flex justify-center items-center border-white border-2 p-1 rounded-full  overflow-hidden">
                        <img src={smallLogo} alt="logo" className="w-[40px] h-[40px]" />
                    </div>
                    <div className="flex gap-1 flex-col w-3/5">
                        <div className="text-xs font-medium">{username}</div>
                        <div className="text-xs">{email}</div>
                    </div>
                    <div>{dropdownOpen ? <FaCaretUp /> : <FaCaretDown />}</div>
                </div>
                {dropdownOpen && (
                    <div className="absolute w-full bottom-[100%] border-y p-2 bg-background z-10">
                        <Link to="/profile">
                            <button className="w-full text-left px-4 py-2 hover:bg-highlight rounded">Profile</button>
                        </Link>
                        <button onClick={() => dispatch(logout())} className="w-full text-left px-4 py-2 hover:bg-highlight rounded">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
