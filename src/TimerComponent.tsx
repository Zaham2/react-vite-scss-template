import { useState, useEffect, useRef } from 'react';

const TimerComponent = () => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [totalDuration, setTotalDuration] = useState<number>(300);
    const [hasCompleted, setHasCompleted] = useState<boolean>(false);
    const intervalRef = useRef<number>();

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = window.setInterval(() => {
                setElapsedTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            intervalRef.current !== undefined && clearInterval(intervalRef.current);
        }
    }, [totalDuration, isRunning]);

    useEffect(() => {
        if (totalDuration - elapsedTime <= 0) {
            timerCompleted();
        }
    }, [elapsedTime]);

    useEffect(() => {
        if (hasCompleted) {
            console.log("fetch request to backend to update the time");
        }
    }, [hasCompleted]);

    const resetTimer = () => {
        setIsRunning(false);
        setElapsedTime(0);
    };

    const timerCompleted = () => {
        setHasCompleted(true);
        resetTimer();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (!isNaN(value)) {
            setTotalDuration(value);
        }
    };

    const convertTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const progress = (elapsedTime / totalDuration) * 100;
    const dashArray = 2 * Math.PI * 45;
    const dashOffset = dashArray * ((100 - progress) / 100);

    return (
        <div className="flex flex-col items-center justify-center gap-4 relative w-1/4 h-1/4 mx-auto my-auto">
            <svg
                className="relative w-full h-full -rotate-90"
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
                        strokeDashoffset: dashOffset ?? 0,
                    }}
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
                {convertTime(totalDuration - elapsedTime)}
            </div>
            <div className="flex flex-col items-center top-14 left-1/2  w-full max-w-xs">
                <input
                    type="range"
                    min="0"
                    max="3600"
                    value={totalDuration}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    className="w-3/4"
                    step={300}
                />
                <input
                    type="text"
                    value={totalDuration}
                    onChange={handleInputChange}
                    disabled={isRunning}
                    className="w-1/2 text-center"
                    placeholder="Enter time"
                />
                <div className="text-sm text-gray-500">
                    seconds
                </div>
            </div>
            <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                {!isRunning ? (
                    <button
                        onClick={() => setIsRunning(true)}
                        className="w-1/4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={() => setIsRunning(false)}
                        className="w-1/4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Stop
                    </button>
                )}
                <button
                    onClick={resetTimer}
                    className="w-1/4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default TimerComponent;
