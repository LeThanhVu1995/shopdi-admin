import { Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

function PublicRoute({ children }) {
  const { isLogged } = useAuth();
  if (isLogged) return <Navigate to="/users" replace />;
  return children;
}

export default PublicRoute;
