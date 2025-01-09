import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyGoogleToken } from '../redux/UserSlice';

const AuthSuccessPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const hasRun = useRef(false); // Ref to track if the effect has run

    useEffect(() => {
        if (hasRun.current) return; // Prevent duplicate execution
        hasRun.current = true;

        const token = searchParams.get('token');
        if (token) {
            localStorage.setItem('retailprox_accesstoken', token);
            // console.log("Token is stored in Local",token);
            dispatch(verifyGoogleToken(token))
                .unwrap()
                .then(() => {
                    navigate('/dashboard');
                })
                .catch((err) => {
                    console.error('Token verification failed:', err);
                    navigate('/auth');
                });
        } else {
            navigate('/auth'); 
        }
    }, [dispatch, navigate, searchParams]);

    return <div>Validating token, please wait...</div>;
};

export default AuthSuccessPage;
