import React, { useState } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  format,
  addDays,
  subMonths,
  addMonths,
  startOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
} from "date-fns";

export default function FitnessDashboard() {
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const startWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start: startWeek, end: addDays(startWeek, 6) });

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(selectedDate, { weekStartsOn: 1 }));

    const visibleWeekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addDays(currentWeekStart, 6),
    });

    const goToPreviousWeek = () => {
    const newStart = addDays(currentWeekStart, -7);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart); // pwede ma change: auto select first day of week
    setCurrentMonth(newStart); // change if need: sync month if week crosses months
    };

    const goToNextWeek = () => {
    const newStart = addDays(currentWeekStart, 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(newStart);
    setCurrentMonth(newStart);
    };


    const changeMonth = (dir) => {
        setCurrentMonth(dir === "next" ? addMonths(currentMonth, 1) : subMonths(currentMonth, 1));
    };

    const dailyStats = {
        date: "2021-10-18",
        calories: 432,
        calorieGoal: 1200,
        steps: 6540,
        time: 45,
        heartRate: 72,
        finishedWorkouts: [
        { name: "Stability Training", time: "10:00" },
        { name: "Flash Cycling", time: "12:00" },
        ],
    }; //mao ni ang data nga magamit ani tanan @alec

  const percentage = (dailyStats.calories / dailyStats.calorieGoal) * 100;

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white font-sans relative">

        <div className="bg-[#333333] z-1 absolute w-screen h-56 rounded-3xl -mt-12"></div>

        <div className='flex flex-row p-4 mt-6 z-50'>
            <button className="text-white text-2xl mb-4 cursor-pointer z-50">
                <div className='h-10 w-10 rounded-full bg-[#1a1a1a]'>
                    <h3 className='pt-1'>←</h3>
                </div>
            </button>
            <div>
                <h1 className="absolute left-1/2 -translate-x-1/2 mt-1 text-xl italic text-white">
                    Progress Tracker
                </h1>
            </div>
        </div>

      <div className="flex flex-row p-3  -mt-10 relative items-center justify-center gap-4 z-50">
        <button onClick={() => changeMonth("prev")} className="text-white text-2xl">←</button>
        <button onClick={() => setShowPicker(true)} className="text-xl italic text-white">
          {format(currentMonth, "MMMM yyyy")}
        </button>
        <button onClick={() => changeMonth("next")} className="text-white text-2xl">→</button>
      </div>

        <div className="flex justify-between items-center mb-6 px-1 z-50">
        <button onClick={goToPreviousWeek} className="text-white text-2xl px-2 z-50">←</button>

        <div className="flex gap-2 justify-center items-center w-full max-w-md z-50">
            {visibleWeekDays.map((day, i) => (
            <button
                key={i}
                onClick={() => setSelectedDate(day)}
                className={`flex flex-col items-center px-2 py-2 rounded-full ${
                format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                    ? "bg-lime-400 text-black"
                    : "text-gray-400"
                }`}
            >
                <div className="text-xs">{format(day, "EEEEE")}</div>
                <div className="text-sm">{format(day, "d")}</div>
            </button>
            ))}
        </div>

        <button onClick={goToNextWeek} className="text-white text-2xl px-2 z-50">→</button>
        </div>


      {showPicker && (
        <div className="absolute top-24 left-1/2 transform  -translate-x-1/2 bg-[#2a2a2a] p-4 rounded-xl shadow-lg z-50">
          <h3 className="text-center font-bold mb-2">
            Pick a Date - {format(currentMonth, "MMMM yyyy")}
          </h3>
          <div className="grid grid-cols-5 gap-2 text-sm jus">
            {eachDayOfInterval({
              start: startOfMonth(currentMonth),
              end: endOfMonth(currentMonth),
            }).map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setCurrentMonth(date);
                  setShowPicker(false);
                }}
                className={`p-2 rounded-full ${
                  format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                    ? "bg-lime-400 text-black"
                    : "hover:bg-gray-700"
                }`}
              >
                {format(date, "d")}
              </button>
            ))}
          </div>
          <div className="flex justify-center mt-3">
            <button onClick={() => setShowPicker(false)} className="text-sm text-lime-400">
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center flex-col justify-center gap-4 mb-6 px-3">
        <div className="w-52 h-52 mt-4">
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: "#EF4444",
              trailColor: "#333333",
            })}
          >
            <div className="text-center">
              <p className="text-xl font-bold">{dailyStats.calories} / {dailyStats.calorieGoal}</p>
              <p className="text-xs text-gray-400">Calorie Goal</p>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="bg-lime-400 text-black text-sm p-3 rounded-xl">
          <p>Goal for today:</p>
          <p className="font-semibold">
            Finish a Workout
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 mb-6 px-4 justify-center">
        <StatCard label="Steps" value={dailyStats.steps} color="lime" />
        <StatCard label="Time" value={`${dailyStats.time} min`} color="red" />
        <StatCard label="Heart" value={`${dailyStats.heartRate} bpm`} color="orange" />
      </div>

      <h2 className="font-semibold text-lg mb-3 px-4">Finished Workout</h2>
      <div className="space-y-2 px-4">
        {dailyStats.finishedWorkouts.map((w, i) => (
          <div key={i} className="bg-[#333333] rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{w.name}</p>
              <p className="text-sm text-yellow-300">{w.time}</p>
            </div>
            <div className="text-lime-400 text-xl">✔</div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-zinc-800 flex justify-around items-center h-14">
        {/* Home Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        
        {/* Stats/Leaderboard Icon */}
        <button className="flex flex-col items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        
        {/* Clipboard/Workouts Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        
        {/* Bell/Notification Icon - Active */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        {/* Profile Icon */}
        <button className="flex flex-col items-center justify-center text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </nav>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const ringColor = {
    lime: "border-lime-400",
    red: "border-red-500",
    orange: "border-orange-400",
  }[color];

  return (
    <div className={`rounded-full border-4 ${ringColor} w-24 h-24 flex flex-col justify-center items-center text-sm`}>
      <p className="font-bold">{value}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  );
  // mao ning pang change2 sa nawng sa mga circle progress bars, ako gisuwayan unta gradient colors but idk how
}
