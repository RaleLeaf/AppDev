import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import BottomNav from "./BottonNav";

export default function FitnessDashboard() {
    const navigate = useNavigate();
    const location = useLocation();

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

    const isActive = (path) => {
        return location.pathname === path;
    };

    const goToPreviousWeek = () => {
        const newStart = addDays(currentWeekStart, -7);
        setCurrentWeekStart(newStart);
        setSelectedDate(newStart);
        setCurrentMonth(newStart);
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
    };

    const percentage = (dailyStats.calories / dailyStats.calorieGoal) * 100;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
            {/* Sidebar Navigation for desktop */}
            <div className="hidden md:flex md:flex-col md:w-64 md:border-r border-zinc-800 md:p-6">
                <h1 className="text-2xl font-bold mb-10 kanit-medium">baSICK</h1>

                <nav className="flex-1">
                    <div className="space-y-2">
                        <button
                            onClick={() => navigate('/home')}
                            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/home') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span className="kanit-medium">Home</span>
                        </button>

                        <button
                            onClick={() => navigate('/progress')}
                            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/progress') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="kanit-medium">Progress</span>
                        </button>

                        <button
                            onClick={() => navigate('/feed')}
                            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/feed') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span className="kanit-medium">Feed</span>
                        </button>
                    </div>

                    <div className="mt-auto pt-20">
                        <button
                            onClick={() => navigate('/profile')}
                            className={`flex items-center w-full p-3 rounded-lg group ${isActive('/profile') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="kanit-medium relative">
                                Profile
                                <span className="absolute top-0 right-0 h-2 w-2 bg-lime-500 rounded-full"></span>
                            </span>
                        </button>

                        <button
                            onClick={() => navigate('/settings')}
                            className={`flex items-center w-full p-3 rounded-lg group mt-2 ${isActive('/settings') ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="kanit-medium">Settings</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col md:bg-[#1a1a1a] bg-[#1a1a1a]">
                {/* Mobile Header with back button */}
                <div className="md:hidden bg-[#333333] z-1 absolute w-screen h-56 rounded-3xl -mt-12"></div>

                <div className="md:hidden relative p-5 pb-10 flex items-center z-50">
                    <button className="p-2" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold kanit-bold mx-auto pr-8">Fitness Tracker</h1>
                </div>

                {/* Desktop Header */}
                <div className="hidden md:block p-5 pb-2">
                    <h1 className="text-3xl font-bold kanit-bold">FITNESS TRACKER</h1>
                </div>

                {/* Month Navigation */}
                <div className="flex flex-row p-3 md:-mt-0 -mt-10 relative items-center justify-center gap-4 z-50">
                    <button onClick={() => changeMonth("prev")} className="text-white text-2xl">←</button>
                    <button onClick={() => setShowPicker(true)} className="text-xl italic text-white">
                        {format(currentMonth, "MMMM yyyy")}
                    </button>
                    <button onClick={() => changeMonth("next")} className="text-white text-2xl">→</button>
                </div>

                {/* Week Navigation */}
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

                {/* Date Picker Modal */}
                {showPicker && (
                    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-[#2a2a2a] p-4 rounded-xl shadow-lg z-50">
                        <h3 className="text-center font-bold mb-2">
                            Pick a Date - {format(currentMonth, "MMMM yyyy")}
                        </h3>
                        <div className="grid grid-cols-5 gap-2 text-sm">
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

                {/* Progress Circle and Goal */}
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
                        <p className="font-semibold">Finish a Workout</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-8 mb-6 px-4 justify-center">
                    <StatCard label="Steps" value={dailyStats.steps} color="lime" />
                    <StatCard label="Time" value={`${dailyStats.time} min`} color="red" />
                    <StatCard label="Heart" value={`${dailyStats.heartRate} bpm`} color="orange" />
                </div>

                {/* Finished Workouts */}
                <div className="px-4 mb-20">
                    <h2 className="font-semibold text-lg mb-3">Finished Workout</h2>
                    <div className="space-y-2">
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
                </div>

                {/* Bottom Navigation (Mobile only) */}
                <div className="md:hidden">
                    <BottomNav />
                </div>
            </div>
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
}