import React from "react";

export type WatchedMovieProps = {
    imdbID?: string;
    Title: string;
    Year?: string;
    Poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
};

const WatchedMovie: React.FC<WatchedMovieProps> = ({
    Title,
    Poster,
    runtime,
    imdbRating,
    userRating
}) => {
    return (
        <li>
            <img src={Poster} alt={`${Title} poster`} />
            <h3>{Title}</h3>
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
            </div>
        </li>
    );
};

export default WatchedMovie;
