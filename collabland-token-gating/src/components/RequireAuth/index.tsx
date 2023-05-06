import { Navigate, useLocation } from 'react-router-dom';

import React from 'react';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  // let auth = useAuth();
  const location = useLocation();
  const toeknFromLocalStorage = localStorage.getItem('@collab.land:token-gating');
  if (toeknFromLocalStorage) {
    return children;
  } else {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
