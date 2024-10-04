import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { type WatchedMovie } from "../App";

type Rating = {
    Source: string;
    Value: string;
};

type Movie = {
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
    watched: WatchedMovie[];

    onCloseMovie: () => void;
    onAddWatch: (movie: WatchedMovie) => void;
};

const MovieDetails: React.FC<MovieDetailsProps> = ({
    selectedId,
    watched,
    onCloseMovie,
    onAddWatch
}) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [rating, setRating] = useState(0);
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

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

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

    useEffect(() => {
        if (!title) return;
        document.title = `Movie | ${title}`;
    }, [title]);

    const handleAdd = () => {
        if (!title || !poster || !year || !rating) return;

        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime?.split(" ").at(0)),
            userRating: rating
        };

        onAddWatch(newWatchedMovie);
        onCloseMovie();
    };

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
                            {!isWatched ? (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setRating}
                                    />
                                    {rating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to list
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p>
                                    You rated the movie! {watchedUserRating}{" "}
                                    <span>⭐</span>
                                </p>
                            )}
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
