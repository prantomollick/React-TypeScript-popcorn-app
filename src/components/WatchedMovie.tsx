import React from "react";

import { type WatchedMovie as WatchedMovieProps } from "../App";

const WatchedMovie: React.FC<
    WatchedMovieProps & { onDeletedWatched: (id: string) => void }
> = ({
    onDeletedWatched,
    imdbID,
    title,
    poster,
    runtime,
    imdbRating,
    userRating
}) => {
    return (
        <li>
            <img src={poster} alt={`${title} poster`} />
            <h3>{title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{runtime} min</span>
                </p>

                <button
                    className="btn-delete"
                    onClick={() => onDeletedWatched(imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
};

export default WatchedMovie;
