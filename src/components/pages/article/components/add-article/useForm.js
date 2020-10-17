import {useState, useEffect, useRef} from "react";
import { useHistory } from 'react-router-dom';
import {initialState, initialImages} from './variables'

import { toast } from 'react-toastify';

import {handleService, loadArticleImage} from '../../../../../helpers';

// Services
import {addArticle, getCategoriesArticles, getDressmakers} from '../../../../../services/article'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [images, setImages] = useState({
        values: {...initialImages.values}, 
        isLoading: {...initialImages.isLoading}
    })
    const history = useHistory()

    const slider1 = useRef()
    const slider2 = useRef()

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
        setState(state => ({
            ...state, 
            nav1: slider1.current,
            nav2: slider2.current
        }));
    }, [])

    useEffect(() => {
        handleService(getDressmakers, null, (response) => {
            setState(state => ({...state, dressmakers: response }));
        })

        handleService(getCategoriesArticles, null, (response) => {
            setState(state => ({...state, categories: response }));
        })
    },[])

    function onChangeImage(event) {
        const field = event.target.name;

        loadArticleImage(event,
            // Gestion du chargement de l'image 
            () => {
                const newImages = { ...images };
                newImages.isLoading[field] = true;
                setImages(newImages)
            },
            // Gestion de l'image en cas de succès
            (image) => {
                const newImages = { ...images };

                newImages.values[field] = image;
                newImages.isLoading[field] = false;
                setImages(newImages)
            },
            // Gestion de l'image en cas d'erreur
            () => {
                const newImages = { ...images };
                newImages.isLoading[field] = false;
                setImages(newImages)
            }
        )   
    }

    function handleValidSubmit(event, values){
        if(!state.select.categories){
            toast.error("Les categorie sont obligatoires", {autoClose: false})
            return;
        }

        if(!state.select.dressmaker){
            toast.error("Le couturier est obligatoire", {autoClose: false})
            return;
        }

        setState(state => ({...state, isLoading: true})) 

        const data = {
            "nom":values.label,
            "prix":values.price1,
            "prix_barre":values.price2,
            "images":[],
            "temps_confection":values.confectionTime,
            "couturier_id":state.select.dressmaker.value,
            "categorie_article_id":state.select.categories.map(cat => cat.value),
            "description": values.description
        };

        for(let name in images.values){
            if(images.values[name]){
                data.images.push(images.values[name])
            }
        }

        handleService(addArticle, data, 
            (response) => {
                history.push(
                    '/articles',
                    {message: response.msg}
                )
            },
            () => {
                setState(state => ({...state, isLoading: false }));
            }
        )
    }

    return {
        state,
        slider1,
        slider2,
        handleChange,
        images,
        onChangeImage,
        handleValidSubmit,
    }
}
