import React, { useState } from 'react';
import Datatable from 'components/common/datatable'
import { Modal } from 'antd';

import { affectOrderToSteed } from 'services/api'

import {handleService} from 'helpers';
import { getSteeds } from 'services/steed'

function SteedList(props) {
  const { isVisible, onCancel, order } = props

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

  function onFetchData(tableState, instance){
    setState(state => ({...state, loading: true}));
    const page = tableState ? tableState.page + 1 : state.items.page
    handleService(getSteeds, page, 
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

  function affectOrder(steed){
    setState(state => ({
      ...state,
      loading: true,
    }));

    affectOrderToSteed(order.id, steed.id, (response) => {
      onCancel(null, true)
      },
      () => {setState(state => ({...state, loading: false}))}
    )
  }
  
  function handleCancel(){
    if(!state.loading){
      onCancel()
    }
  }

  const columns = [
    // {
    //   Header: 'Photo',
    //   accessor: 'avatar', // String-based value accessors!
    //   Cell: (row) => (
    //     <div>
    //       <img 
    //         src={row.original.logo ? `${PUBLIC_ROUTE}${row.original.avatar}` : avatar} 
    //         width="40" height="40" alt="" 
    //         style={{width: 40, height:40}}
    //       />
    //     </div>
    //   ),
    //   style: {
    //     textAlign: 'center'
    //   }
    // }, 
    {
      Header: 'Nom',
      accessor: 'nom', // String-based value accessors!
      style: {
        textAlign: 'center'
      }
    }, 
    // {
    //   Header: 'Prénom',
    //   accessor: 'prenom',
    //   style: {
    //     textAlign: 'center'
    //   }
    // },
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
      Header: 'Zone',
      accessor: 'Zone_intervention',
      Cell: (row) => (
        row.original.Zone_intervention || "aucune"
      ),
      style: {
        textAlign: 'center'
      }
    },
    {
      Header: <b>Action</b>,
      id: 'action',
      accessor: () => "action",
      Cell: (row) => (
        <span onClick={() => affectOrder(row.original)} style={{cursor: 'pointer', color: 'rgb(102, 209, 212)', fontWeight: 'bold'}}>
          affecter la commande
        </span>
      ),
      style: {
        textAlign: 'center'
      },
      sortable: false
    }
  ];

  return (
    <>
      <Modal
        title="affectation de coursier!"
        visible={isVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Datatable 
          onFetchData={onFetchData} 
          state={state} 
          columns={columns}
        />
      </Modal>
    </>
  )
}

export default SteedList
