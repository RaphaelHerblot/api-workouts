import React, { useState, useEffect } from 'react';
import ProfilUpdate from '../../components/Profil/ProfilUpdate';
import AuthAPI from "../../services/authAPI";

const Profil = ({ setPageTitle }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [updatingUser, setUpdatingUser] = useState(false);

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

    const updateProfil = () => {
        setUpdatingUser(true);
    }

    return ( 
        <div>
            <h1>Profile</h1>
            {(userLoaded ? 
                (!updatingUser ? 
                    <div>
                        <div>{authenticatedUser.email}</div>
                        <div>{authenticatedUser.firstName}</div>
                        <div>{authenticatedUser.level.title}</div>
                        <div>{authenticatedUser.goal.title}</div>
                        <div>{authenticatedUser.trainingPlace.place}</div>
                        <button type="button" onClick={updateProfil}>Modifier</button>
                    </div> 
                : <ProfilUpdate authenticatedUser={authenticatedUser} updatingUser={updatingUser} />) 
            : null )}
        </div>
    );
}
 
export default Profil;