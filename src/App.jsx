import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUserToken } from './redux/UserSlice';
import Navigation from './components/Navigation';
import DashboardPage from './pages/DashboardPage';
import OrdersPage from './pages/OrdersPage';
import ChannelsPage from './pages/ChannelsPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import AuthPage from './pages/AuthPage';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import ChannelDetailsPage from './pages/ChannelDetailsPage';
import ProfilePage from './pages/ProfilePage';
import PosPage from './pages/PosPage';
import LogisticsPage from './pages/LogisticsPage';
import MarketingPage from './pages/MarketingPage';
import GlobalAndCompliancePage from './pages/GlobalAndCompliancePage';
import SecurityPage from './pages/SecurityPage';
import DeveloperToolsPage from './pages/DeveloperToolsPage';
import SupportPage from './pages/SupportPage';

function ProtectedRoutes({ user, loading }) {
    if (loading) return 'Loading...';
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

function AuthRedirect({ user, loading }) {
    if (loading) return 'Loading...';
    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default function App() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.user);

    useEffect(() => {
        if (!user) {
            dispatch(verifyUserToken());
        }
    }, [user]);

    return (
        <main className="app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthRedirect user={user} loading={loading} />}>
                    <Route index element={<AuthPage />} />
                </Route>
                <Route element={<ProtectedRoutes user={user} loading={loading} />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/channels">
                        <Route index element={<ChannelsPage />} />
                        <Route path=":channelId" element={<ChannelDetailsPage />} />
                    </Route>
                    <Route path="/pos" element={<PosPage />} />
                    <Route path="/inventory" element={<ProductsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/customers" element={<CustomersPage />} />
                    <Route path="/logistics" element={<LogisticsPage />} />
                    <Route path="/marketing" element={<MarketingPage />} />
                    <Route path="/global-and-compliance" element={<GlobalAndCompliancePage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/developer-tools" element={<DeveloperToolsPage />} />
                    <Route path="/support" element={<SupportPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </main>
    );
}
