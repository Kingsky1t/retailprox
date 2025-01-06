import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate("/auth");
    };

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={handleRedirect} className="w-full py-2 text-white bg-ascent rounded text-lg font-bold mt-4">Login</button>
        </div>
    );
}
