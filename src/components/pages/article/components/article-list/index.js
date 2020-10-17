import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';

import Breadcrumb from '../../../../common/breadcrumb';
import Loader from '../../../../common/loader';
import {DeleteAlerte, handleDelete} from '../../../../common/custum-alerte-delete';

import {handleService} from '../../../../../helpers';
import { deleteArticle } from '../../../../../services/article'
import { getArticles } from 'services/api'

import ArticleItem from './article-item'

export default function ArticleList() {
    const { url } = useRouteMatch();
    const history = useHistory()
    const [state, setState] = useState({
        articleData: null, 
        isLoading: true,
        hasMoreItems: false,
        isDeleteAlerteOpen: false
    })
    const currentItem = useRef(null)

    useEffect(() => {
        getArticles(null, (response) => {
            setState(state => ({
                ...state, 
                articleData: response.results,
                isLoading: false,
                hasMoreItems: response.results.lastPage > 1,
            }));
        })
    },[])
    
    function fetchMoreItems () {
        getArticles(state.articleData.page + 1, (response) => {
            setState(state => ({
                ...state, 
                hasMoreItems: response.results.lastPage !== response.results.page,
                articleData: {...response.results, data: [...state.articleData.data, ...response.results.data]},
            }));
        })
    }

    function handleClick (role, article) {
        if(role === 'delete'){
            handleDelete({type: 'open', value: article}, null, currentItem, toggleDeleteAlerte)
            return;
        }

        history.push({
            pathname: `${url}/${article.id}/${role}`,
            state: {article}
        })
    }

    function toggleDeleteAlerte(){
        setState(state => ({ ...state, isDeleteAlerteOpen: !state.isDeleteAlerteOpen}))
    }

    function deleteItem(action){
        const newState = {...state}
        newState.isDeleteAlerteOpen = false

        const data = newState.articleData.data.filter(item => (item.id !== currentItem.current.id));

        newState.articleData.data = data;
        
        setState(newState)
      
        toast.success(action.value.msg)
    }

    function displayDeleteAlerte(){
        if(state.isDeleteAlerteOpen){
          return(
            <DeleteAlerte
                isOpen={state.isDeleteAlerteOpen}
                msg="Vous ne pourez plus recuperer cet article"
                data={currentItem.current}
                service={deleteArticle}
                deleteData={deleteItem}
                toggleAlerte={toggleDeleteAlerte}
            />
          )
        }
    }

    function renderArticles(){
        if(state.isLoading) return <Loader/>
        if(!state.articleData || state.articleData.data.length === 0){
            return <h6>Aucun article</h6>
        }
        return (
            <InfiniteScroll
                dataLength={state.articleData.total} //This is important field to render the next data
                next={fetchMoreItems}
                hasMore={state.hasMoreItems}
                loader={<Loader/>}
                style={{overflow: 'hidden'}}
            >
                <div className="row products-admin ratio_asos">
                    {state.articleData.data.map((myData, i) => {
                        return (
                            <ArticleItem 
                                key={myData.id}
                                data={myData} 
                                handleClick={handleClick}
                            />
                        )
                    })}
                </div>
            </InfiniteScroll>
        )
    }

    return (
        <Fragment>
            <Breadcrumb title="Ajouter Article" subTitle="Ajouter un nouvel article" parent="Articles" parentUrl="articles"/>

            <div className="container-fluid">
                <div className="row">
                
                <div className="col-xl-12">
                    <div className="btn-popup pull-right">
                    <Link to={`${url}/ajouter`} className="btn btn-secondary">Ajouter un nouvel article</Link>
                    </div>
                </div>
                    {renderArticles()}
                </div>
            </div>
            {displayDeleteAlerte()}
        </Fragment>
    )
}
