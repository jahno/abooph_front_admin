import React, { Fragment } from 'react'

import Breadcrumb from '../../../../common/breadcrumb';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {ARTICLES_IMAGES_ROUTE as imgUrl} from '../../../../../api/routes';

import useData from './useData'

function ArticleDetail () {
    const {state, handleChangeState, goToUpdate, slider1, slider2} = useData()
    
    const { article } = state;
    
    const nextState = article.Etat === 0 ? 2 : article.Etat === 2 ? 0 : article.Etat; 
    
    return (
        <Fragment>
            <Breadcrumb title="Détail Article" parent="Articles" parentUrl="articles"/>

            <div className="container-fluid">
                <div className="card">
                <div className="row product-page-main card-body">
                        {Object.keys(article).length === 0 ? "veuillez patienter ..." : (
                            <Fragment>
                                <div className="col-xl-4">
                                    <Slider 
                                        asNavFor={state.nav2} 
                                        ref={slider1}
                                        className="product-slider"
                                    >
                                        {
                                            article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        }  
                                    </Slider>
                                    
                                    <Slider 
                                        asNavFor={state.nav1}
                                        ref={slider2}
                                        slidesToShow={article.images.length < 4 ? article.images.length: 4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        className={`${article.images.length > 1 ? "small-slick" : ""}`}
                                    >
                                        {article.images.length > 1 && (
                                            article.images.map(image => {
                                                return (
                                                    <div className="item" key={image}>
                                                        <img 
                                                            className="img-fluid" 
                                                            src={`${imgUrl}/${image.chemin}`}
                                                            alt={article.name} 
                                                        />
                                                    </div>
                                                )
                                            })
                                        )}  
                                    </Slider> 
                                </div>
                                <div className="col-xl-8">
                                    <div className="product-page-details product-right mb-0">
                                        <h2>{article.nom}</h2>
                                        <hr />
                                        <h6 className="product-title">Temps de confection</h6>
                                        <p>{article.temps_confection} {parseInt(article.temps_confection) > 1 ? "jours": "jour"}</p>
                                        <h6 className="product-title">Detail de l'article</h6>
                                        <p>{article.description}</p>
                                        <div className="product-price digits mt-2">
                                            <h3>{article.prix} FCFA <del>{article.prix_barre} FCFA</del></h3>
                                        </div>
                                        <hr />
                                        <div className="m-t-15">
                                            <button 
                                                className="btn btn-primary m-r-10" 
                                                type="button"
                                                onClick={handleChangeState}
                                                disabled={state.isLoading.state}
                                            >
                                                {state.isLoading.state ? "Veuillez patienter..." : (article.etatText[nextState]) }
                                            </button>
                                            <button 
                                                className="btn btn-secondary" 
                                                type="button"
                                                onClick={goToUpdate}
                                            >
                                                Modifier
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default ArticleDetail
