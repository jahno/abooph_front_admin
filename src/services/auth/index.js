// api routes
import {API_ROUTE} from '../../api/routes'

export function signInAdmin(data){
  const url = `${API_ROUTE}/auth/login/admin`;
  return (
    fetch(url, {
        method:"POST",
        headers:{
          "Accept": "application/json",
          "Content-type": "application/json",
        },
        body:JSON.stringify(data)
    })
  );
}

export function passwordEmail(data){
  const url = `${API_ROUTE}/auth/reset/admin`;

  return (
    fetch(url, {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body:JSON.stringify(data)
    })
  )
}

export function passwordReset(data){
  const url = `${API_ROUTE}/auth/reset/password/admin`;
  return (
    fetch(url, {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body:JSON.stringify(data)
    })
  );
}
