import React from "react";

export type MovieProps = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
    onSelectMovie: (id: string) => void;
};

const Movie: React.FC<MovieProps> = ({
    imdbID,
    Poster,
    Title,
    Year,
    onSelectMovie
}) => {
    return (
        <li onClick={() => onSelectMovie(imdbID!)}>
            <img src={Poster} alt={`${Title} poster`} />
            <h3>{Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{Year}</span>
                </p>
            </div>
        </li>
    );
};

export default Movie;
