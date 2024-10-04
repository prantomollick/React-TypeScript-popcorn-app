import React, { useEffect, useRef } from "react";

type SearchProps = {
    query: string;
    onSetQuery: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ query, onSetQuery }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    inputRef.current?.focus();

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (document.activeElement === inputRef.current) {
                return;
            }
            if (e.key === "Enter") {
                inputRef.current?.focus();
                onSetQuery("");
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, [onSetQuery]);

    // useEffect(() => {
    //     const el = document.querySelector(".search") as HTMLInputElement;
    //     el.focus();
    // }, []);

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
            ref={inputRef}
        />
    );
};

export default Search;
