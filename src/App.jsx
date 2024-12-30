import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import ChannelsPage from './pages/ChannelsPage';
import Auth from './pages/Auth';
import PageNotFound from './pages/PageNotFound';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ProtectedRoutes({ children }) {
    const accessToken = localStorage.getItem('retailprox_accesstoken');
    return accessToken ? children : <Navigate to="/auth" replace />;
}

function AuthRedirect({ children }) {
    const accessToken = localStorage.getItem('retailprox_accesstoken');
    return accessToken ? <Navigate to="/" replace /> : children;
}

export default function App() {
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    console.log(user);

    useEffect(() => {
        if (user) {
            navigate('/');
        } else {
            navigate('/auth');
        }
    }, [user]);
    return (
        <main className="app">
            <Routes>
                <Route
                    path="/auth"
                    element={
                        <AuthRedirect>
                            <Auth />
                        </AuthRedirect>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ProtectedRoutes>
                            <Navigation />
                            <div className="app-content">
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/channels" element={<ChannelsPage />} />
                                    <Route path="/orders" element={<OrdersPage />} />
                                    <Route path="*" element={<PageNotFound />} />
                                </Routes>
                            </div>
                        </ProtectedRoutes>
                    }
                />
            </Routes>
        </main>
    );
}
