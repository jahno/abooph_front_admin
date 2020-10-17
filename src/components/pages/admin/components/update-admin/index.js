import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import UpdateAdminForm from './update-admin-form';

export default function UpdateAdmin() {
    return (
        <Fragment>
            <Breadcrumb title="Modifier Admin" parent="Admins" parentUrl="admins"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Modifier cet admin</h5>
                            </div>
                            <div className="card-body">
                                <UpdateAdminForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
