import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthAPI from '../../services/authAPI';
import AuthContext from '../../contexts/AuthContext';
import Field from '../../components/Form/Field';

const Login = ({ history }) => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const[credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const[error, setError] = useState("");

    // Handleling inputs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    // Handleling submit
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(credentials);

        try {
           await AuthAPI.authentification(credentials);
           setError("");
           setIsAuthenticated(true);
           history.replace("/create");
        } catch(error) {
            console.log(error.response);
            setError("Aucun compte ne possède cette adresse email ou alors aucune information ne correspond")
        }
    }

    return ( 
        <>
            <h1>Connexion</h1>

            <form onSubmit={handleSubmit}>
                <Field 
                    label="Adresse mail" 
                    name="username" 
                    value={credentials.username} 
                    onChange={handleChange} 
                    placeholder="Adresse mail de connexion" 
                    error={error} 
                />

                <Field 
                    label="Mot de passe" 
                    name="password" 
                    value={credentials.password} 
                    onChange={handleChange} 
                    type="password"
                    error="" 
                />
    
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    );
}
 
export default Login;