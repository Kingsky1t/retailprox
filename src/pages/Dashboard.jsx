import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Dashboard() {
    const something = useSelector(state => state.shopify)
    const dispatch = useDispatch();
    console.log("something", something)

    useEffect(() => {

    }, [])
    return 'dashboard';
}
