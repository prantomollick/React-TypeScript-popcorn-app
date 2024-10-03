import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

type Rating = {
    Source: string;
    Value: string;
};

type MovieDetails = {
    Actors: string;
    Awards: string;
    Country: string;
    Director: string | null;
    Genre: string;
    Language: string;
    Metascore: string | null;
    Plot: string;
    Poster: string;
    Rated: string;
    Ratings: Rating[];
    Released: string;
    Response: string;
    Runtime: string;
    Title: string;
    Type: string;
    Writer: string;
    Year: string;
    imdbID: string;
    imdbRating: string;
    imdbVotes: string;
    totalSeasons: string;
};

type MovieDetailsProps = {
    selectedId: string;
    onCloseMovie: () => void;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({
    selectedId,
    onCloseMovie
}) => {
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: realesed,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie || {};

    console.log(title, year);

    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }&i=${selectedId}`
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with Feting Movie Details"
                    );

                const data = await res.json();
                setMovie(data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        getMovieDetails();
    }, [selectedId]);

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {realesed} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p>
                                <span>⭐</span>
                                {imdbRating} IMDb rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            <StarRating maxRating={10} size={24} />
                        </div>
                        <p>
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
};

export default MovieDetails;
