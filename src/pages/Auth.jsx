import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../redux/UserSlice';

export default function Auth() {
    const [isShowLogin, setShowLogin] = useState(true);

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                <h1 className="text-4xl font-bold mb-8">Welcome to RetailProX</h1>
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
        console.log(formData);
        dispatch(loginUser(formData));
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className={`
                w-full max-w-md p-8 bg-highlight rounded flex flex-col gap-4 text-text transition duration-500
                ${isShowLogin ? 'opacity-100 translate-x-1/2' : 'opacity-0 -translate-x-full'}
              `}
        >
            <h2 className="text-2xl font-bold text-center">Login</h2>
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
                    className="w-full px-4 py-2 rounded focus:outline-none"
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
                    className="w-full px-4 py-2 rounded focus:outline-none"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit" className="w-full py-2 text-white bg-ascent rounded text-lg font-bold mt-4">
                Login
            </button>
            <button
                onClick={() => {
                    setShowLogin(false);
                }}
                type="button"
                className="w-full py-2 text-ascent hover:text-text bg-transparent border-none"
            >
                Don't have an Account? Register here.
            </button>
        </form>
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
        <form
            onSubmit={handleFormSubmit}
            className={`
            w-full max-w-md p-8 bg-highlight rounded flex flex-col gap-4 text-text transition duration-500
            ${isShowLogin ? 'opacity-0 translate-x-full' : 'opacity-100 -translate-x-1/2'}
          `}
        >
            <h2 className="mb-4 text-2xl font-bold text-center">Register</h2>
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
                    className="w-full px-4 py-2 rounded focus:outline-none"
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
                    className="w-full px-4 py-2 rounded focus:outline-none"
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
                    className="w-full px-4 py-2 rounded focus:outline-none"
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
    );
}
