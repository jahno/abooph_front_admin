import store from '../../redux/store'
import {API_ROUTE} from '../../api/routes'

export function getAdmins(){
  const url = `${API_ROUTE}/admin/show`;
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

export function getAdmin(id){
  const url = `${API_ROUTE}/admin/show/${id}`;
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

export function addAdmin(data){
  const url = `${API_ROUTE}/admin/create`;
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

export function updateAdmin({id, data}){
  const url = `${API_ROUTE}/admin/update/${id}`;
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

export function deleteAdmin(id){
  const url = `${API_ROUTE}/admin/destroy/${id}`;
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

export function updateProfile(data){
  const url = `${API_ROUTE}/admin/profile`;
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
