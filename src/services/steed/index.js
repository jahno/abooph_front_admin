import store from '../../redux/store'
import {API_ROUTE} from '../../api/routes'

export function getSteeds(page){
  const token = store.getState().auth.token
  let url = `${API_ROUTE}/admin/coursier`;

  if(page) url = `${API_ROUTE}/admin/coursier?page=${page}`;

  return (
    fetch(url,{
      method:"GET",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  );
}

export function getSteed(id){
  const url = `${API_ROUTE}/admin/coursier/${id}`;
  const token = store.getState().auth.token
  return (
      fetch(url,{
          method:"GET",
          headers:{
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
          },
      })
  );
}

export function addSteed(data){
  const url = `${API_ROUTE}/admin/coursier`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}

export function updateSteed({id, data}){
  const url = `${API_ROUTE}/admin/coursier/${id}`;
  const token = store.getState().auth.token
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify(data)
    })
  );
}

export function deleteSteed(id){
  const url = `${API_ROUTE}/admin/coursier/${id}`;
  const token = store.getState().auth.token
  return (
    fetch(url,{
      method:"DELETE",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
  );
}

export function changeState({id, state}){
  const url = `${API_ROUTE}/admin/coursier/${id}/publish`;
  const token = store.getState().auth.token
  
  return (
    fetch(url,{
      method:"PUT",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body:JSON.stringify({state})
    })
  );
}

