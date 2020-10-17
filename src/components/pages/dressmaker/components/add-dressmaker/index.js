import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import AddDressmakerForm from './add-dressmaker-form';

export default function AddDressmaker() {
    return (
        <Fragment>
            <Breadcrumb title="Ajouter Couturier" parent="Couturiers" parentUrl="couturiers"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Ajouter un couturier</h5>
                            </div>
                            <div className="card-body">
                                <AddDressmakerForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
