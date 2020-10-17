import {useState} from "react";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import {initialState} from './variables'

import {handleService} from '../../../../../helpers';

// Services
import {addAdmin} from '../../../../../services/admin'

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
                "numero":tel.value,
            };

            handleService(addAdmin, data, 
                (response) => {
                    toast.success(response.msg)

                    history.push('/admins')
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