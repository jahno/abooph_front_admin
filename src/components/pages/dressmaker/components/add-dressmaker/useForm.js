import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

import {initialState, initialImages} from './variables'

import {handleService} from '../../../../../helpers';

import {addDressmaker, getCategories} from '../../../../../services/dressmaker'

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
        if(!images.image){
            toast.error("Le logo est obligatoire", {autoClose: false}) 
        }else if(values.passwordConfirmation !== values.password){
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

            handleService(addDressmaker, data, 
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