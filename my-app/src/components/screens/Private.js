import React,{useContext} from 'react'
import { UserContext } from '../../App'
import { Navigate,useLocation } from 'react-router-dom'

function Private({Element}) {
    const {userdata}=useContext(UserContext)
    const location = useLocation()
  return userdata?.access? Element : <Navigate to={
    {
        pathname:'/login',
        search:`?next=${location.pathname}`

    }
  }/>
}

export default Private
