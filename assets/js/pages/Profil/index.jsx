import React, { useState, useEffect, useContext } from 'react';
import ProfilUpdate from '../../components/Profil/ProfilUpdate';
import AuthAPI from "../../services/authAPI";
import AuthContext from "../../contexts/AuthContext";

const Profil = ({ setPageTitle, history }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);
    const [updatingUser, setUpdatingUser] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
                        <button type="button" onClick={handleLogout}>Deconnexion</button>
                    </div> 
                : <ProfilUpdate authenticatedUser={authenticatedUser} updatingUser={updatingUser} />) 
            : null )}
        </div>
    );
}
 
export default Profil;