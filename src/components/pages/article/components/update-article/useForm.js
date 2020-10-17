import {useState, useEffect, useRef} from "react";
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {initialState, initialImages} from './variables'

import {ARTICLES_IMAGES_ROUTE} from '../../../../../api/routes';

import {handleService, loadArticleImage} from '../../../../../helpers';

// Services
import {updateArticle, getArticle, getCategoriesArticles, getDressmakers} from '../../../../../services/article'

export default function useForm(){
    const [state, setState] = useState(initialState)
    const [images, setImages] = useState({
        values: {...initialImages.values}, 
        isLoading: {...initialImages.isLoading}
    })
    const history = useHistory()
    const location = useLocation()
    const params = useParams()

    const slider1 = useRef()
    const slider2 = useRef()

    function goToDetail(){
        history.push({
            pathname: `/articles/${state.article.id}/detail`,
            state: {article: state.article}
        })
    }

    function handleChange (selectedOption, field) {
        setState(state => ({
            ...state, 
            select: {
                [field.name]: selectedOption
            }
        })) 
    }

    useEffect(() => {
        setState(state => ({
            ...state, 
            nav1: slider1.current,
            nav2: slider2.current
        }));
    }, [state.defaultValues])

    useEffect(() => {
        if(location.state && location.state.article){
            const article = location.state.article;

            const dressmaker = {
                label: `${article.couturier.nom} ${article.couturier.prenom}`,
                value: article.couturier.id
            }

            const categories = article.categories.map(cat => ({label: cat.nom, value: cat.id}))

            const defaultValues = {
                label: article.nom,
                price1: article.prix,
                price2: article.prix_barre,
                confectionTime: article.temps_confection,
                description: article.description,
            };

            setState(state => ({
                ...state,
                article,
                select: {dressmaker, categories}, 
                defaultValues
            }))

            const initialImages = {values : {}}

            let i = 1
            for(let image of article.images){
                initialImages.values[`image${i}`] = {
                    id: image.id,
                    value: `${ARTICLES_IMAGES_ROUTE}${image.chemin}`
                }
                i++
            }

            setImages(images => ({...images, ...initialImages}))
        }else{
            handleService(getArticle, params.id, (response) => {
                const dressmaker = {
                    label: `${response.couturier.nom} ${response.couturier.prenom}`,
                    value: response.couturier.nom
                }
                
                const categories = response.categories.map(cat => ({label: cat.nom, value: cat.id}))
    
                const defaultValues = {
                    label: response.nom,
                    price1: response.prix,
                    price2: response.prix_barre,
                    confectionTime: response.temps_confection,
                    description: response.description,
                };
                
                setState(state => ({
                    ...state,
                    article: response.article,
                    select: {dressmaker, categories}, 
                    defaultValues
                }))

                const initialImages = {values : {}}

                let i = 1
                for(let image of response.images){
                    initialImages.values[`image${i}`] = {
                        id: image.id,
                        value: `${ARTICLES_IMAGES_ROUTE}${image.chemin}`
                    }
                    i++
                }

                setImages(images => ({...images, ...initialImages}))
            })
        }
    }, [location.state, params.id])

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

                newImages.values[field] = {
                    id: newImages.values[field] ? newImages.values[field].id : "",
                    value: image
                };
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
        setState(state => ({...state, isLoading: true})) 

        const data = {
            "nom":values.label,
            "prix":values.price1,
            "prix_barre":values.price2,
            "image_add":[],
            "images":[],
            "temps_confection":values.confectionTime,
            "couturier_id":state.select.dressmaker.value,
            "categorie_article_id":state.select.categories.map(cat => cat.value),
            "description": values.description
        };

        for(let name in images.values){
            if(images.values[name] && images.isLoading[name] !== undefined){
                if(images.values[name].id){
                    data.images.push({id:images.values[name].id, image: images.values[name].value})
                }else{
                    data.image_add.push(images.values[name].value)
                }
            }
        }
        
        handleService(updateArticle, {data, id: params.id}, 
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
        goToDetail,
        slider1, slider2,
        state,
        handleChange,
        images,
        onChangeImage,
        handleValidSubmit,
    }
}