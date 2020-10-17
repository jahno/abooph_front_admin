import React, { Fragment, useState } from 'react';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { toast } from 'react-toastify';

import {handleService} from '../../../../../helpers';
import { updateProfile } from '../../../../../services/admin'

const initialState = {
  isLoading: false,
};

export default function PasswordReset({user}) {
    const [state, setState] = useState(initialState)

    function handleValidSubmit(event, values){
        if(values.newPassword !== values.newPasswordConfirmation){
            toast.error("Vos mots de passe ne sont pas identiques", {autoClose: false})
        }else{
            setState(state => ({...state, isLoading: true }));

            const data = {...user, old_password: values.password, password: values.password}

            handleService(updateProfile, data, 
                (response) => {
                    setState(state => ({...state, isLoading: false }));
                    toast.success(response.msg)
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    }

    return (
        <Fragment>
            <AvForm onValidSubmit={handleValidSubmit}>
                <form className="form-horizontal auth-form">
                    <div className="form-group">
                        <AvField 
                            name="password" 
                            type="password" 
                            placeholder="Mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Votre mot de passe doit être composé uniquement de lettres et de chiffres'},
                                minLength: {value: 4, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                            }} 
                        />
                    </div>

                    <div className="form-group">
                        <AvField 
                            name="newPassword" 
                            type="password" 
                            placeholder="Nouveau mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Votre mot de passe doit être composé uniquement de lettres et de chiffres'},
                                minLength: {value: 4, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                                maxLength: {value: 30, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
                            }} 
                        />
                    </div>

                    <div className="form-group">
                        <AvField 
                            name="newPasswordConfirmation" 
                            type="password" 
                            placeholder="Confirmer nouveau mot de passe" 
                            validate={{
                                required: {value: true, errorMessage: 'Svp veuillez renseigner votre mot de passe'},
                                // pattern: {value: '^[A-Za-z0-9]+$', errorMessage: 'Votre mot de passe doit être composé uniquement de lettres et de chiffres'},
                                minLength: {value: 4, errorMessage: "Votre votre mot de passe doit être entre 6 et 30 caractères"},
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
                            {state.isLoading ? "Veuillez patienter ..." : "Modifier"}
                        </Button>
                    </div>
                </form>
            </AvForm>
        </Fragment>
    )
}
