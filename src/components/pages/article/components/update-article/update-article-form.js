import React, { Fragment } from 'react'
import { ToastContainer } from 'react-toastify';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import Select from "react-select";

import CustomImage from './custom-image';

import useForm from './useForm'

export default function UpdateArticleForm () {
    const { 
        state, 
        handleChange, 
        handleValidSubmit, 
        images,
        onChangeImage, 
        slider1, slider2,
        goToDetail
    } = useForm()

    if(!state.defaultValues){
        return (
            <Fragment>
                veuillez patienter ...
                <ToastContainer position="bottom-right"/>
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <div className="row product-adding">
                <CustomImage 
                    images={images}
                    onChangeImage={onChangeImage}
                    nav1={state.nav1} 
                    nav2={state.nav2}
                    slider1={slider1}
                    slider2={slider2}
                />

                <div className="col-xl-7">
                    <AvForm className="needs-validation add-product-form" onValidSubmit={handleValidSubmit} model={state.defaultValues}>
                        <div className="form form-label-center">
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Nom</label>
                                <div className="col-xl-8 col-sm-7">
                                    <AvField 
                                        className="form-control"
                                        name="label" 
                                        type="text" 
                                        validate={{
                                            required: {value: true, errorMessage: 'Svp veuillez renseigner le nom'},
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Prix normal</label>
                                <div className="col-xl-8 col-sm-7">
                                    <AvField 
                                        className="form-control"
                                        name="price1" 
                                        type="text" 
                                        validate={{
                                            pattern: {value: '^[0-9]+$', errorMessage: "Prix invalide"},
                                            required: {value: true, errorMessage: 'Svp veuillez renseigner le prix'},
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Prix barré</label>
                                <div className="col-xl-8 col-sm-7">
                                    <AvField 
                                        className="form-control"
                                        name="price2" 
                                        type="text" 
                                        validate={{
                                            pattern: {value: '^[0-9]+$', errorMessage: "Prix invalide"},
                                            required: {value: true, errorMessage: 'Svp veuillez renseigner le prix barré'},
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Temps de confection</label>
                                <div className="col-xl-8 col-sm-7">
                                    <AvField 
                                        className="form-control"
                                        name="confectionTime"
                                        type="number" 
                                        helpMessage="Le temps de confection est en jour"
                                        validate={{
                                            pattern: {value: '^[0-9]+$', errorMessage: "temps invalide"},
                                            required: {value: true, errorMessage: 'Svp veuillez renseigner le temps de confection'},
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Categories</label>
                                <div className="col-xl-8 col-sm-7">
                                    <Select
                                        isMulti
                                        options={state.categories.map(item => ({ label: item.nom, value: item.id }))}
                                        placeholder="Categories..."
                                        value={state.select.categories}
                                        onChange={handleChange}
                                        isLoading={state.categories.length === 0}
                                        name="categories"
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Couturier</label>
                                <div className="col-xl-8 col-sm-7">
                                    <Select
                                        isClearable
                                        options={state.dressmakers.map(item => ({ label: `${item.nom} ${item.prenom}`, value: item.id }))}
                                        placeholder="Couturier..."
                                        value={state.select.dressmaker}
                                        onChange={handleChange}
                                        isLoading={state.dressmakers.length === 0}
                                        name="dressmaker"
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-3 row">
                                <label className="col-xl-3 col-sm-4 mb-0"><span>*</span> Description</label>
                                <div className="col-xl-8 col-sm-7">
                                    <AvField 
                                        className="form-control"
                                        name="description" 
                                        type="textarea" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="offset-xl-3 offset-sm-4">
                            <Button 
                                color="primary" 
                                className="btn btn-primary m-r-10"
                                disabled={state.isLoading}
                            >
                                {state.isLoading ? "Veuillez patienter ..." : "Modifier"}
                            </Button>
                            <button 
                                className="btn btn-secondary" 
                                type="button"
                                onClick={goToDetail}
                            >
                                Voir détail
                            </button>
                        </div>
                    </AvForm>
                </div>
            </div>
            
            <ToastContainer position="bottom-right"/>
        </Fragment>
    )
}
