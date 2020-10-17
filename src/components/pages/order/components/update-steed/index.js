import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import UpdateSteedForm from './update-steed-form';

export default function UpdateSteed() {
    return (
        <Fragment>
            <Breadcrumb title="Modifier Coursiers" parent="Coursiers" parentUrl="coursiers"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Modifier ce coursier</h5>
                            </div>
                            <div className="card-body">
                                <UpdateSteedForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
