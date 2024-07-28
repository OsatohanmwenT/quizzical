import React from "react";

export default function HeaderPage ({ startGameNow }) {
    return(
        <div className="container header">
            <h1 className="title">Quizzical</h1>
            <p className="description">Unlock your curiosity</p>
            <button onClick={startGameNow} className="start btn">Start quiz</button>
        </div>
    )
}