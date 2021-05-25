import React, { useState, useEffect } from "react";
import "./style.scss";

const ProgressionTime = ({ percentTime }) => {
    const [completed, setCompleted] = useState(0);

    console.log(percentTime);
    return (
        <div className="progression-time-container">
            <div className="progression-time-bar">
                <div className="progression-time" style={{width: percentTime+"%"}}>
                </div>
            </div>
        </div>
    );
};

export default ProgressionTime;
