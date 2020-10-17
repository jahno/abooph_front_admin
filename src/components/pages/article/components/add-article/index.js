import React, { Component,Fragment } from 'react';
import Breadcrumb from '../../../../common/breadcrumb';

// Shared components
import AddArticleForm from './add-article-form';

export default class AddArticle extends Component {
    render() {
        return (
            <Fragment>
                <Breadcrumb title="Ajouter Article" subTitle="Ajouter un nouvel article" parent="Articles" parentUrl="articles"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Ajouter un nouvel article</h5>
                                </div>
                                <div className="card-body">
                                    <AddArticleForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
