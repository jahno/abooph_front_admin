import React, { Fragment, useState, useRef } from 'react';

import { Tooltip } from 'antd';
import {toast } from 'react-toastify';
import { Link } from 'react-router-dom'

import { ToggleLeft, ToggleRight } from 'react-feather'
import Breadcrumb from '../../../../common/breadcrumb';
import Datatable from '../../../../common/datatable'
import {DeleteAlerte, handleDelete} from '../../../../common/custum-alerte-delete';

import { useRouteMatch, useHistory } from "react-router-dom";

import {avatar} from '../../../../../assets/images/public'

import {PUBLIC_ROUTE} from '../../../../../api/routes'

import {handleService} from '../../../../../helpers';
import {getDressmakers, deleteDressmaker, changeState} from '../../../../../services/dressmaker'

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
  
  function onFetchData(tableState, instance){
    setState(state => ({...state, loading: true}));
    const page = tableState ? tableState.page + 1 : state.items.page
    handleService(getDressmakers, page, 
      (response) => {
        setState(state => ({
          ...state, 
          items: response,
          hasMoreItems: response.lastPage > response.page,
          loading: false,
        }));
      },
      () => {setState(state => ({...state, loading: false}))}
    )
  }

  function handleClick (role, dressmaker) {
    if(role === 'delete'){
      handleDelete({type: 'open', value: dressmaker}, null, currentItem, toggleDeleteAlerte)
      return;
    }else if(role === 'toggleState'){
      if(state.ids.indexOf(dressmaker.id) !== -1) return;

      setState(state => ({
        ...state, 
        ids: [...state.ids, dressmaker.id]
      }));

      handleService(changeState, {state: dressmaker.Etat, id: dressmaker.id}, 
        (response) => {
          toast.success(response.msg)
          onFetchData()
          setState(state => ({
            ...state,
            ids: state.ids.filter(id => id !== dressmaker.id)
          }))
        },
        () => {
          setState(state => ({
            ...state,
            ids: state.ids.filter(id => id !== dressmaker.id)
          }))
        }
      )

      return;
    }

    history.push({
      pathname: `${url}/${dressmaker.id}/${role}`,
      state: {dressmaker}
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
            msg="Vous ne pourez plus recuperer ce couturier"
            data={currentItem.current}
            service={deleteDressmaker}
            deleteData={deleteItem}
            toggleAlerte={toggleDeleteAlerte}
        />
      )
    }
  }
  
  const columns = [
    {
      Header: 'Logo',
      accessor: 'logo', // String-based value accessors!
      Cell: (row) => (
        <div>
          <img 
            src={row.original.logo ? `${PUBLIC_ROUTE}${row.original.logo}` : avatar} 
            width="40" height="40" alt="" 
            style={{width: 40, height:40}}
          />
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
      Header: 'Adresse',
      accessor: 'Adresse_geographique',
      Cell: (row) => (
        row.original.Adresse_geographique || "aucune"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Categorie',
      id: 'categorieCouturier',
      accessor: data => {
        if(data.categorieCouturier) return data.categorieCouturier.nom
        return data.categorieCouturier
      },
      Cell: (row) => (
        row.original.categorieCouturier ? row.original.categorieCouturier.nom : "aucune"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: <b>Etat</b>,
      id: 'state',
      accessor: () => "state",
      Cell: (row) => {
        return(
        <div>
          {row.original.Etat === 1 ? (
            <Tooltip title='Désactiver' color='red'>
              <ToggleRight 
                size={30}
                style={getStyles(state.ids, row.original)}
                onClick={() => handleClick('toggleState', row.original)}
              />
            </Tooltip>
          ):(
            <Tooltip title='Activer' color='green'>
              <ToggleLeft
                size={30}
                style={getStyles(state.ids, row.original)}
                onClick={() => handleClick('toggleState', row.original, row.index)}
              />
            </Tooltip>
          )}
        </div>)
      },
      style: {
        textAlign: 'center'
      },
      sortable: false
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
      <Breadcrumb title="List des couturiers" parent="Couturiers" parentUrl="couturiers"/>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>List des couturiers</h5>
          </div>
          <div className="card-body">
            <div className="btn-popup pull-right">
              <Link to={`${url}/ajouter`} className="btn btn-secondary">Nouveau couturier</Link>
            </div>

            <div className="clearfix"></div>
            <div id="batchDelete" className="user-list">
              <Datatable 
                onFetchData={onFetchData} 
                state={state}
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

function getStyles(ids, item){
  const loading = ids.indexOf(item.id) !== -1

  const color = item.Etat === 1 ? "green" : "red";

  return {
    cursor:`${loading ? '' : 'pointer'}`, 
    color:`${loading ? 'gray' : color}`, 
    fontSize:30
  }
}