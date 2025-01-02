import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import ChannelsPage from './pages/ChannelsPage';
import Products from './pages/Products';
import Customers from './pages/Customer';
import Auth from './pages/Auth';
import PageNotFound from './pages/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './pages/Home';
import { verifyUserToken } from './redux/UserSlice';
import ChannelManage from './pages/ChannelManage';

function ProtectedRoutes({ children }) {
    const { user } = useSelector(state => state.user);
    return user ? (
        <>
            <Navigation />
            <div className="app-content">
                <Outlet />
            </div>
        </>
    ) : (
        <Navigate to="/auth" replace />
    );
}

function AuthRedirect() {
    const { user } = useSelector(state => state.user);
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default function App() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    console.log("User",user);

    useEffect(() => {
        if (!user) {
            dispatch(verifyUserToken());
        }
    }, [user]);

    return (
        <main className="app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthRedirect />}>
                    <Route index element={<Auth />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/channels">
                        <Route index element={<ChannelsPage />} />
                        <Route path=":channelId" element={<ChannelManage />} />
                    </Route>
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/inventory" element={<Products />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </main>
    );
}
