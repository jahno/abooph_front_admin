import {useState} from "react";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {initialState} from './variables'

import {handleService} from '../../../../../helpers';
import {addSteed} from '../../../../../services/steed'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [tel, setTel] = useState({
        isValid: null,
        value:"",
        country: {},
        formattedValue:"",
    })
    const history = useHistory()

    function handleValidSubmit(event, values){
        if(values.passwordConfirmation !== values.password){
            toast.error("Les mots de passe ne sont pas identiques", {autoClose: false})
        }else{
            setState(state => ({...state, isLoading: true})) 

            const data = {
                ...values,
                "nom":values.lastName,
                "prenom":values.firstName,
                "Adresse_geographique":values.address,
                "Zone_intervention":values.zone,
                "numero":tel.value,
            };

            handleService(addSteed, data, 
                (response) => {
                    toast.success(response.msg)
                    setState(state => ({...state, isLoading: false }));

                    history.push('/coursiers')
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    }

    return {
        state,
        handleValidSubmit,
        setTel, tel
    }
}