import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import UpdateArticleForm from './update-article-form';

export class UpdateArticle extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Modifier article" parent="Articles" parentUrl="produits"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Modifier article</h5>
                                </div>
                                <div className="card-body">
                                    <UpdateArticleForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UpdateArticle
