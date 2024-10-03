import { useEffect, useState } from "react";

import Logo from "./components/Logo";
import Main from "./components/Main";
import Navigation from "./components/Navigation";
import NumRestult from "./components/NumRestult";
import Search from "./components/Search";

import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";
import { tempMovieData, tempWatchedData } from "./data";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails";

function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<null | string>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }&s=${query}`
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching Movies"
                    );

                const data = await res.json();
                setMovies(data.Search);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                    setError(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (query.length < 3) {
            setMovies([]);
            setError("");
            return; // prevent unnecessary API calls
        }

        fetchMovies();

        return () => {};
    }, [query]);

    const handleSelectMovie = (id: string) => {
        setSelectedId((curId) => (curId === id ? null : id));
    };

    const handleCloseMovie = () => {
        setSelectedId(null);
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
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedList watched={watched} />
                        </>
                    )}
                </Box>
            </Main>
        </>
    );
}

export default App;
