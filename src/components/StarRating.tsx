import React, { useState } from "react";
import Star from "./Star";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px"
};

const starContainerStyle = {
    display: "flex"
};

type StarRatingProps = {
    maxRating?: number;
    color?: string;
    size?: number;
    className?: string;
    messages?: string[];
    defaultRating?: number;
    onSetRating?: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className,
    messages,
    defaultRating = 0,
    onSetRating
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTemprating] = useState(0);

    const handleRating = (rating: number) => {
        setRating(rating);
        if (onSetRating) onSetRating(rating);
    };

    const handleChange = (tempRating: number) => {
        setTemprating(tempRating);
    };

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        color,
        fontSize: `${size / 1.5}px`
    };

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={
                            tempRating ? tempRating >= i + 1 : rating >= i + 1
                        }
                        color={color}
                        size={size}
                        onClick={() => handleRating(i + 1)}
                        onMouseEnter={() => handleChange(i + 1)}
                        onMouseLeave={() => handleChange(0)}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages?.length === maxRating
                    ? messages[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
};

export default StarRating;
