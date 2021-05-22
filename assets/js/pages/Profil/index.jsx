import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import ProfilUpdate from '../../components/Profil/ProfilUpdate';
import WorkoutPreview from '../../components/Workouts/WorkoutsList/WorkoutPreview';
import AuthAPI from "../../services/authAPI";
import AuthContext from "../../contexts/AuthContext";

import './style.scss';


const Profil = ({ setPageTitle, history }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [updatingUser, setUpdatingUser] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [displayMyWorkouts, setDisplayMyWorkouts] = useState(false);
    const [displayFavoriteWorkouts, setDisplayFavoriteWorkouts] = useState(false);

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        history.push("/login");
    }

    const fetchUser = async () => {
        try {
            const dataUser = await AuthAPI.findConnectedUser();
            setAuthenticatedUser(dataUser.data);
            setUserLoaded(true);
        } catch(error) {
            console.log("Error : ", error.response)
        }
    }

    useEffect(() => {
        setPageTitle("Profil");
        fetchUser();
    }, [])

    useEffect(() => {
        console.log("Authenticate User : ", authenticatedUser)
    }, [authenticatedUser])

    const updateProfil = () => {
        setUpdatingUser(true);
    }

    const myWorkouts = ( event ) => {
        if(displayMyWorkouts) {
            setDisplayMyWorkouts(false);
        } else {
            setDisplayMyWorkouts(true);
            setDisplayFavoriteWorkouts(false);
        }

        event.target.classList.toggle("active");
        if(event.target.nextSibling.classList.contains('active')) {
            event.target.nextSibling.classList.remove("active");
        }
    }

    const myFavoriteWorkouts = ( event ) => {
        if(displayFavoriteWorkouts) {
            setDisplayFavoriteWorkouts(false);
        } else {
            setDisplayFavoriteWorkouts(true);
            setDisplayMyWorkouts(false);
        }

        event.target.classList.toggle("active");
        if(event.target.previousSibling.classList.contains('active')) {
            event.target.previousSibling.classList.remove("active");
        }
    }

    return ( 
        <div className="profile-container">
            <div className="centered-container">
                <div className="icon-profile">
                    <img className="icon-hexagone" src={require(`/assets/images/icons/hexagone.svg`)} />
                    <img className="icon-profile-orange" src={require(`/assets/images/icons/profile-orange.svg`)} />
                </div>
                <h3>{authenticatedUser.firstName} {authenticatedUser.lastName}</h3>
                <h5>{authenticatedUser.email}</h5>
                <button type="button" className="button-update" onClick={updateProfil}>Modifier</button>
            </div>
            {(userLoaded ? 
                (!updatingUser ? 
                    <div>
                        <div className="profile-workouts">
                            <h2>Mes séances</h2>
                            <div className="button-workouts">
                                <button type="button" className="button-my-workouts" onClick={myWorkouts}>
                                    <span>Créées</span>
                                    <span>{authenticatedUser.workouts.length}</span>
                                </button>
                                <button type="button" className="button-favorite-workouts" onClick={myFavoriteWorkouts}>
                                    <span>Favorites</span>
                                    <span>{authenticatedUser.likedWorkouts.length}</span>
                                </button>
                            </div>
                            <div>
                                {displayMyWorkouts 
                                    ? 
                                    authenticatedUser.workouts.map(workout => 
                                        <div key={workout.id}>
                                            <Link to={"/workout/" + workout.id}>
                                                <WorkoutPreview workout={workout} />
                                            </Link>
                                        </div>
                                    )
                                    : ''
                                }    
                            </div>
                            <div>
                                {displayFavoriteWorkouts 
                                    ? 
                                    authenticatedUser.likedWorkouts.map(workout => 
                                        <div key={workout.id}>
                                            <Link to={"/workout/" + workout.id}>
                                                <WorkoutPreview workout={workout} />
                                            </Link>
                                        </div>
                                    )
                                    : ''
                                }    
                            </div>

                        </div>
                        <div className="profil-informations">
                            <div>
                                <h2>Mon niveau</h2>
                                <p>{authenticatedUser.level.title}</p>
                            </div>
                            <div>
                                <h2>Mon objectif</h2>
                                <p>{authenticatedUser.goal.title}</p>
                            </div>
                            <div>
                                <h2>Mon lieu d'entraînement</h2>
                                <p>{authenticatedUser.trainingPlace.place}</p>
                            </div>
                            <div>
                                <button type="button" onClick={handleLogout}>Deconnexion</button>
                            </div>
                        </div>
                    </div>
                : <ProfilUpdate authenticatedUser={authenticatedUser} updatingUser={updatingUser} />) 
            : null )}
        </div>
    );
}
 
export default Profil;