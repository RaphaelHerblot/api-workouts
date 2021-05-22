import React, { useEffect } from 'react';
import TitleWorkit from '../../components/TitleWorkit';

const Calendar = ({ setPageTitle }) => {
    useEffect(() => {
        setPageTitle("Agenda");
    }, [])

    return ( 
        <div>
            <TitleWorkit title="Calendrier" icon="calendar-orange2" />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit , sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </div>
    );
}
 
export default Calendar;