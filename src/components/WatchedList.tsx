import React from "react";
import WatchedMovie from "./WatchedMovie";
import { type WatchedMovie as WatchedMovieProps } from "../App";

type Props = {
    watched: WatchedMovieProps[];
};

const WatchedList: React.FC<Props> = ({ watched }) => {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie key={movie.imdbID} {...movie} />
            ))}
        </ul>
    );
};

export default WatchedList;
