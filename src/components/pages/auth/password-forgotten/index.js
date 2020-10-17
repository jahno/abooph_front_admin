import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

import Layout from '../../../layout/auth';

import {handleService} from '../../../../helpers';

// Services
import { passwordEmail } from '../../../../services/auth'

const initialState = {
  isLoading: false,
};

export default function PasswordForgotten() {
    const [state, setState] = useState(initialState)

    function handleValidSubmit(event, values){
        setState(state => ({...state, isLoading: true }));
        
        handleService(passwordEmail, values.login, 
            (response) => {
                setState(state => ({...state, isLoading: false }));
                toast.success(response.msg, {autoClose: false})
            },
            () => {
                setState(state => ({...state, isLoading: false }));
            }
        )
    };

    return (
        <Layout>
            <AvForm onValidSubmit={handleValidSubmit}>
                <form className="form-horizontal auth-form">
                    <h3 style={styles.title}>Mot de passe oublie</h3>

                    <div className="form-group">
                        <AvField 
                            name="login[email]" 
                            type="email" 
                            placeholder="Votre email" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                                email: {value: true, errorMessage: "Votre email est invalide"},
                                minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                            }} 
                        />
                    </div>
                    <div className="form-terms">
                        <div className="custom-control custom-checkbox mr-sm-2">
                            <label className="d-block">
                                Saisissez votre adresse e-mail. Nous vous enverrons un lien sur cette adresse e-mail pour réinitialiser votre mot de passe.
                            </label>
                        </div>
                    </div>
                    <div className="form-button">
                        {/*<button className="btn btn-primary" type="submit"  onClick={() => this.routeChange()}>Se connecter</button>*/}
                        <Button 
                            className="btn btn-primary" 
                            color="primary"
                            disabled={state.isLoading}
                        >
                            {state.isLoading ? "Veuillez patienter ..." : "Valider"}
                        </Button>
                    </div>
                    <div className="form-footer">
                        <span>Je veux me connecter</span>
                        <div className="social"> 
                            <RouterLink 
                                to="/login" 
                                className="btn btn-default forgot-pass p-0">
                                Retour à la connexion
                            </RouterLink>
                        </div>
                    </div>
                </form>
            </AvForm>
        </Layout>
    )
}

const styles = {
    title: {
        textAlign: 'center', 
        marginTop: 10, 
        marginBottom: 20, 
        color: 'rgb(255, 128, 132)'
    },
};
