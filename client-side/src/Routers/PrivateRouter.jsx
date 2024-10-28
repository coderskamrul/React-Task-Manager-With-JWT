import React from 'react'

const PrivateRouter = () => {
  return (
    <div>PrivateRouter</div>
  )
}

export default PrivateRouter

// import { useContext } from 'react';
// import { AuthContext } from '../providers/AuthProvider';
// import { Navigate, useLocation } from 'react-router';

// const PrivateRoute = ({children}) => {
//     const {user, loading} = useContext(AuthContext);
//     const location = useLocation();
//     // console.log(location.pathname);

//     if(loading) {
//         return <progress className="progress w-56"></progress>
//     }

//     if(user?.email){
//         return children;
//     }

//     return <Navigate state={location.pathname} to="/login" replace></Navigate>;
// };

// export default PrivateRoute;