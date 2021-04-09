import React, { useEffect, useState } from 'react';
import WorkoutsAPI from "../../../services/workoutsAPI";
import Pagination from '../../Pagination/Pagination';
import WorkoutPreview from './WorkoutPreview';
import { Link } from "react-router-dom";


const WorkoutsList = props => {
    const [workouts, setWorkouts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    // Get all workouts
    const fetchWorkouts = async () => {
        try {
            const data = await WorkoutsAPI.findAll();
            setWorkouts(data);
        } catch(error) {
            console.log(error.response)
        }
    }

    // Getting all workouts when component loads
    useEffect(() => {
        fetchWorkouts();
    }, [])

    // Deleting a workout
    const handleDelete = async id => {
        const originalWorkouts = [...workouts];

        setWorkouts(workouts.filter(workout => workout.id !== id));
        
        try {
            await WorkoutsAPI.delete(id)
        } catch(error) {
            setWorkouts(originalWorkouts);
        }
    }

    // Searching a workout
    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
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
            <div className="d-flex justify-content-between align-items-center">
                <h1>Créer votre workout</h1>
                <Link to="/create" className="btn btn-primary">Créer</Link>
            </div>
            <div className="form-group">
                <input 
                    type="text" 
                    onChange={handleSearch} 
                    value={search} 
                    className="form-control" 
                    placeholder="Rechercher ..."
                />
            </div>            

            {paginatedWorkouts.map(workout => 
                <Link key={workout.id} to={"/workout/" + workout.id}>
                    <WorkoutPreview workout={workout} />
                </Link>
            )}
            
            {itemsPerPage < filteredWorkouts.length} <Pagination 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                length={filteredWorkouts.length} 
                onPageChanged={handlePageChange} 
            />
        </div>
    );
}

export default WorkoutsList;