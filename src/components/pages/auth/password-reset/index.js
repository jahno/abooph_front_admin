import React, { useState } from 'react';
import { useHistory,  useParams, Link as RouterLink } from 'react-router-dom';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

import Layout from '../../../layout/auth';

import {handleService} from '../../../../helpers';

// Services
import { passwordReset } from '../../../../services/auth'

const initialState = {
  isLoading: false,
};

export default function PasswordReset() {
    const [state, setState] = useState(initialState)
    const history = useHistory()
    const params = useParams()

    function handleValidSubmit(event, values){
        if(values.password !== values.passwordConfirmation){
            toast.error("Vos mots de passe ne sont pas identiques", {autoClose: false})
        }else{
            setState(state => ({...state, isLoading: true }));

            const data = {...values, token: params.token}

            handleService(passwordReset, data, 
                () => {
                    history.push('/login')
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    }

    return (
        <Layout>
            <AvForm onValidSubmit={handleValidSubmit}>
                <form className="form-horizontal auth-form">
                    <h3 style={{...styles.title}}>Nouveau mot de passe</h3>

                    <div className="form-group">
                        <AvField 
                            name="email" 
                            type="email"
                            placeholder="Email" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre email'},
                                email: {value: true, errorMessage: "Votre email est invalide"},
                                minLength: {value: 10, errorMessage: "Votre email est invalide"},
                                maxLength: {value: 30, errorMessage: "Votre email est invalide"}
                            }} 
                        />
                    </div>

                    <div className="form-group">
                        <AvField 
                            name="password" 
                            type="password" 
                            placeholder="Mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                minLength: {value: 6, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                            }} 
                        />
                    </div>

                    <div className="form-group">
                        <AvField 
                            name="passwordConfirmation" 
                            type="password" 
                            placeholder="Confirmer mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                minLength: {value: 6, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                            }} 
                        />
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
        marginBottom: 50, 
        color: 'rgb(255, 128, 132)'
    },
};
