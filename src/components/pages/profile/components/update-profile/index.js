import React, { Fragment } from 'react'

// Shared components
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import UpdateProfilForm from './update-profile-form';

export default function UpdateSteed() {
    return (
        <Fragment>
            <Breadcrumb title="Modifier profil" parent="Mon profil" parentUrl="profil"/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h5> Modifier profil</h5>
                            </div>
                            <div className="card-body">
                                <UpdateProfilForm />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
