import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
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
           history.replace("/");
        } catch(error) {
            console.log(error.response);
            setError("Aucun compte ne possède cette adresse email ou alors aucune information ne correspond")
        }
    }

    return ( 
        <div className="loginForm">
            <form onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <Field 
                    label="Adresse mail" 
                    name="username" 
                    value={credentials.username} 
                    onChange={handleChange} 
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
                    <button type="submit" className="btn btn-success">
                        Connexion
                        <div className="icon-button">
                            <img src={require("/assets/images/icons/straight-right-arrow.svg")} />
                        </div>
                    </button>
                </div>
            </form>
            <p className="register-link">Pas encore de compte ? <Link to="/register">Inscription</Link></p>
        </div>
    );
}
 
export default Login;