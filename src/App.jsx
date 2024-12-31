import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import ChannelsPage from './pages/ChannelsPage';
import Auth from './pages/Auth';
import PageNotFound from './pages/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import HomePage from './pages/Home';
import { verifyUserToken } from './redux/UserSlice';

// function ProtectedRoutes({ children }) {
//     const accessToken = localStorage.getItem('retailprox_accesstoken');
//     return accessToken ? children : <Navigate to="/auth" replace />;
// }

// function AuthRedirect({ children }) {
//     const accessToken = localStorage.getItem('retailprox_accesstoken');
//     return accessToken ? <Navigate to="/dashboard" replace /> : children;
// }

function ProtectedRoutes({ children }) {
    const { user } = useSelector(state => state.user); // Trigger re-render on user state change
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

function AuthRedirect({ children }) {
    const { user } = useSelector(state => state.user); // Trigger re-render on user state change
    return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);
    console.log('user: ', user);

    useEffect(() => {
        if (!user) {
            dispatch(verifyUserToken());
        }
    }, [user]);

    return (
        <main className="app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/auth"
                    element={
                        <AuthRedirect>
                            <Auth />
                        </AuthRedirect>
                    }
                />
                <Route element={<ProtectedRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/channels" element={<ChannelsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
            </Routes>
        </main>
    );
}
