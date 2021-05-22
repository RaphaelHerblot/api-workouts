import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import SearchBar from '../../components/SearchBar/SearchBarWorkouts';
import TitleWorkit from '../../components/TitleWorkit';
import Pagination from '../../components/Pagination';
import WorkoutPreview from '../../components/Workouts/WorkoutsList/WorkoutPreview';
import WorkoutsAPI from "../../services/workoutsAPI";
import WorkoutPreviewLoader from '../../components/Loader/WorkoutPreviewLoader';


const Search = ({ setPageTitle }) => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchWorkouts = async () => {
        try {
            const data = await WorkoutsAPI.findAll();
            setWorkouts(data);
            setIsLoading(false);
        } catch(error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        setPageTitle("Découvrir");
        fetchWorkouts();
    }, [])

    // Searching a workout
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const itemsPerPage = 2;

    // Filtering workouts by search terms
    const filteredWorkouts = workouts.filter(
        workout => 
            workout.title.toLowerCase().includes(search.toLowerCase()) ||
            workout.description.toLowerCase().includes(search.toLowerCase())
    );

    // Data pagination
    const paginatedWorkouts = Pagination.getData(filteredWorkouts, currentPage, itemsPerPage);

    return ( 
        <div>
            <TitleWorkit title="Recherche ta séance" icon="loupe-orange" />
            {(isLoading 
                ? 
                    <div>
                        <WorkoutPreviewLoader />
                        <WorkoutPreviewLoader />
                    </div>
                : 
                    <div>
                        <SearchBar workouts={workouts} search={search} setSearch={setSearch} setCurrentPage={setCurrentPage} placeholder="Recherche une séance de sport" />
                        <div>
                            {paginatedWorkouts.map((workout, index) => 
                                <div key={workout.id}>
                                    {index < 30 
                                        ?
                                        <Link to={"/workout/" + workout.id}>
                                            <WorkoutPreview workout={workout} />
                                        </Link>
                                        : ''
                                    }
                                </div>
                            )}      
                        </div>  
                        {itemsPerPage < filteredWorkouts.length} <Pagination 
                            currentPage={currentPage} 
                            itemsPerPage={itemsPerPage} 
                            length={filteredWorkouts.length} 
                            onPageChanged={handlePageChange} 
                        />
                    </div>
            )}
        </div>
    );
}
 
export default Search;