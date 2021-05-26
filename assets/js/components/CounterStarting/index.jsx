import React, { useState, useEffect } from 'react';
import ThreeDotsLoader from '../Loader/ThreeDotsLoader';
import './style.scss';

// Countdown after launching a certain workout 

const CounterStarting = ({ startingNumber, workoutTitle }) => {
    return ( 
        <div className="counter-start">
            <h2>
                {workoutTitle
                    ? workoutTitle 
                    : <ThreeDotsLoader />
                }
            </h2>
            <h1>{startingNumber}</h1>
        </div>
    );
}
 
export default CounterStarting;