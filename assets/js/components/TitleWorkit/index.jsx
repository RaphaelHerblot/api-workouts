import React from 'react';
import './style.scss';

// Generic title for the app

const TitleWorkit = ({ title, icon }) => {
    return ( 
        <div className="title-workit">
            <div className="icon-hexagone"> 
                <img src={require("/assets/images/icons/hexagone.svg")} />
                <img className="icon-custom" src={require("/assets/images/icons/" + icon + ".svg")} />
            </div>
            <h2>{title}</h2>
        </div>
    );
}
 
export default TitleWorkit;