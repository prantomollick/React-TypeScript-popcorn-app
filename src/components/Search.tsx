import React from "react";

type SearchProps = {
    query: string;
    onSetQuery: (query: string) => void;
};

const Search: React.FC<SearchProps> = ({ query, onSetQuery }) => {
    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => onSetQuery(e.target.value)}
        />
    );
};

export default Search;
