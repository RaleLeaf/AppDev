import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { signUp, signInWithGoogle, loading, error, clearErrors } = useAuthStore();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        clearErrors();
        try {
            await signUp(formData.name, formData.email, formData.password);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed:', error);
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
            <img className="w-full h-full object-cover absolute top-0 left-0" src="loginPic2.png" alt="slide" />
            <div className='relative flex flex-row justify-between p-4 items-center mt-6'>
                <div></div>
                <div className='flex justify-end cursor-pointer'>
                    <img src="profilePic.png" className='w-[60px]' />
                </div>
            </div>
            <div className='p-5 flex flex-col mt-52'>
                <h2 className='relative gothic-regular text-white text-[35px]'>HELLO ROOKIES,</h2>
                <h2 className='relative michroma-regula text-white text-[15px] leading-snug pt-2'>Enter your information below or <br /> login with an existing account</h2>
            </div>
            <form onSubmit={handleSignUp} className='relative'>
                <div className='flex flex-col items-center mt-10'>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Name'
                        className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4'
                        required
                    />
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Email'
                        className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4'
                        required
                    />
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder='Password'
                        className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4'
                        required
                    />
                    {error && <p className='text-red-500 text-sm text-center mt-2'>{error}</p>}
                </div>
                <div className='relative flex flex-row gap-6 justify-center mt-5'>
                    <div className='w-14 h-14 bg-[#333333] rounded-full cursor-pointer'>
                        <img src="apple.webp" className='p-3 mt-[-3px]' />
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className='w-14 h-14 bg-[#333333] rounded-full flex items-center cursor-pointer'>
                        <img src="google.png" className='p-2' />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className='gothic-regular bg-[#cfff33] rounded-full px-6 ml-12'>
                        {loading ? 'SIGNING UP...' : 'SIGN UP'}
                    </button>
                </div>
                <div className='flex justify-center mt-6'>
                    <span className='text-white'>Already have an account? </span>
                    <Link to="/login" className='text-[#cfff33] ml-2'>Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Signup;
