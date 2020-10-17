import React from 'react'

import { Edit, Trash2, Eye } from 'react-feather'
import {ARTICLES_IMAGES_ROUTE} from '../../../../../api/routes'
import defaultImage from '../../../../../assets/images/pro3/1.jpg'

export default function ArticleItem(props){
    const {data, handleClick} = props
    const image = data.images[0] ? `${ARTICLES_IMAGES_ROUTE}${data.images[0].chemin}` : defaultImage

    return (
        <div className="col-xl-3 col-sm-6">
            <div className="card">
                <div className="products-admin">
                    <div className="card-body product-box">
                        <div className="img-wrapper">
                            <div className="lable-block">
                                {<span className="lable3" style={styles.state}>{data.etatText[data.Etat]}</span>}
                            </div>
                            <div className="front">
                                <a className="bg-size">
                                    <img 
                                        className="img-fluid blur-up bg-img lazyloaded" 
                                        alt={data.nom}
                                        src={image} 
                                    />
                                </a>
                                <div className="product-hover">
                                    <ul>
                                        <li>
                                            <button className="btn" type="button">
                                                <Eye className="editBtn" onClick={() => handleClick('detail', data)}/>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="btn" type="button">
                                                <Edit className="editBtn" onClick={() => handleClick('modifier', data)}/>
                                            </button>
                                        </li>
                                        <li>
                                            <button className="btn" type="button">
                                                <Trash2 className="deleteBtn" onClick={() => handleClick('delete', data)}/>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style={styles.detail}>
                            <div className="product-detail">
                                <a> <h6 >{data.nom}</h6></a>
                                <h4 >{data.prix} FCFA <del >{data.prix} FCFA</del></h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    detail: {
        marginTop: 5,
        height: 70,
        display: 'flex',
        alignItems:'center'
    },
    state: {
        fontSize: 8
    }
}