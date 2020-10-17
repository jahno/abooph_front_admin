import React from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Loading from '../../../../common/loading';
import one from '../../../../../assets/images/pro3/1.jpg'
import user from '../../../../../assets/images/user.png'

export default function CustomImage (props) {
    const { 
        images,
        onChangeImage,
        nav1, nav2,
        slider1, slider2
    } = props

    const imgKeys = Object.keys(images.values)
    const imgKeysLength = imgKeys.length
    
    return (
        <div className="col-xl-5">
            <div className="add-product">
                <div className="row">
                    <div className="col-xl-9 xl-50 col-sm-6 col-9">
                        <Slider 
                            asNavFor={nav2} 
                            ref={slider1}
                            className="product-slider"
                        >
                            {
                                imgKeys.map(image => {
                                    return (
                                        <div className="item" key={image}>
                                            <img 
                                                className="img-fluid" 
                                                src={images.values[image].value || one} 
                                                alt=""
                                            />
                                        </div>
                                    )
                                })
                            }  
                        </Slider>

                        <Slider 
                            asNavFor={nav1}
                            ref={slider2}
                            slidesToShow={imgKeysLength > 4 ? 4 : imgKeysLength}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            className={`${imgKeysLength > 1 ? "small-slick" : ""}`}
                        >
                            {imgKeysLength > 1 && (
                                imgKeys.map(image => {
                                    return (
                                        <div className="item" key={image}>
                                            <img 
                                                className="img-fluid" 
                                                src={images.values[image].value} 
                                                alt=""
                                            />
                                        </div>
                                    )
                                })
                            )}  
                        </Slider>         
                    </div>
                    <div className="col-xl-3 xl-50 col-sm-6 col-3">
                        <ul className="file-upload-product">
                            {
                                [1,2,3,4,5,6].map(i => {
                                    return (
                                        <li key={i}>
                                            {images.isLoading[`image${i}`] ?  <Loading/>:
                                                <div className="box-input-file">
                                                    <input className="upload" onChange={onChangeImage} type='file' name={`image${i}`} accept=".jpg, .jpeg, .png"/>
                                                    <img src={images.values[`image${i}`] ? images.values[`image${i}`].value || user : user} alt="" style={{ width: 50, height: 50 }} />
                                                </div>
                                            }
                                        </li>
                                    )
                                })
                            }
                        </ul>   
                    </div>
                </div>
            </div>
        </div>
    )
}
