import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../redux/NotificationSlice';
import { useEffect } from 'react';

export default function Notification() {
    const dispatch = useDispatch();
    const { message, showNotification } = useSelector(state => state.notification);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                dispatch(hideNotification());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showNotification, dispatch]);

    if (!showNotification) {
        return null;
    }

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-80 bg-white text-black text-center  animate-notification-slide-down flex flex-col rounded">
            <div className="w-full h-1 bg-ascent animate-border-timer rounded"></div>
            <div className="flex justify-between items-center gap-4 p-4">
                <p className="">{message}</p>
                <button onClick={() => dispatch(hideNotification())} className="">
                    ✖
                </button>
            </div>
        </div>
    );
}
