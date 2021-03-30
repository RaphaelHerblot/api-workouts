import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthAPI from '../../services/authAPI';
import AuthContext from '../../contexts/AuthContext';

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
                <div className="form-group">
                    <label htmlFor="username">Adresse mail</label>
                    <input 
                        value={credentials.username} 
                        onChange={handleChange} 
                        type="email" 
                        placeholder="Adresse email de connexion" 
                        id="username" 
                        name="username" 
                        className={"form-control" + (error && " is-invalid")}
                    />
                    {error && <p className="invalid-feedback">{error}</p>}
                </div>
    
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input 
                        value={credentials.password} 
                        onChange={handleChange} 
                        type="password" 
                        placeholder="Mot de passe" 
                        id="password"
                        name="password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    );
}
 
export default Login;