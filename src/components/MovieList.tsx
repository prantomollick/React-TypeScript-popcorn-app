import React from "react";
import Movie from "./Movie";

export type Movies = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

const MovieList: React.FC<{
    movies: Movies[];
    onSelectMovie: (id: string) => void;
}> = ({ movies, onSelectMovie }) => {
    return (
        <ul className="list list-movies">
            {movies?.map((movie) => (
                <Movie
                    key={movie.imdbID}
                    {...movie}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
};

export default MovieList;
