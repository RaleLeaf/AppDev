import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import SideNav from "./SideNav";

export default function FitnessDashboard() {
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-black text-white flex">
            {/* SideNav - Only visible on medium screens and up */}
            <SideNav />

            {/* Main Content */}
            <div className="flex-1 flex flex-col pb-20 md:pb-0 md:bg-[#1a1a1a] bg-[#1a1a1a]">
                {/* Content Container - Centered properly for all screen sizes */}
                <div className="w-full max-w-7xl mx-auto md:px-6 lg:ml-32 xl:mx-auto">
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
                </div>
            </div>
            
            {/* Bottom Navigation - Only visible on mobile and small tablets */}
            <div className="md:hidden fixed bottom-0 left-0 right-0">
                <BottomNav />
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