import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import ChannelsPage from './pages/ChannelsPage';

export default function App() {
    return (
        <main className="app">
            <Navigation />
            <div className='app-content'>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/channels" element={<ChannelsPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                </Routes>
            </div>
        </main>
    );
}
