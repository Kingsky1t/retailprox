import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNotification } from '../redux/NotificationSlice';

export default function DashboardPage() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setNotification('welcome user'));
    }, []);
    return 'dashboard';
}
