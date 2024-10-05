import { useEffect } from "react";

export const useTitle = (title: string): void => {
    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;

        return () => {
            document.title = "usePopcorn";
        };
    }, [title]);
};
