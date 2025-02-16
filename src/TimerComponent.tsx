
interface TimerProps {
    durationInSeconds?: number;
}
const TimerComponent = (props: TimerProps) => {

    // const

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white gap-20">
            <h1 className="text-4xl font-bold">Timer</h1>
            <div className="h-64 w-64 bg-transparent rounded-full border-8 border-gray-700"></div>
            <div className="flex flex-row gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Start</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">Stop</button>
            </div>
        </div>
    )
};

// {/* <p>{props.durationInSeconds ?? 0}</p> */}
export default TimerComponent;
