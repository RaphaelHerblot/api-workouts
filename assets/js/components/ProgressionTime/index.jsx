import React from "react";
import "./style.scss";

const ProgressionTime = ({ percentTime, firstTime }) => {
    return (
        <div className="progression-time-container">
            <div className="progression-time-bar">
                <div className="progression-time" style={{width: firstTime + percentTime+"%"}}>
                </div>
            </div>
        </div>
    );
};

export default ProgressionTime;
