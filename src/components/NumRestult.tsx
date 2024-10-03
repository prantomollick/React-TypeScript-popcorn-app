import React from "react";

type Props = {
    numOfResults: number;
};

const NumRestult: React.FC<Props> = ({ numOfResults }) => {
    return (
        <p className="num-results">
            Found <strong>{numOfResults}</strong> results
        </p>
    );
};

export default NumRestult;
