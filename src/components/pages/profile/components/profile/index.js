import React, {Fragment} from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import TabsetProfile from './tabset-profile';
import Breadcrumb from '../../../../common/breadcrumb';

export function Profile () {
  const { url } = useRouteMatch();
  return (
    <Fragment>
      <Breadcrumb title="Mon Profil"/>
      <div className="container-fluid">
        <div className="row">
            
          <div className="col-xl-12">
            <div className="btn-popup pull-right">
              <Link to={`${url}/modifier`} className="btn btn-secondary">modifier profil</Link>
            </div>
          </div>

          <div className="col-xl-12">
            <div className="card profile-card">
              <div className="card-body">
                <TabsetProfile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Profile
