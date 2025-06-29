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

const handleSignUp = async (e) => {
    // For now, just navigate to homepage
    // Add your sign-up logic here (validation, API calls, etc.)
    navigate('/home');
 };

  return (
    <div className="h-screen w-screen bg-[#1a1a1a] overflow-hidden relative">
    {step === 1 && (
    <>
      <img className="w-full h-full object-cover absolute top-0 left-0" src="loginPic.jpg" alt="slide"/>

      <div className='relative flex flex-row justify-evenly p-4 gap-36 items-center mt-6'>
       <div className='flex flex-row gap-4 left-10 justify-start'>
            <div className='cursor-pointer'>
                <button
                onClick={handleBack}
                 className='text-white text-[15px] michroma-regular drop-shadow-xl'> Login </button>
            </div>
            <div className='cursor-pointer'>
                <button
                onClick={handleNext}
                className='text-white text-[15px] michroma-regular drop-shadow-xl'> Sign Up </button>
            </div>
       </div>
        <div className='flex justif y-end cursor-pointer'>
            <img src="profilePic.png" className='w-[60px]' />
        </div>
      </div>


      <div className='p-5 flex flex-col mt-52'>
        <div>
            <h2 className='relative michroma-regula text-white text-[40px]'>WELCOME BACK,</h2>
        </div>
        <div className='mt-[-20px]'>
            <h2 className='relative gothic-regular text-white text-[35px]'>CHAMP!</h2>
        </div>
      </div>

      <div className='relative'>
            <div className='flex flex-col items-center mt-10'>
                <input
                    type='email'
                    placeholder='Email'
                    className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4'
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4'
                />
                <button className='text-[#cfff33] text-sm p-3 relative left-16 flex justify-end cursor-pointer'>Forgot Password?</button>
            </div>
                
      </div>

      <div className='relative flex flex-row gap-6 justify-center mt-10'>
        <div className='w-14 h-14 bg-[#333333] rounded-full'>
            <img src="apple.webp" className='p-3 mt-[-3px]' />    
        </div>
        <div className='w-14 h-14 bg-[#333333] rounded-full flex items-center'>
            <img src="google.png" className='p-2' />
        </div>
        <button 
            onClick={handleSignUp}
            className='gothic-regular bg-[#cfff33] rounded-full px-6 ml-12'>
            SIGN UP
        </button>
      </div>

      </>
    )}

    {step === 2 && (
        <>
              <img className="w-full h-full object-cover absolute top-0 left-0" src="loginPic2.png" alt="slide"/>

                <div className='relative flex flex-row justify-evenly p-4 gap-36 items-center mt-6'>
                <div className='flex flex-row gap-4 left-10 justify-start'>
                    <div className='cursor-pointer'>
                        <button
                        onClick={handleBack}
                        className='text-white text-[15px] michroma-regular drop-shadow-xl'> Login </button>
                    </div>
                    <div className='cursor-pointer'>
                        <button
                        onClick={handleNext}
                        className='text-white text-[15px] michroma-regular drop-shadow-xl'> Sign Up </button>
                    </div>
                </div>
                <div className='flex justif y-end cursor-pointer'>
                    <img src="profilePic.png" className='w-[60px]' />
                </div>
                </div>


                <div className='p-5 flex flex-col mt-52'>
                <div>
                    <h2 className='relative gothic-regular text-white text-[35px]'>HELLO ROOKIES,</h2>
                </div>
                <div className='pt-[-30px] '>
                    <h2 className='relative michroma-regula text-white text-[15px] leading-snug'>Enter your information below or <br /> login with an existing account</h2>
                </div>
                </div>

                <div className='relative'>
                    <div className='flex flex-col items-center mt-10'>
                        <input
                            type='name'
                            placeholder='Name'
                            className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4'
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none mb-4 p-3 px-4'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='border-b-2 border-[#333333] bg-transparent text-white placeholder:text-gray-400 focus:outline-none p-3 px-4'
                        />
                        <button className='text-[#cfff33] text-sm p-3 relative left-16 flex justify-end cursor-pointer'>Forgot Password?</button>
                    </div>
                        
                </div>

                <div className='relative flex flex-row gap-6 justify-center mt-5'>
                <div className='w-14 h-14 bg-[#333333] rounded-full'>
                    <img src="apple.webp" className='p-3 mt-[-3px]' />    
                </div>
                <div className='w-14 h-14 bg-[#333333] rounded-full flex items-center'>
                    <img src="google.png" className='p-2' />
                </div>
                <button 
                    onClick={handleLogin}
                    className='gothic-regular bg-[#cfff33] rounded-full px-6 ml-12'>
                    LOGIN
                </button>
                </div>
        </>
    )}

    </div>
  );
}

export default loginSignup;