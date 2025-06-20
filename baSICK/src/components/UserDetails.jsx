import { useState } from 'react';
import 'tailwindcss/tailwind.css';

function UserDetails() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    gender: null,
    age: '',
    weight: '',
    height: '',
    fitnessLevel: '',
    workoutFrequency: ''
  });

  const [error, setError] = useState('');

  const handleNext = () => {
    const { gender, age, weight, height, fitnessLevel, workoutFrequency } = formData;

    switch (step) {
      case 1:
        if (!gender) return setError('Please select a gender.');
        break;
      case 2:
        if (!age || isNaN(age)) return setError('Please enter a valid age.');
        break;
      case 3:
        if (!weight || isNaN(weight)) return setError('Please enter a valid weight.');
        break;
      case 4:
        if (!height || isNaN(height)) return setError('Please enter a valid height.');
        break;
      case 5:
        if (!fitnessLevel) return setError('Please select a fitness level.');
        break;
      case 6:
        if (!workoutFrequency) return setError('Please select your preferred workout frequency.');
        break;
    }

    setError('');
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col items-center justify-center px-4 overflow-hidden">
      {step === 1 && (
        <>
          <div className="pt-24 flex justify-center">
            <h2 className="gothic-regular text-xl tracking-wide text-white">TELL US ABOUT YOURSELF!</h2>
          </div>
          <div className="flex justify-center">
            <h4 className="michroma-regular text-[10px] pt-3 tracking-wide text-white text-center">
              TO GIVE YOU A BETTER EXPERIENCE, <br /> WE NEED TO KNOW YOUR GENDER
            </h4>
          </div>

          <div className="flex flex-col items-center gap-12 p-16">
            {['male', 'female'].map(g => (
              <div
                key={g}
                onClick={() => handleChange('gender', g)}
                className={`w-36 h-36 rounded-full flex justify-center items-center flex-col cursor-pointer 
                  ${formData.gender === g ? 'bg-[#cfff33]' : 'bg-[#404040]'}`}
              >
                <img src={`${g}.png`} className="w-24 h-24" />
                <h2 className={`michroma-regular text-[10px] tracking-wider
                  ${formData.gender === g ? 'text-black font-bold' : 'text-white'}`}>
                  {g.toUpperCase()}
                </h2>
              </div>
            ))}
          </div>

          {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-sm'>{error}</h3>
            </div>
          )}

          <div className="p-12 flex pt-20 pl-64 justify-end">
            <button
              onClick={handleNext}
              className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
            >
              NEXT
            </button>
          </div>
        </>
      )}


       {step === 2 && (
         <>
          <div>
            <div className="pt-10 flex justify-center">
              <h2 className="gothic-regular text-2xl tracking-wide text-white">HOW OLD ARE YOU?</h2>
            </div>
            <div className="flex justify-center">
              <h4 className="michroma-regular text-[9px] pt-3 tracking-wide text-white text-center">
               THIS HELPS US CREATE YOUR PERSONALIZED PLAN
              </h4>
            </div>
          </div>

          <div className="flex flex-col items-center gap-12 p-16">
            <div className="h-[400px] overflow-y-scroll rounded w-32 mx-auto text-center michroma-regular text-4xl">
              {Array.from({ length: 71 }, (_, i) => i + 10).map((age) => (
                <div
                  key={age}
                  className={`p-5 cursor-pointer ${
                    formData.age == age ? 'bg-[#cfff33] text-black font-bold rounded-full' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleChange('age', age)}
                >
                  {age}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-sm'>{error}</h3>
            </div>
          )}

          <div className="p-12 flex pt-20 flex-row items-center">
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
                onClick={handleNext}
                className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
              >NEXT
              </button>
            </div>
              
          </div>

         </>
       )}


      {step === 3 && (
        <>
          <div>
            <div className="pt-10 flex justify-center">
              <h2 className="gothic-regular text-2xl tracking-wide text-white">WHAT'S YOUR WEIGHT?</h2>
            </div>
            <div className="flex justify-center">
              <h4 className="michroma-regular text-[9px] pt-3 tracking-wide text-white text-center">
               YOU CAN ALWAYS CHANGE THIS LATER
              </h4>
            </div>
          </div>

          

          <div className="flex flex-row items-center gap-6 p-16">
            <div className="h-[400px] overflow-y-scroll rounded w-32 mx-auto text-center michroma-regular text-4xl justify-center">
              {Array.from({ length:  151}, (_, i) => i + 30).map((weight) => (
                <div
                  key={weight}
                  className={`p-5 cursor-pointer ${
                    formData.weight == weight ? 'bg-[#cfff33] p-3 text-black font-bold text-center rounded-full' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleChange('weight', weight)}
                >
                  {weight}
                </div>
              ))}
            </div>
              <div className='text-white right-[110px]'>
                <h3 className='gothic-regular text-3xl'>kg</h3>
              </div>
          </div>

          {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-sm'>{error}</h3>
            </div>
          )}

          <div className="p-12 flex pt-20 flex-row items-center">
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
                onClick={handleNext}
                className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
              >NEXT
              </button>
            </div>
              
          </div>

        </>
      )}

      {step === 4 && (
        <>
          <div>
            <div className="pt-10 flex justify-center">
              <h2 className="gothic-regular text-2xl tracking-wide text-white">WHAT'S YOUR HEIGHT?</h2>
            </div>
            <div className="flex justify-center">
              <h4 className="michroma-regular text-[9px] pt-3 tracking-wide text-white text-center">
               THIS HELPS US CREATE YOUR PERSONALIZED PLAN
              </h4>
            </div>
          </div>

          <div className="flex flex-row items-center gap-6 p-16">
            <div className="h-[400px] overflow-y-scroll rounded w-32 mx-auto text-center michroma-regular text-4xl justify-center">
              {Array.from({ length:  151}, (_, i) => i + 100).map((height) => (
                <div
                  key={height}
                  className={`p-5 cursor-pointer ${
                    formData.height == height ? 'bg-[#cfff33] p-3 text-black font-bold text-center rounded-full' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleChange('height', height)}
                >
                  {height}
                </div>
              ))}
            </div>
              <div className='text-white right-[110px]'>
                <h3 className='gothic-regular text-3xl'>cm</h3>
              </div>
          </div>

          {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-sm'>{error}</h3>
            </div>
          )}

          <div className="p-12 flex pt-20 flex-row items-center">
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
                onClick={handleNext}
                className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
              >NEXT
              </button>
            </div>
              
          </div>
        </>
      )}

      {step === 5 && (
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

            <div className="flex flex-row items-center gap-6 p-16 pt-[70px]">
            <div className="h-[320px] overflow-y-scroll rounded w-full mx-auto text-center gothic-regular text-3xl justify-center items-center">
              {[
                "BEGINNER",
                "INTERMEDIATE",
                "ADVANCED",
              ].map((fitnessLevel) => (
                <div
                  key={fitnessLevel}
                  className={`p-5 cursor-pointer ${
                    formData.fitnessLevel == fitnessLevel ? 'bg-[#cfff33] p-5 text-black font-bold text-center rounded-full' : 'hover:bg-gray-700'
                  }`}
                  onClick={() => handleChange('fitnessLevel', fitnessLevel)}
                >
                  {fitnessLevel}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 text-center michroma-regular text-sm'>{error}</h3>
            </div>
          )}

            <div className="p-12 flex pt-24 flex-row items-center">
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
                  onClick={handleNext}
                  className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
                >NEXT
                </button>
              </div>
                
          </div>
        </>
      )}

      {step === 6 && (
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

          {/* {error && (
            <div className='flex items-center justify-center'>
              <h3 className='text-red-700 michroma-regular text-center text-sm'>{error}</h3>
            </div>
          )} */}
          
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
                  onClick={handleNext}
                  className="bg-[#cfff33] mb-7 p-2 w-[120px] gothic-regular text-[15px] tracking-widest rounded-full text-black text-lg font-bold"
                >START
                </button>
              </div>
                
          </div>
          
        </>
      )}

      {step === 7 && (
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
