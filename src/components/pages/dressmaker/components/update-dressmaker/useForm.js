import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import {handleService} from '../../../../../helpers';

import {initialState, initialImages} from './variables'

// Services
import {getDressmaker, updateDressmaker, getCategories} from '../../../../../services/dressmaker'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [images, setImages] = useState(initialImages)
    const [tel, setTel] = useState({
        isValid: null,
        value:"",
        country: {},
        formattedValue:"",
    })
    const history = useHistory()
    const location = useLocation()
    const params = useParams()

    function handleChange (selectedOption, field) {
        setState(state => ({
            ...state, 
            select: {
                ...state.select,
                [field.name]: selectedOption
            }
        })) 
    };

    useEffect(() => {
        if(location.state && location.state.dressmaker){
            const dressmaker = location.state.dressmaker;

            const defaultValues = {
                firstName: dressmaker.nom,
                lastName: dressmaker.prenom,
                email: dressmaker.email,
                address: dressmaker.Adresse_geographique || "",
                password: '',
                passwordConfirmation: '', 
            };

            let categorie = {}
            if(dressmaker.categorieCouturier){
                categorie = {
                    value: dressmaker.categorieCouturier.id, 
                    label: dressmaker.categorieCouturier.nom
                } 
            }

            setState(state => ({
                ...state,
                select: {categorie}, 
                defaultValues
            }))

            setTel(tel => ({...tel, value: dressmaker.numero || ""}))
        }else{
            handleService(getDressmaker, params.id, (response) => {
                let categorie = {}
                if(response.categorieCouturier){
                    categorie = {
                        value: response.categorieCouturier.id, 
                        label: response.categorieCouturier.nom
                    } 
                }

                const defaultValues = {
                    firstName: response.nom,
                    lastName: response.prenom,
                    email: response.email,
                    address: response.Adresse_geographique || "",
                    password: '',
                    passwordConfirmation: '', 
                };
                
                setState(state => ({
                    ...state,
                    select: {categorie}, 
                    defaultValues
                }))

                setTel(tel => ({...tel, value: response.numero || ""}))
            })
        }
    }, [location.state, params.id])

    useEffect(() => {
        handleService(getCategories, null, (response) => {
            setState(state => ({...state, categories: response }));
        })
    },[])

    function createImage(image) {
        const newImages = { ...images };

        let reader = new FileReader();

        reader.onload = (e) => {
            newImages.image = e.target.result;
            newImages.isLoading = false;
            setImages(newImages)
        }
        
        reader.readAsDataURL(image);
    }

    function onChangeImage(event) {       
        const image = event.target.files || event.dataTransfer.files;

        if(image.length !== 0 ){
            const newImages = { ...images };
            newImages.isLoading = true;
            setImages(newImages)

            const options = {
                maxSizeMB: 0.098,
                // maxWidthOrHeight: 100,
                useWebWorker: true
            }

            imageCompression(image[0], options)
            .then(function (compressedImage) {
                createImage(compressedImage)
            })
            .catch(function (error) {
                const newImages = { ...images };
                newImages.image = "";
                newImages.isLoading = false;
                setImages(newImages)
            });
        }else{
            const newImages = { ...images };
            newImages.image = "";
            newImages.isLoading = false;
            setImages(newImages)
        }
    }

    function handleValidSubmit(event, values){
        if(values.password && (values.passwordConfirmation !== values.password)){
            toast.error("Les mots de passe ne sont pas identiques", {autoClose: false})
        }else if(!state.select.categorie){
            toast.error("La categorie est obligatoire", {autoClose: false})
        }else{
            setState(state => ({...state, isLoading: true})) 

            const data = {
                ...values,
                "nom":values.lastName,
                "prenom":values.firstName,
                "Adresse_geographique":values.address,
                "numero":tel.value,
                "categorie_couturier_id":state.select.categorie.value,
                "logo":images.image,
            };

            handleService(updateDressmaker, {data, id: params.id}, 
                (response) => {
                    toast.success(response.msg)
                    history.push('/couturiers')
                },
                () => {
                    setState(state => ({...state, isLoading: false }));
                }
            )
        }
    }

    return {
        state,
        handleChange,
        images,
        onChangeImage,
        handleValidSubmit,
        setTel, tel
    }
}