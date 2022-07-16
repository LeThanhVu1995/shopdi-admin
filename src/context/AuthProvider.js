import { useCallback, useMemo, useState } from 'react';
import { AuthService } from '../api';
import { ACCESS_TOKEN_KEY } from '../core/constants';
import { AuthContext } from '../hook/useAuth';

const authService = new AuthService();

function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem('USER_INFO')
      ? JSON.parse(localStorage.getItem('USER_INFO'))
      : null
  );
  const [isLogged, setIsLogged] = useState(
    !!(localStorage.getItem(ACCESS_TOKEN_KEY) || '')
  );

  const setIsLoggedState = useCallback(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
    setIsLogged(token);
  }, []);

  const signin = useCallback((username, password) => {
    return (async () => {
      const user = { username, password };
      const { status, data } = await authService.actSignin(user);
      if (status) {
        const { token, userInfo } = data;
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
        localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
        setUser(userInfo);
        setIsLoggedState();
      }
    })();
  }, []);

  const signout = useCallback(() => {
    return (async () => {
      await authService.actSignout();
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      setIsLoggedState();
      setUser(null);
    })();
  }, []);

  const params = useMemo(() => {
    return {
      user,
      signin,
      signout,
      isLogged,
    };
  }, [user]);

  return <AuthContext.Provider value={params}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
