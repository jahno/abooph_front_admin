import {useState, useEffect, useRef} from "react";
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {handleService} from '../../../../../helpers';

// Services
import {getArticle, changeState} from '../../../../../services/article'

export default function useData(){
    const [state, setState] = useState({
        article: {images: [], etatText: {}}, 
        isLoading: {main: false, state: false},
        nav1: null,
        nav2: null,
    })
    const location = useLocation()
    const params = useParams()
    const history = useHistory()

    const slider1 = useRef()
    const slider2 = useRef()

    useEffect(() => {
        if(location.state && location.state.article){
            setState(state => ({
                ...state, 
                article: location.state.article
            }))
        }else{
            handleService(getArticle, params.id, (response) => {
                setState(state => ({
                    ...state, 
                    article: response,
                    isLoading: false,
                }));
            })
        }
    }, [location, params.id])

    useEffect(() => {
        setState(state => ({
            ...state, 
            nav1: slider1.current,
            nav2: slider2.current
        }));
    }, [state.article])

    function goToUpdate(){
        history.push({
            pathname: `/articles/${state.article.id}/modifier`,
            state: {article: state.article}
        })
    }

    function handleChangeState(){
        setState(state => ({
            ...state, 
            isLoading: {...state.isLoading, state: true}
        }));

        handleService(changeState, {state: state.article.Etat, id: state.article.id}, 
            (response) => {
                toast.success(response.msg)
                
                setState(state => ({
                    ...state,
                    article: {...state.article, ...response.article}, 
                    isLoading: {...state.isLoading, state: false}
                }));
            },
            () => {
                setState(state => ({
                    ...state, 
                    isLoading: {...state.isLoading, state: false}
                }));
            }
        )
    }

    return {
        state,
        slider1,
        slider2,
        handleChangeState,
        goToUpdate
    }
}