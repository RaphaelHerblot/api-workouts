import React, { useEffect } from 'react';
import TitleWorkit from '../../components/TitleWorkit';

// Work in progress

const Calendar = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Agenda");
    }, [])

    return ( 
        <div>
            <TitleWorkit title="Calendrier" icon="calendar-orange2" />
            <img src={require("/assets/images/under-construction.svg")} />
        </div>
    );
}
 
export default Calendar;