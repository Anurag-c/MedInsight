import React, { useContext, useEffect } from 'react';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

// const withProtectedRoute = (Component: React.ComponentType<any>) => {
//     return (props: any) => {
//       const auth = useContext(AuthContext);
//       const navigate = useNavigate();

//       // useEffect(() => {
//       //   console.log(auth, 'auth inside hoc')
//       //   if (!auth) {
//       //     // handle the error, probably throw an error or navigate to a different page
//       //     navigate('/');
//       //     // return null;
//       //   }
    
//       //   if (!auth?.authState.isLoggedIn) {
//       //     navigate('/auth/login');
//       //     // return null;
//       //   }
//       // }, [auth])
//       console.log(auth, 'auth in hoc')
//       if (auth?.authState?.isLoggedIn) {
//         return <Component {...props} />;
//       } else {
//         return <Navigate to="/auth/login" />
//       }
  
//       // return <Component {...props} />;
//     };
// };

// export default withProtectedRoute;

const ProtectedRoute = (props:any) => {
  const auth = useContext(AuthContext);
  if (!auth?.authState?.isLoggedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;