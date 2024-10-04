import { useState } from "react";

import Logo from "./components/Logo";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import NumRestult from "./components/NumRestult";
import Search from "./components/Search";

import Box from "./components/Box";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import { useMovies } from "./hooks/useMovies";

export type WatchedMovie = {
    imdbID: string;
    title: string;
    year: string;
    poster: string;
    runtime: number;
    imdbRating: number;
    userRating: number;
};

export type TempMovie = {
    imdbID: string;
    Title: string;
    Year: string;
    Poster: string;
};

function App() {
    const [watched, setWatched] = useState<WatchedMovie[]>([]);
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<null | string>(null);

    const { movies, error, isLoading } = useMovies(query, () =>
        setSelectedId(null)
    );

    const handleCloseMovie = () => {
        setSelectedId(null);
    };
    const handleAddWatch = (movie: WatchedMovie) => {
        setWatched((watched) => [...watched, movie]);
    };

    const handleRemoveWatch = (id: string) => {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    };

    const handleSelectMovie = (id: string) => {
        setSelectedId((curId) => (curId === id ? null : id));
    };

    return (
        <>
            <Navigation>
                <Logo />
                <Search query={query} onSetQuery={setQuery} />
                <NumRestult numOfResults={movies?.length} />
            </Navigation>
            <Main>
                <Box>
                    {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatch={handleAddWatch}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList
                                watched={watched}
                                onDeletedWatched={handleRemoveWatch}
                            />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export default App;
