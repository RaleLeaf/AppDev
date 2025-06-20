import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const slides = [
  {
    image: '/image1.jpg',
    lines: ['SELECT YOUR OWN ROUTINE,', 'IN YOUR OWN SCHEDULE'],
  },
  {
    image: '/image2.jpg',
    lines: ['CREATE A WORKOUT PLAN', 'TO STAY FIT'],
  },
  {
    image: '/image3.jpg',
    lines: ['ACTION IS THE', 'KEY TO ALL SUCCESS'],
    button: true,
  },
];

function Test() {
  const userDetails = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleClick = (e) => {
    const x = e.clientX;
    const mid = window.innerWidth / 2;
    if (x > mid) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  return (
    <div
      className="h-screen w-screen bg-[#1a1a1a] overflow-hidden relative"
      onClick={handleClick}
    >
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={slides[currentSlide].image}
        alt="slide"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a]"></div>

      <div className="absolute bottom-28 w-full flex flex-col items-center justify-center kanit-bold text-2xl tracking-wide">
      {slides[currentSlide].button && (
          <div className="pt-8">
            <button 
            onClick={() => userDetails('/UserDetails')}
            className="bg-[#cfff33] mb-7 p-2 w-[150px] rounded-2xl text-black text-lg font-bold">
              Start Now
            </button>
          </div>
        )}

        {slides[currentSlide].lines.map((line, index) => (
          <h3 key={index} className="text-white">
            {line}
          </h3>
        ))}

        
      </div>

      <div className="absolute bottom-10 w-full flex justify-center gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-6 rounded-full ${
              currentSlide === index ? 'bg-lime-300' : 'bg-gray-600'
            } transition-all duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Test;
