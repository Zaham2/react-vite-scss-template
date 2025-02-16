import { createContext, ReactNode, useContext, useEffect, useState } from "react";

// Create a context for the EventSource
const EventSourceContext = createContext<EventSource | null>(null);

// Create a provider component
export const EventSourceProvider = ({ children }: { children: ReactNode }) => {
    const [eventSource] = useState(() => 
        new EventSource("http://localhost:3000/timer/events")
    );

    useEffect(() => {
        return () => {
            // Cleanup: close the connection when component unmounts
            eventSource.close();
        };
    }, [eventSource]);

    return (
        <EventSourceContext.Provider value={eventSource}>
            {children}
        </EventSourceContext.Provider>
    );
};

// Custom hook to consume SSE events
export const useEventSource = (eventName: string, callback: (data: any) => void) => {
    const eventSource = useContext(EventSourceContext);

    useEffect(() => {
        if (!eventSource) return;

        const handleEvent = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            callback(data);
        };

        eventSource.addEventListener(eventName, handleEvent);

        return () => {
            eventSource.removeEventListener(eventName, handleEvent);
        };
    }, [eventSource, eventName, callback]);
};

export default EventSourceContext;
