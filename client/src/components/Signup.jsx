import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Signup() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const { signUp, signInWithGoogle, isLoading, error, clearErrors } = useAuthStore();

    // Get the intended destination or default to home
    const from = location.state?.from?.pathname || '/home';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear validation errors when user starts typing
        if (validationErrors[name]) {
            setValidationErrors({
                ...validationErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};
        
        // Name validation
        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }
        
        // Email validation
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        
        // Confirm password validation
        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        clearErrors();
        
        // Validate form before submitting
        if (!validateForm()) {
            return;
        }
        
        try {
            await signUp(formData.name, formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Signup failed:', error);
            // Clear password fields on error
            setFormData({ 
                ...formData, 
                password: '', 
                confirmPassword: '' 
            });
        }
    };

    const handleGoogleSignIn = async () => {
        clearErrors();
        try {
            await signInWithGoogle();
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    };

    return (
        <div className="h-screen w-screen bg-[#1a1a1a] overflow-hidden relative">

            {/* === Desktop Layout (md and up) === */}
            <div className="hidden md:grid grid-cols-2 h-full">
                <div className="relative">
                    <img
                        className="w-full h-full object-cover"
                        src="photo11signup.jpg"
                        alt="slide"
                    />
                </div>

                <div className="bg-[#1a1a1a] flex flex-col justify-center p-10">
                    <h1 className="text-white text-4xl font-bold mb-4">Create a new account</h1>
                    <p className="text-gray-400 mb-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#cfff33]">Login</Link>
                    </p>

                    <form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className={`bg-[#3a3a3a] text-white p-3 w-full rounded mb-2 ${
                                validationErrors.name ? 'border-2 border-red-500' : ''
                            }`}
                            required
                        />
                        {validationErrors.name && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.name}</p>
                        )}
                        
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`bg-[#3a3a3a] text-white p-3 w-full rounded mb-2 ${
                                validationErrors.email ? 'border-2 border-red-500' : ''
                            }`}
                            required
                        />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.email}</p>
                        )}
                        
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`bg-[#3a3a3a] text-white p-3 w-full rounded mb-2 ${
                                validationErrors.password ? 'border-2 border-red-500' : ''
                            }`}
                            required
                        />
                        {validationErrors.password && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.password}</p>
                        )}
                        
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className={`bg-[#3a3a3a] text-white p-3 w-full rounded mb-2 ${
                                validationErrors.confirmPassword ? 'border-2 border-red-500' : ''
                            }`}
                            required
                        />
                        {validationErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mb-4">{validationErrors.confirmPassword}</p>
                        )}

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-[#cfff33] text-black py-3 rounded font-semibold w-full"
                        >
                            {isLoading ? 'SIGNING UP...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow h-px bg-gray-600"></div>
                        <span className="text-gray-400 mx-2 text-sm">or sign up with</span>
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
                <img
                    className="w-full h-full object-cover absolute top-0 left-0"
                    src="loginPic2.png"
                    alt="slide"
                />

                <div className="flex flex-row justify-evenly p-4 gap-6 items-center mt-6">
                    <Link to="/login" className="text-white text-[15px] michroma-regular drop-shadow-xl">Login</Link>
                    <Link to="/signup" className="text-white text-[15px] michroma-regular drop-shadow-xl">Sign Up</Link>
                </div>

                <div className="relative p-5 flex flex-col mt-72">
                    <h2 className="michroma-regular text-white text-3xl">HELLO ROOKIES,</h2>
                    <h2 className="gothic-regular text-white text-2xl mt-[-8px]">Let's get you started!</h2>
                </div>

                <form onSubmit={handleSignUp} className="relative">
                    <div className="flex flex-col items-center mt-20">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className={`border-b-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-2 p-3 px-4 ${
                                validationErrors.name ? 'border-red-500' : 'border-[#333333]'
                            }`}
                            required
                        />
                        {validationErrors.name && (
                            <p className="text-red-500 text-sm mb-2 text-center">{validationErrors.name}</p>
                        )}
                        
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            className={`border-b-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-2 p-3 px-4 ${
                                validationErrors.email ? 'border-red-500' : 'border-[#333333]'
                            }`}
                            required
                        />
                        {validationErrors.email && (
                            <p className="text-red-500 text-sm mb-2 text-center">{validationErrors.email}</p>
                        )}
                        
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className={`border-b-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-2 p-3 px-4 ${
                                validationErrors.password ? 'border-red-500' : 'border-[#333333]'
                            }`}
                            required
                        />
                        {validationErrors.password && (
                            <p className="text-red-500 text-sm mb-2 text-center">{validationErrors.password}</p>
                        )}
                        
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm Password"
                            className={`border-b-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-2 p-3 px-4 ${
                                validationErrors.confirmPassword ? 'border-red-500' : 'border-[#333333]'
                            }`}
                            required
                        />
                        {validationErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mb-2 text-center">{validationErrors.confirmPassword}</p>
                        )}
                        
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                    </div>

                    <div className="relative flex flex-row gap-6 justify-center mt-10">
                        <div className="w-14 h-14 bg-[#333333] rounded-full cursor-pointer">
                            <img src="apple.webp" className="p-3 mt-[-3px]" />
                        </div>
                        <div
                            onClick={handleGoogleSignIn}
                            className="w-14 h-14 bg-[#333333] rounded-full flex items-center cursor-pointer">
                            <img src="google.png" className="p-2" />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="gothic-regular bg-[#cfff33] rounded-full px-6 ml-6"
                        >
                            {isLoading ? 'SIGNING UP...' : 'SIGN UP'}
                        </button>
                    </div>

                    <div className="flex justify-center mt-6">
                        <span className="text-white">Already have an account? </span>
                        <Link to="/login" className="text-[#cfff33] ml-2">Login</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Signup;
