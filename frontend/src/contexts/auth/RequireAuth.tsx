// hooks
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// context
import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (!auth.user) {
    return <Navigate to="/login" />;
  }

  return children;
};
export const RequireAuthAndAdmin = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const auth = useContext(AuthContext);

  if (!auth.user || auth.user.role != 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};
