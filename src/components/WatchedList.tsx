import React from "react";
import WatchedMovie from "./WatchedMovie";
import { type WatchedMovie as WatchedMovieProps } from "../App";

type Props = {
    watched: WatchedMovieProps[];
    onDeletedWatched: (id: string) => void;
};

const WatchedList: React.FC<Props> = ({ watched, onDeletedWatched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie
                    key={movie.imdbID}
                    onDeletedWatched={onDeletedWatched}
                    {...movie}
                />
            ))}
        </ul>
    );
};

export default WatchedList;
