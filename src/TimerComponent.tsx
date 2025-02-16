import { useEventSource } from "./lib/EventSource";

const TimerComponent = () => {
    useEventSource('timer', (data) => {
        console.log('Received timer event:', data);
    });

    return <div>Listening to timer events...</div>;
};

export default TimerComponent;
