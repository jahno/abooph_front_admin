import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import UpdateDressmakerForm from './update-dressmaker-form';

export default function UpdateDressmaker() {
    return (
        <Fragment>
            <Breadcrumb title="Modifier Couturiers" parent="Couturiers" parentUrl="couturiers"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Modifier ce couturier</h5>
                            </div>
                            <div className="card-body">
                                <UpdateDressmakerForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
