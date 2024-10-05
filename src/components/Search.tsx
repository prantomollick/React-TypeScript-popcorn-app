import React, { useRef } from "react";

import { useKey } from "../hooks/useKey";

type SearchProps = {
    query: string;
    onSetQuery: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ query, onSetQuery }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    inputRef.current?.focus();

    useKey("enter", () => {
        if (document.activeElement === inputRef.current) return;
        inputRef.current?.focus();
        onSetQuery("");
    });

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
