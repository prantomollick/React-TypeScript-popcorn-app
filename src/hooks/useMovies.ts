import { useEffect, useRef, useState } from "react";

export const useMovies = (query: string, handleCloseMovie: () => void) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const handleCloseMovieRef = useRef(handleCloseMovie);

    useEffect(() => {
        handleCloseMovieRef.current();

        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(
                    `http://www.omdbapi.com/?apikey=${
                        import.meta.env.VITE_OMDB_API_KEY
                    }&s=${query}`,
                    { signal: controller.signal }
                );

                if (!res.ok)
                    throw new Error(
                        "Something went wrong with fetching Movies"
                    );

                const data = await res.json();
                setMovies(data.Search);
                setError("");
            } catch (error) {
                if (error instanceof Error && error.name !== "AbortError") {
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

        return () => {
            controller.abort();
        };
    }, [query]);

    return {
        movies,
        error,
        isLoading
    };
};
