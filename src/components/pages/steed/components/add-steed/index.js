import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import AddSteedForm from './add-steed-form';

export default function AddDressmaker() {
    return (
        <Fragment>
            <Breadcrumb title="Ajouter coursiers" parent="Coursiers" parentUrl="coursiers"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Ajouter un coursier</h5>
                            </div>
                            <div className="card-body">
                                <AddSteedForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
