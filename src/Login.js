import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Giriş yapma işlemleri (API çağrısı vs.) burada yapılacak
        console.log("Giriş yapılıyor:", { email, password });
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Giriş Yap</h2>
            <form onSubmit={handleLogin} className="flex flex-col">
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Şifre:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                    Giriş Yap
                </button>
            </form>
            <p className="mt-4 text-center text-gray-700">
                Hesabın yok mu? 
                <span 
                    onClick={navigateToRegister} 
                    className="text-blue-500 cursor-pointer hover:underline"
                >
                    Kaydol
                </span>
            </p>
        </div>
    );
};

export default Login;
