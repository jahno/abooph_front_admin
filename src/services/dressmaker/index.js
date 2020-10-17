import {API_ROUTE} from '../../api/routes'
import store from '../../redux/store'

export function getCategories(){
  const token = store.getState().auth.token
  const url = `${API_ROUTE}/admin/categoriecouturier/all`;
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

export function getDressmakers(){
  const url = `${API_ROUTE}/admin/couturier`;
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

export function getDressmaker(id){
  const url = `${API_ROUTE}/admin/couturier/${id}`;
  const token = store.getState().auth.token;
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

export function addDressmaker(data){
  const url = `${API_ROUTE}/admin/couturier`;
  const token = store.getState().auth.token;
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

export function updateDressmaker({id, data}){
  const url = `${API_ROUTE}/admin/couturier/${id}`;
  const token = store.getState().auth.token;
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

export function deleteDressmaker(id){
  const url = `${API_ROUTE}/admin/couturier/${id}`;
  const token = store.getState().auth.token;
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
  const url = `${API_ROUTE}/admin/couturier/${id}/publish`;
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

