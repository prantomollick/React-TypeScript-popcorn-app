import { useEffect, useRef } from "react";

export const useKey = (KEY: string, action: () => void): void => {
    const actionRef = useRef(action);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === KEY.toLowerCase()) {
                actionRef.current();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [KEY]);
};
