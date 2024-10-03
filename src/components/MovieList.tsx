import React from "react";
import Movie, { MovieProps } from "./Movie";

const MovieList: React.FC<{
    movies: MovieProps[];
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
