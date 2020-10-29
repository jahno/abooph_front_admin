import React, { Fragment, useState, useRef } from 'react';

import {toast } from 'react-toastify';
import Breadcrumb from 'components/common/breadcrumb';
import Datatable from 'components/common/datatable'
import {DeleteAlerte, handleDelete} from 'components/common/custum-alerte-delete';

import { useRouteMatch, useHistory } from "react-router-dom";

import { deleteOrder, getOrders } from 'services/api'
import SteedList from '../add-steed';


function OrderList() {
  const { url } = useRouteMatch();
  const history = useHistory()

  const [state, setState] = useState({
    affectSteedIsVisible: false,
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
    
    getOrders(page, (response) => {
      setState(state => ({
        ...state, 
        affectSteedIsVisible: false,
        items: response.results,
        hasMoreItems: response.results.lastPage > response.page,
        loading: false,
      }));
      },
      () => {setState(state => ({...state, loading: false, affectSteedIsVisible: false}))}
    )
  }

  function handleAffetOrderToSteed(item, isLoadingData){
    if(isLoadingData){
      onFetchData()
    }else{
      currentItem.current = item || null
      setState(state => ({
        ...state, 
        affectSteedIsVisible: !state.affectSteedIsVisible,
      }))
    }
  }

  function handleClick (role, steed) {
    if(role === 'delete'){
      handleDelete({type: 'open', value: steed}, null, currentItem, toggleDeleteAlerte)
      return;
    }
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
          msg="Vous ne pourez plus recuperer cette commande"
          data={currentItem.current}
          service={deleteOrder}
          deleteData={deleteItem}
          toggleAlerte={toggleDeleteAlerte}
        />
      )
    }
  }

  const columns = [
    {
      Header: 'Nom',
      accessor: 'user.nom', // String-based value accessors!
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Email',
      accessor: 'user.email',
      style: {
        textAlign: 'center'
      }
    }, 
    {
      Header: 'Téléphone',
      accessor: 'user.numero',
      Cell: (row) => (
        row.original.user.numero || "aucun"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Lieu de livraison',
      accessor: 'adresse',
      Cell: (row) => (
        row.original.adresse || "aucune"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: 'Total',
      accessor: 'total',
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: <b>Etat</b>,
      id: 'state',
      accessor: () => "state",
      Cell: (row) => (
        <span style={getStyles(row.original)}>
          {row.original.etatText[row.original.etat]}
        </span>
      ),
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
          {row.original.etat == 0 && (
            <Fragment>
              <span onClick={() => handleClick('delete', row.original)} style={{cursor: 'pointer'}}>
                <i className="fa fa-trash" style={{ width: 35, fontSize: 20, padding: 11, color: '#e4566e' }}></i>
              </span>

              <span onClick={() => handleAffetOrderToSteed(row.original)} style={{cursor: 'pointer'}}>
                <i className="fa fa-user" style={{ width: 35, fontSize: 20, padding: 11,color:'rgb(40, 167, 69)' }}></i>
              </span>
          </Fragment>
          )}

          <span 
            onClick={() => {
              history.push({
                pathname: `${url}/${row.original.id}/detail`,
                state: {order: row.original}
              })
            }}
            style={{cursor: 'pointer'}}
          >
            <i className="fa fa-eye" style={{ width: 35, fontSize: 20, padding: 11, color:'rgb(40, 167, 69)' }}></i>
          </span>
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
      <Breadcrumb title="List des commandes" parent="Commandes" parentUrl="commandes"/>
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h5>List des commandes</h5>
          </div>
          <div className="card-body">
            {/* <div className="btn-popup pull-right">
              <Link to={`${url}/ajouter`} className="btn btn-secondary">Nouveau coursier</Link>
            </div> */}

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

      {state.affectSteedIsVisible && (
        <SteedList 
          isVisible={state.affectSteedIsVisible}
          onCancel={handleAffetOrderToSteed}
          order={currentItem.current}
        />
      )}
    </Fragment>
  )
}

export default OrderList

function getStyles(item){
  const color = item.etat == 0 ? "rgb(255, 128, 132)" : "rgb(102, 209, 212)";
  return {
    color,
    cursor:'pointer',
  }
}