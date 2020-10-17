import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import {initialState} from './variables'

import {handleService} from '../../../../../helpers';

// Services
import {getAdmin, updateAdmin} from '../../../../../services/admin'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [tel, setTel] = useState({
        isValid: null,
        value:"",
        country: {},
        formattedValue:"",
    })
    const location = useLocation()
    const params = useParams()
    const history = useHistory()

    useEffect(() => {
        if(location.state && location.state.admin){
            const defaultValues = {
                firstName: location.state.admin.nom,
                lastName: location.state.admin.prenom,
                email: location.state.admin.email,
                address: location.state.admin.coordonnee || "",
                password: '',
                passwordConfirmation: '', 
            };
            
            setState(state => ({...state, defaultValues}))
            setTel(tel => ({...tel, value: location.state.admin.numero || ""}))
            
        }else{
            handleService(getAdmin, params.id, (response) => {
                const defaultValues = {
                    firstName: response.nom,
                    lastName: response.prenom,
                    email: response.email,
                    address: response.coordonnee || "",
                    password: '',
                    passwordConfirmation: '', 
                };

                setState(state => ({...state, defaultValues}))
                setTel(tel => ({...tel, value: response.numero || ""}))
            })
        }
    }, [location.state, params.id])

    function handleValidSubmit(event, values){
        if(values.password && values.passwordConfirmation !== values.password){
            toast.error("Les mots de passe ne sont pas identiques")
        }else{
            setState(state => ({...state, isLoading: true})) 

            const data = {
                ...values,
                "nom":values.lastName,
                "prenom":values.firstName,
                "numero":tel.value,
            };

            handleService(updateAdmin, {id: params.id, data}, 
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