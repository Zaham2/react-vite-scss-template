import { useState, useEffect, useRef } from 'react';

const TimerComponent = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(3600); // 60 seconds default
    const intervalRef = useRef<number>();

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = window.setInterval(() => {
                setTime(prevTime => {
                    if (prevTime >= duration) {
                        stopTimer();
                        return duration;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        }
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        stopTimer();
        setTime(0);
    };

    const progress = (time / duration) * 100;
    const dashArray = 2 * Math.PI * 45; // Circle circumference
    const dashOffset = dashArray * ((100 - progress) / 100);

    return (
        <div className="relative w-1/2 h-1/2 mx-auto my-auto">
            <svg 
                className="w-full h-full -rotate-90" 
                viewBox="0 0 100 100"
            >
                <circle
                    className="fill-none stroke-gray-200 stroke-[8]"
                    cx="50"
                    cy="50"
                    r="45"
                />
                <circle
                    className="fill-none stroke-blue-500 stroke-[8] transition-all duration-100 ease-linear"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset,
                    }}
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {Math.floor(time)}s / {duration}s
            </div>
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2">
                {!isRunning ? (
                    <button 
                        onClick={startTimer}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Start
                    </button>
                ) : (
                    <button 
                        onClick={stopTimer}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Stop
                    </button>
                )}
                <button 
                    onClick={resetTimer}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TimerComponent;
