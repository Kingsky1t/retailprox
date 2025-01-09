import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/UserSlice';
import logo from '../assets/RetailProX logo.png';

export default function AuthPage() {
    const [isShowLogin, setShowLogin] = useState(true);

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <div className="flex justify-center w-full pb-10">
                <img src={logo} alt="RetailProX" className='w-[20rem]' />
            </div>
                <div className="w-full flex items-start justify-center">
                    <Login isShowLogin={isShowLogin} setShowLogin={setShowLogin} />
                    <Register isShowLogin={isShowLogin} setShowLogin={setShowLogin} />
                </div>
            </div>
        </>
    );
}

function Login({ isShowLogin, setShowLogin }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <div className={`
                w-full max-w-lg p-8 rounded flex flex-col gap-4 text-text transition duration-500
                ${isShowLogin ? 'opacity-100 translate-x-1/2' : 'opacity-0 -translate-x-full'}
              `}>
            <h2 className="text-3xl font-bold text-center">Sign in to your account</h2>
            <button className="w-full py-2 text-white bg-ascent rounded text-lg mt-4">
                Sign in with Google
            </button>
            <div className="flex items-center my-2">
                <div className="flex-grow h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow h-px bg-gray-300"></div>
            </div>
            <form
            onSubmit={handleFormSubmit} className='w-full max-w-lg rounded flex flex-col gap-4' >
            <div>
                <label htmlFor="login-email" className="block mb-2 text-md">
                    Email
                </label>
                <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded focus:outline-none bg-highlight focus:text-white"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label htmlFor="login-password" className="block mb-2 text-md">
                    Password
                </label>
                <input
                    type="password"
                    id="login-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded focus:outline-none bg-highlight focus:text-white"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-ascent rounded text-lg mt-4">
                Sign in
            </button>
            <button
                onClick={() => {
                    setShowLogin(false);
                }}
                type="button"
                className="w-full py-4 text-ascent hover:text-text bg-transparent border-none"
            >
                Don't have an Account? Sign up.
            </button>
        </form>
        </div>
    );
}

function Register({ isShowLogin, setShowLogin }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div className={`
            w-full max-w-lg p-8 rounded flex flex-col gap-4 text-text transition duration-500
            ${isShowLogin ? 'opacity-0 translate-x-full' : 'opacity-100 -translate-x-1/2'}
          `}>
        <button className="w-full py-2 text-white bg-ascent rounded text-lg mt-4">
            Sign up with Google
        </button>
        <div className="flex items-center my-2">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <form
            onSubmit={handleFormSubmit}
            className='w-full max-w-lg rounded flex flex-col gap-4'
        >
            <div>
                <label htmlFor="register-name" className="block mb-2 text-md">
                    Name
                </label>
                <input
                    type="text"
                    id="register-name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded focus:outline-none bg-highlight focus:text-white"
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label htmlFor="register-email" className="block mb-2 text-md">
                    Email
                </label>
                <input
                    type="email"
                    id="register-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded focus:outline-none bg-highlight focus:text-white"
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label htmlFor="register-password" className="block mb-2 text-md">
                    Password
                </label>
                <input
                    type="password"
                    id="register-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded focus:outline-none bg-highlight focus:text-white"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-ascent rounded text-lg font-bold mt-4">
                Register
            </button>
            <button
                onClick={() => {
                    setShowLogin(true);
                }}
                type="button"
                className="w-full py-2 text-ascent hover:text-text bg-transparent border-none"
            >
                Already have an Account? Login here.
            </button>
        </form>
        </div>
    );
}
