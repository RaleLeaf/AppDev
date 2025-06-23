import React from 'react';
import BottomNav from './BottonNav';

const Appointment = () => {
  // Calendar data
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dates = [
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, 31]
  ];
  
  // Time slots
  const timeSlots = [
    { id: 1, time: '09:00 AM', selected: false },
    { id: 2, time: '09:30 AM', selected: true },
    { id: 3, time: '10:00 AM', selected: false }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col pb-8">
      {/* Header with back button and title */}
      <div className="p-5 flex items-center">
        <button className="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">APPOINTMENT</h1>
      </div>
      
      {/* Trainer Card */}
      <div className="px-5 mb-4">
        <div className="bg-zinc-900 rounded-lg p-3 flex items-center">
          {/* Trainer Image */}
          <div className="w-14 h-14 rounded-full overflow-hidden mr-3">
            <img 
              src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?q=80&w=200" 
              alt="Jennifer James" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Trainer Info */}
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium kanit-medium mr-2">Jennifer James</h3>
              <div className="bg-lime-500 text-black text-xs px-2 py-0.5 rounded-sm kanit-bold">
                4.9
              </div>
            </div>
            <p className="text-xs text-lime-500">Functional Strength</p>
            <p className="text-xs text-gray-400">2 years experience</p>
          </div>
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="px-5">
        {/* Month Navigation */}
        <div className="flex justify-between items-center mb-3">
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-base font-medium kanit-medium">October 2021</h2>
          <button className="p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="mb-6">
          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map((day, index) => (
              <div key={index} className="text-center text-xs text-gray-500">
                {day}
              </div>
            ))}
          </div>
          
          {/* Dates */}
          {dates.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
              {week.map((date, dateIndex) => {
                // Check if this is the selected date (20th)
                const isSelected = date === 20;
                const isPrevMonth = weekIndex === 0 && date > 20;
                
                return (
                  <div 
                    key={dateIndex} 
                    className={`text-center py-2 text-sm rounded-full 
                      ${isSelected ? 'bg-lime-500 text-black font-bold' : ''} 
                      ${isPrevMonth ? 'text-zinc-700' : 'text-white'}`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        {/* Time Selection */}
        <div className="mb-6">
          <h3 className="text-base mb-3">Time</h3>
          <div className="flex justify-between">
            {timeSlots.map((slot) => (
              <button 
                key={slot.id} 
                className={`py-2 px-5 rounded-full text-sm ${
                  slot.selected 
                    ? 'bg-lime-500 text-black font-medium' 
                    : 'bg-zinc-800 text-white'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
        
        {/* Next Button */}
        <button className="w-full py-3 bg-lime-500 rounded-full text-black font-medium kanit-medium">
          Next
        </button>
      </div>
      <BottomNav />
    </div>
  );
};

export default Appointment;