import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { signIn, signInWithGoogle, loading, error, clearErrors } = useAuthStore();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        clearErrors();
        try {
            await signIn(formData.email, formData.password);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        clearErrors();
        try {
            await signInWithGoogle();
            navigate('/home');
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <div className="h-screen w-screen bg-[#1a1a1a] overflow-hidden relative">

            {/* === Desktop Layout (md and up) === */}
            <div className="hidden md:grid grid-cols-2 h-full">
                <div className="relative">
                    <img className="w-full h-full object-cover" src="photo11login.jpg" alt="slide" />
                </div>

                <div className="bg-[#1a1a1a] flex flex-col justify-center p-10">
                    <h1 className="text-white text-4xl font-bold mb-4">Login to an existing account</h1>
                    <p className="text-gray-400 mb-6">
                        Don't have an account?
                        <Link to="/signup" className="text-[#cfff33] ml-1">Sign Up</Link>
                    </p>

                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#cfff33] text-black py-3 rounded font-semibold w-full"
                        >
                            {loading ? 'LOADING...' : 'Login'}
                        </button>
                    </form>

                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-600"></div>
                        <span className="text-gray-400 mx-2 text-sm">or sign in with</span>
                        <div className="flex-grow h-px bg-gray-600"></div>
                    </div>

                    <div className="flex gap-4">
                        <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full" onClick={handleGoogleSignIn}>
                            <img src="google.png" className="h-5 w-5 mr-2" /> Google
                        </button>
                        <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full">
                            <img src="apple.webp" className="h-5 w-5 mr-2" /> Apple
                        </button>
                    </div>
                </div>
            </div>

            {/* === Mobile Layout (below md) === */}
            <div className="block md:hidden">
                <img className="w-full h-full object-cover absolute top-0 left-0" src="loginPic.jpg" alt="slide" />

                <div className="relative flex flex-row justify-evenly p-4 gap-6 items-center mt-6">
                    <Link to="/login" className="text-white text-[15px] michroma-regular drop-shadow-xl">Login</Link>
                    <Link to="/signup" className="text-white text-[15px] michroma-regular drop-shadow-xl">Sign Up</Link>
                </div>

                <div className="relative p-5 flex flex-col mt-72">
                    <h2 className="michroma-regular text-white text-3xl">WELCOME BACK,</h2>
                    <h2 className="gothic-regular text-white text-2xl mt-[-8px]">CHAMP!</h2>
                </div>

                <form onSubmit={handleLogin} className="relative">
                    <div className="flex flex-col items-center mt-20">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className="border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4"
                            required
                        />
                        <button type="button" className="text-[#cfff33] text-sm p-3 relative left-16 flex justify-end cursor-pointer">
                            Forgot Password?
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <div className="relative flex flex-row gap-6 justify-center mt-10">
                        <div className="w-14 h-14 bg-[#333333] rounded-full">
                            <img src="apple.webp" className="p-3 mt-[-3px]" />
                        </div>
                        <div
                            onClick={handleGoogleSignIn}
                            className="w-14 h-14 bg-[#333333] rounded-full flex items-center cursor-pointer">
                            <img src="google.png" className="p-2" />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="gothic-regular bg-[#cfff33] rounded-full px-6 ml-6"
                        >
                            {loading ? 'LOADING...' : 'LOGIN'}
                        </button>
                    </div>

                    <div className="flex justify-center mt-6">
                        <span className="text-white">Don't have an account? </span>
                        <Link to="/signup" className="text-[#cfff33] ml-2">Sign Up</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;
