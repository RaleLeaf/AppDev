import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useUser } from '../hooks/useUser';

function UserDetails() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { updateCurrentUser, loading: userLoading, error: userError } = useUser();
    const [formData, setFormData] = useState({ 
        gender: '', 
        dateOfBirth: '', 
        weight: '', 
        height: '', 
        fitnessLevel: '', 
        workoutFrequency: '' 
    });
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');

    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0];

    useEffect(() => {
        // Redirect to login if user is not authenticated
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    const handleNext = () => {
        setError(''); // Clear previous errors
        
        // Validate current step
        if (step === 1 && !formData.gender) {
            setError('Please select your gender');
            return;
        }
        
        if (step === 2) {
            if (!formData.dateOfBirth) {
                setError('Please select your birthday');
                return;
            }
            if (!formData.weight) {
                setError('Please enter your weight');
                return;
            }
            if (!formData.height) {
                setError('Please enter your height');
                return;
            }
        }
        
        if (step === 3 && !formData.fitnessLevel) {
            setError('Please select your fitness level');
            return;
        }
        
        if (step === 4 && !formData.workoutFrequency) {
            setError('Please select your workout frequency');
            return;
        }
        
        if (step === 4 && formData.workoutFrequency) {
            setStep(5);
            return;
        }
        
        setStep(prev => prev + 1);
    };

    const handleBack = () => setStep(prev => prev - 1);

    const handleFinalSubmit = async () => {
        if (!user?.uid && !user?.id) {
            setError('User not authenticated');
            return;
        }
        
        // Validate required fields
        if (!formData.gender || !formData.dateOfBirth || !formData.weight || !formData.height || !formData.fitnessLevel || !formData.workoutFrequency) {
            setError('Please fill in all required fields');
            return;
        }
        
        try {
            // Calculate age from birthday for validation
            const birthDate = new Date(formData.dateOfBirth);
            const today = new Date();
            let calculatedAge = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                calculatedAge--;
            }
            
            // Optional: validate age range
            if (calculatedAge < 13 || calculatedAge > 100) {
                setError('Please enter a valid birth date (age must be between 13 and 100)');
                return;
            }
            
            const updateData = {
                gender: formData.gender,
                dateOfBirth: formData.dateOfBirth,
                weight: formData.weight ? Number(formData.weight) : null,
                height: formData.height ? Number(formData.height) : null,
                fitnessLevel: formData.fitnessLevel,
                preferences: { 
                    workoutFrequency: formData.workoutFrequency ? Number(formData.workoutFrequency) : null 
                }
            };

            await updateCurrentUser(updateData);
            navigate('/home');
        } catch (err) {
            console.error('Profile save error', err);
            setError('Failed to save profile. Please try again.');
        }
    };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Loading state */}
      {userLoading && (
        <div className="fixed inset-0 bg-[#1a1a1a] bg-opacity-90 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#cfff33]"></div>
        </div>
      )}
      
      {step === 1 && (
        <>
          <div className="pt-24 md:pt-10 flex justify-center">
            <h2 className="gothic-regular md:text-4xl text-xl tracking-wide text-white">TELL US ABOUT YOURSELF!</h2>
          </div>
          <div className="flex justify-center">
            <h4 className="michroma-regular text-[10px] md:text-sm pt-3 tracking-wide text-white text-center">
              TO GIVE YOU A BETTER EXPERIENCE, <br /> WE NEED TO KNOW YOUR GENDER
            </h4>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-40 p-16">
            {['male', 'female'].map(g => (
              <div
                key={g}
                onClick={() => handleChange('gender', g)}
                className={`w-36 h-36 md:w-64 md:h-64 rounded-full flex justify-center items-center flex-col cursor-pointer 
                  ${formData.gender === g ? 'bg-[#cfff33]' : 'bg-[#404040]'}`}
              >
                <img src={`${g}.png`} className="w-24 h-24 md:w-32 md:h-32" />
                <h2 className={`michroma-regular text-[10px] md:text-sm tracking-wider
                  ${formData.gender === g ? 'text-black font-bold' : 'text-white'}`}>
                  {g.toUpperCase()}
                </h2>
              </div>
            ))}
          </div>

          {(error || userError) && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-sm'>{error || userError}</h3>
            </div>
          )}

          <div className="p-12 flex pt-20 pl-64 md:pl-[500px] justify-end">
            <button
              onClick={handleNext}
              className="bg-[#cfff33] mb-7 p-2 w-[120px] md:w-[200px] gothic-regular text-[15px] md:text-2xl tracking-widest rounded-full text-black text-lg font-bold"
            >
              NEXT
            </button>
          </div>
        </>
      )}


      {step === 2 && (
        <>
          <div className="pt-24 md:pt-0 flex justify-center">
            <h2 className="gothic-regular md:text-4xl text-xl tracking-wide text-white">TELL US ABOUT YOURSELF!</h2>
          </div>
          <div className="flex justify-center">
            <h4 className="michroma-regular text-[10px] md:text-sm pt-3 tracking-wide text-white text-center">
              TO CREATE YOUR PERSONALIZED PLAN, <br /> WE NEED YOUR BIRTHDAY, WEIGHT, AND HEIGHT
            </h4>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-32 p-8 md:pt-24">
            <div className="flex flex-col items-center">
              <h3 className="gothic-regular text-lg md:text-2xl mb-4 text-white">BIRTHDAY</h3>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                min={minDate}
                max={maxDate}
                className="bg-[#3a3a3a] text-white p-3 rounded text-center text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-[#cfff33] focus:border-transparent"
              />
            </div>

            <div className="flex flex-col items-center">
              <h3 className="gothic-regular text-lg md:text-2xl mb-2 text-white">WEIGHT</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleChange('weight', Math.max((formData.weight || 50) - 1, 30))}
                  className="bg-[#333333] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex justify-center items-center text-lg md:text-2xl"
                >
                  -
                </button>
                <input
                  type="number"
                  min="30"
                  max="200"
                  value={formData.weight || ''}
                  onChange={(e) => handleChange('weight', parseInt(e.target.value))}
                  placeholder="50"
                  className="appearance-none bg-transparent border-b-2 border-[#cfff33] text-center w-16 md:w-24 text-xl md:text-3xl text-white focus:outline-none placeholder-gray-500"
                />
                <span className="gothic-regular ml-1 text-sm md:text-lg">kg</span>
                <button
                  onClick={() => handleChange('weight', Math.min((formData.weight || 50) + 1, 200))}
                  className="bg-[#333333] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex justify-center items-center text-lg md:text-2xl"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="gothic-regular text-lg md:text-2xl mb-2 text-white">HEIGHT</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleChange('height', Math.max((formData.height || 170) - 1, 120))}
                  className="bg-[#333333] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex justify-center items-center text-lg md:text-2xl"
                >
                  -
                </button>
                <input
                  type="number"
                  min="120"
                  max="250"
                  value={formData.height || ''}
                  onChange={(e) => handleChange('height', parseInt(e.target.value))}
                  placeholder="170"
                  className="appearance-none bg-transparent border-b-2 border-[#cfff33] text-center w-16 md:w-24 text-xl md:text-3xl text-white focus:outline-none placeholder-gray-500"
                />
                <span className="gothic-regular ml-1 text-sm md:text-lg">cm</span>
                <button
                  onClick={() => handleChange('height', Math.min((formData.height || 170) + 1, 250))}
                  className="bg-[#333333] text-white w-10 h-10 md:w-14 md:h-14 rounded-full flex justify-center items-center text-lg md:text-2xl"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {(error || userError) && (
            <div className="flex items-center justify-center">
              <h3 className="text-red-700 michroma-regular text-sm">{error || userError}</h3>
            </div>
          )}

          <div className="p-12 flex pt-4 md:pt-24 flex-row items-center">
            <div className="absolute left-0 px-8 md:px-64">
              <button
                onClick={handleBack}
                className="bg-[#2b2b2b] mb-7 p-2 w-[50px] h-[50px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
              >
                <img src="arrow_back.png" />
              </button>
            </div>

            {/* Next Button (Bottom Right) */}
            <div className="absolute right-0 px-8 md:px-64">
              <button
                onClick={handleNext}
                className="bg-[#cfff33] mb-7 p-2 w-[120px] md:w-[200px] gothic-regular text-[15px] md:text-2xl tracking-widest rounded-full text-black text-lg font-bold"
              >
                NEXT
              </button>
            </div>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="pt-24 md:pt-0 flex justify-center">
            <h2 className="gothic-regular md:text-4xl text-xl tracking-wide text-center text-white">
              HOW MANY TIMES A WEEK CAN YOU WORKOUT?
            </h2>
          </div>
          <div className="flex justify-center">
            <h4 className="michroma-regular text-[9px] md:text-sm pt-3 tracking-wide text-white text-center">
              THIS HELPS US CREATE YOUR PERSONALIZED PLAN
            </h4>
          </div>

          {/* Fitness Level Options */}
          <div className="flex flex-col items-center gap-6 p-8 md:pt-24 md:gap-12">
            {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((fitnessLevel) => (
              <div
                key={fitnessLevel}
                onClick={() => handleChange('fitnessLevel', fitnessLevel)}
                className={`cursor-pointer text-center gothic-regular tracking-wider
                  text-base md:text-3xl px-6 py-2 md:px-10 md:py-4 rounded-full
                  ${
                    formData.fitnessLevel === fitnessLevel
                      ? 'bg-[#cfff33] text-black font-bold'
                      : 'bg-[#404040] text-white hover:bg-gray-700'
                  }`}
              >
                {fitnessLevel}
              </div>
            ))}
          </div>

          {/* Error */}
          {(error || userError) && (
            <div className="flex items-center justify-center">
              <h3 className="text-red-700 text-center michroma-regular text-sm">{error || userError}</h3>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="p-12 flex pt-4 md:pt-24 flex-row items-center">
            {/* Back Button */}
            <div className="absolute left-0 px-8 md:px-64">
              <button
                onClick={handleBack}
                className="bg-[#2b2b2b] mb-7 p-2 w-[50px] h-[50px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
              >
                <img src="arrow_back.png" alt="back" />
              </button>
            </div>

            {/* Next Button */}
            <div className="absolute right-0 px-8 md:px-64">
              <button
                onClick={handleNext}
                className="bg-[#cfff33] mb-7 p-2 w-[120px] md:w-[200px] gothic-regular text-[15px] md:text-2xl tracking-widest rounded-full text-black text-lg font-bold"
              >
                NEXT
              </button>
            </div>
          </div>
        </>
      )}


      {step === 4 && (
        <>
          <div>
              <div className="pt-10 flex justify-center">
                <h2 className="gothic-regular text-2xl tracking-wide text-center text-white">HOW MANY TIMES A WEEK CAN YOU WORKOUT?</h2>
              </div>
              <div className="flex justify-center">
                <h4 className="michroma-regular text-[9px] pt-3 tracking-wide text-white text-center">
                THIS HELPS US CREATE YOUR PERSONALIZED PLAN
                </h4>
              </div>
            </div>

            <div className="flex flex-row items-center gap-6 p-16">
            <div className="h-[400px] overflow-y-scroll rounded w-32 mx-auto text-center michroma-regular text-4xl justify-center">
              {Array.from({ length:  7}, (_, i) => i + 1).map((workoutFrequency) => (
                <div
                  key={workoutFrequency}
                  className={`p-5 cursor-pointer ${
                    formData.workoutFrequency == workoutFrequency ? 'bg-[#cfff33] p-3 text-black font-bold text-center rounded-full' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleChange('workoutFrequency', workoutFrequency)}
                >
                  {workoutFrequency}
                </div>
              ))}
            </div>
              <div className='text-white right-[110px]'>
                <h3 className='gothic-regular text-xl'>TIME/S A WEEK</h3>
              </div>
              
          </div>

          {(error || userError) && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-center text-sm'>{error || userError}</h3>
            </div>
          )}
          
            <div className="p-12 flex pt-4 flex-row items-center">
              <div className='absolute left-0 px-8'>
                <button
                    onClick={handleBack}
                    className="bg-[#2b2b2b] mb-7 p-2 w-[50px] h-[50px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
                  >
                    <img src="arrow_back.png"/>
                </button>
              </div>

              <div className='absolute right-0 px-8'>
                <button
                  onClick={handleFinalSubmit}
                  disabled={userLoading}
                  className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold disabled:opacity-50"
                >
                  {userLoading ? 'SAVING...' : 'START'}
                </button>
              </div>
                
          </div>
          
        </>
      )}

      {step === 5 && (
        <div className="text-center">
          <h2 className="text-2xl font-bold">Summary</h2>
          <p className="mt-4 text-sm">Gender: {formData.gender}</p>
          <p className="text-sm">Age: {formData.age}</p>
          <p className="text-sm">Weight: {formData.weight} kg</p>
          <p className="text-sm">Height: {formData.height} cm</p>
          <p className="text-sm">Fitness Level: {formData.fitnessLevel}</p>
          <p className="text-sm">Workout Frequency: {formData.workoutFrequency} days/week</p>
        </div>
      )}

      </div>
    );
  }

export default UserDetails;
