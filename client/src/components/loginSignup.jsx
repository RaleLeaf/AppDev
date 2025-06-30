import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function loginSignup() {
    
const [step, setStep] = useState(1);
const navigate = useNavigate();

const handleNext = () => {
    // setError('');
    setStep(prev => 2);
};

const handleBack = () => {
    setStep(prev => 1);
};

const handleLogin = () => {
    // Add your login logic here (validation, API calls, etc.)
    // For now, just navigate to homepage
    navigate('/home');
};

  return (
    <div className="h-screen w-screen overflow-x-hidden bg-[#1a1a1a]">
    {step === 1 && (
    <>
     <div className="h-screen w-screen bg-[#1a1a1a] overflow-x-hidden relative">

        <div className="hidden md:grid grid-cols-2 h-full">
        
        <div className="relative">
            <img className="w-full h-full object-cover" src="photo11login.jpg" alt="slide" />
        </div>

        <div className="bg-[#1a1a1a] flex flex-col justify-center p-10">
            <h1 className="text-white text-4xl font-bold mb-4">Login to an existing account</h1>
            <p onClick={handleNext} className="text-gray-400 mb-6">Don't have an account? <span className="text-[#cfff33] cursor-pointer">Sign Up</span></p>

            <input type="email" placeholder="Email" className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4" />
            <input type="password" placeholder="Password" className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4" />

            <button onClick={handleLogin} className="bg-[#cfff33] text-black py-3 rounded font-semibold">Login</button>

            <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="text-gray-400 mx-2 text-sm">or sign up with</span>
            <div className="flex-grow h-px bg-gray-600"></div>
            </div>

            <div className="flex gap-4">
            <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full">
                <img src="google.png" className="h-5 w-5 mr-2" /> Google
            </button>
            <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full">
                <img src="apple.webp" className="h-5 w-5 mr-2" /> Apple
            </button>
            </div>
        </div>
        </div>

    {step === 1 && (
    <div className="block md:hidden">
        <img className="w-full h-full object-cover absolute top-0 left-0" src="loginPic.jpg" alt="slide" />

        <div className='flex flex-row justify-evenly p-4 gap-6 items-center mt-6'>
        <button onClick={handleBack} className='text-white text-[15px] michroma-regular drop-shadow-xl'>Login</button>
        <button onClick={handleNext} className='text-white text-[15px] michroma-regular drop-shadow-xl'>Sign Up</button>
        </div>

        <div className='relative p-5 flex flex-col mt-72'>
        <h2 className='michroma-regular text-white text-3xl'>WELCOME BACK,</h2>
        <h2 className='gothic-regular text-white text-2xl mt-[-8px]'>CHAMP!</h2>
        </div>

        <div className='relative'>
        <div className='flex flex-col items-center mt-20'>
            <input type='email' placeholder='Email' className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4' />
            <input type='password' placeholder='Password' className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4' />
            <button className='text-[#cfff33] text-sm p-3 relative left-16 flex justify-end cursor-pointer'>Forgot Password?</button>
        </div>
        </div>

        <div className='relative flex flex-row gap-6 justify-center mt-10'>
        <div className='w-14 h-14 bg-[#333333] rounded-full'>
            <img src="apple.webp" className='p-3 mt-[-3px]'/>
        </div>
        <div className='w-14 h-14 bg-[#333333] rounded-full flex items-center'>
            <img src="google.png" className='p-2' />
        </div>
        <button onClick={handleLogin} className='gothic-regular bg-[#cfff33] rounded-full px-6 ml-6'>
            LOGIN
        </button>
        </div>
    </div>
    )}
    </div>

      </>
    )}
    

    {step === 2 && (
        <>
            {/* Desktop (md and up) */}
            <div className="hidden md:grid grid-cols-2 h-full">
            <div className="relative">
                <img
                className="w-full h-full object-cover"
                src="loginPic2.png"
                alt="slide"
                />
            </div>

            <div className="bg-[#1a1a1a] flex flex-col justify-center p-10">
                <h1 className="text-white text-4xl font-bold mb-4">Create a new account</h1>
                <p onClick={handleBack} className="text-gray-400 mb-6">
                Already have an account?{' '}
                <span className="text-[#cfff33] cursor-pointer">Login</span>
                </p>

                <input
                type="text"
                placeholder="Name"
                className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4"
                />
                <input
                type="email"
                placeholder="Email"
                className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4"
                />
                <input
                type="password"
                placeholder="Password"
                className="bg-[#3a3a3a] text-white p-3 w-full rounded mb-4"
                />

                <button onClick={handleLogin} className="bg-[#cfff33] text-black py-3 rounded font-semibold">
                Sign Up
                </button>

                <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-gray-600"></div>
                <span className="text-gray-400 mx-2 text-sm">or sign up with</span>
                <div className="flex-grow h-px bg-gray-600"></div>
                </div>

                <div className="flex gap-4">
                <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full">
                    <img src="google.png" className="h-5 w-5 mr-2" /> Google
                </button>
                <button className="bg-white text-black flex items-center justify-center py-2 px-4 rounded w-full">
                    <img src="apple.webp" className="h-5 w-5 mr-2" /> Apple
                </button>
                </div>
            </div>
            </div>

            <div className="block md:hidden">
            <img
                className="w-full h-full object-cover absolute top-0 left-0"
                src="loginPic2.png"
                alt="slide"
            />

            <div className="flex flex-row justify-evenly p-4 gap-6 items-center mt-6">
                <button
                onClick={handleBack}
                className="text-white text-[15px] michroma-regular drop-shadow-xl"
                >
                Login
                </button>
                <button
                onClick={handleNext}
                className="text-white text-[15px] michroma-regular drop-shadow-xl"
                >
                Sign Up
                </button>
            </div>

            <div className="relative p-5 flex flex-col mt-72">
                <h2 className="michroma-regular text-white text-3xl">HELLO ROOKIES,</h2>
                <h2 className="gothic-regular text-white text-2xl mt-[-8px]">
                Let's get you started!
                </h2>
            </div>

            <div className="relative">
                <div className="flex flex-col items-center mt-20">
                <input
                    type="text"
                    placeholder="Name"
                    className="border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4"
                />
                </div>
            </div>

            <div className="relative flex flex-row gap-6 justify-center mt-10">
                <div className="w-14 h-14 bg-[#333333] rounded-full">
                <img src="apple.webp" className="p-3 mt-[-3px]" />
                </div>
                <div className="w-14 h-14 bg-[#333333] rounded-full flex items-center">
                <img src="google.png" className="p-2" />
                </div>
                <button
                onClick={handleLogin}
                className="gothic-regular bg-[#cfff33] rounded-full px-6 ml-6"
                >
                SIGN UP
                </button>
            </div>
            </div>
        </>
        )}


    </div>
  );
}

export default loginSignup;