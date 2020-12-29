import React, { Fragment, useState, useRef } from 'react';

import { Tooltip } from 'antd';
import {toast } from 'react-toastify';
import { Link } from 'react-router-dom'
import Breadcrumb from '../../../../common/breadcrumb';
import Datatable from '../../../../common/datatable'
import {DeleteAlerte, handleDelete} from '../../../../common/custum-alerte-delete';

import { useRouteMatch, useHistory } from "react-router-dom";

import {avatar} from '../../../../../assets/images/public'

import {handleService} from '../../../../../helpers';
import {getAdmins, deleteAdmin} from '../../../../../services/admin'

function List() {
  const { url } = useRouteMatch();
  const history = useHistory()

  const [state, setState] = useState({
    items: {
      total:  1,
      perPage: 1,
      page: 1,
      lastPage: 1,
      data: [],
      hasMoreItems: false,
    }, 
    loading: true,
    isDeleteAlerteOpen: false,
    ids: [],
  })

  const currentItem = useRef(null)
  
  function onFetchData(){
    setState(state => ({...state, loading: true}));

    handleService(getAdmins, null,
      (response) => {
        const length = response.length
        setState(state => ({
          ...state, 
          items: {
            ...state.items,
            total: length,
            perPage: length,
            data :response
          },
          loading: false,
        }));
      },
      () => {setState(state => ({...state, loading: false}))}
    )
  }

  function handleClick (role, admin) {
    if(role === 'delete'){
      handleDelete({type: 'open', value: admin}, null, currentItem, toggleDeleteAlerte)
      return;
    }

    history.push({
      pathname: `${url}/${admin.id}/${role}`,
      state: {admin}
    })
  }

  function deleteItem(action){
    toast.success(action.value.msg)

    onFetchData()

    setState(state => ({
      ...state,
      isDeleteAlerteOpen: false
    }))
  }

  function toggleDeleteAlerte(){
    setState(state => ({ ...state, isDeleteAlerteOpen: !state.isDeleteAlerteOpen}))
  }

  function displayDeleteAlerte(){
    if(state.isDeleteAlerteOpen){
      return(
        <DeleteAlerte
            isOpen={state.isDeleteAlerteOpen}
            msg="Vous ne pourez plus recuperer cet admin"
            data={currentItem.current}
            service={deleteAdmin}
            deleteData={deleteItem}
            toggleAlerte={toggleDeleteAlerte}
        />
      )
    }
  }

  const columns = [
    {
      Header: 'Photo',
      accessor: 'avatar', // String-based value accessors!
      Cell: () => (
        <div>
            <img src={avatar} width="40" height="40" alt="" style={{width: 40, height:40}}/>
        </div>
      ),
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Nom',
      accessor: 'nom', // String-based value accessors!
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Prénom',
      accessor: 'prenom',
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Email',
      accessor: 'email',
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Téléphone',
      accessor: 'numero',
      Cell: (row) => (
        row.original.numero || "aucun"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: <b>Action</b>,
      id: 'delete',
      accessor: () => "delete",
      Cell: (row) => (
        <div>
          <Tooltip title='Supprimer' color='red'>
            <span onClick={() => handleClick('delete', row.original)} style={{cursor: 'pointer'}}>
              <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}></i>
            </span>
          </Tooltip>

          <Tooltip title='Modifier' color='green'>
            <span onClick={() => handleClick('modifier', row.original)} style={{cursor: 'pointer'}}>
              <i className="fa fa-pencil" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
            </span>
          </Tooltip>
        </div>
      ),
      style: {
        textAlign: 'center'
      },
      sortable: false
    }
  ];

  return (
    <Fragment>
      <Breadcrumb title="List des admins" parent="Admins" parentUrl="admins"/>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>List des admins</h5>
          </div>
          <div className="card-body">
            <div className="btn-popup pull-right">
              <Link to={`${url}/ajouter`} className="btn btn-secondary">Nouveau admin</Link>
            </div>

            <div className="clearfix"></div>
            <div id="batchDelete" className="user-list">
              <Datatable 
                onFetchData={onFetchData} 
                state={state} setState={setState}
                handleClick={handleClick}
                columns={columns}
              />
            </div>
          </div>
        </div>
      </div>
      {displayDeleteAlerte()}
    </Fragment>
  )
}

export default List
