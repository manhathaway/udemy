import { useState } from "react";


export default function CoreConcept({imgSrc, imgAlt, title, desc}) {
    const [coordinates, setCoordinates] = useState({
        x: "",
        y: ""
    });

    const {x, y} = coordinates;

    const handleMouseOver = (event) => {
        const { screenX, screenY } = event;
        setCoordinates(previous => {
            return {
                x: screenX,
                y: screenY
            };
        });
    };

    return (
        <li onMouseOver={handleMouseOver}>
            <img src={imgSrc} alt={imgAlt} />
            <h3>{title}</h3>
            <p>{desc}</p>
            {x && y && <p>{x}, {y}</p>}
        </li>
    );
};