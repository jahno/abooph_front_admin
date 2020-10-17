import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import AddAdminForm from './add-admin-form';

export default function AddAdmin() {
    return (
        <Fragment>
            <Breadcrumb title="Ajouter Admin" parent="Admins" parentUrl="admins"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Ajouter un admin</h5>
                            </div>
                            <div className="card-body">
                                <AddAdminForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
