import {useState, useEffect, useRef} from "react";
import { useLocation, useParams } from 'react-router-dom';
import { getOrderDetail } from "services/api";

export default function useData(){
    const params = useParams()

    const [state, setState] = useState({
        order: {},
        affectSteedIsVisible: false,
        isLoading: true,
        nav1: null,
        nav2: null,
    })

    const slider1 = useRef()
    const slider2 = useRef()

    function onFetchData(){
        if(Number.isInteger(parseInt(params.id))){
            getOrderDetail(params.id, (response) => {
                setState(state => ({
                    ...state, 
                    isLoading: false,
                    affectSteedIsVisible: false,
                    order: response
                }));
            })
        }
    }

    useEffect(() => {
        onFetchData()
    }, [params.id])

    useEffect(() => {
        setState(state => ({
            ...state, 
            nav1: slider1.current,
            nav2: slider2.current
        }));
    }, [])

    function handleAffetOrderToSteed(item, isLoadingData){
        if(isLoadingData){
          onFetchData()
        }else{
          setState(state => ({
            ...state,
            affectSteedIsVisible: !state.affectSteedIsVisible,
          }))
        }
    }

    return {
        state,
        slider1,
        slider2,
        handleAffetOrderToSteed
    }
}