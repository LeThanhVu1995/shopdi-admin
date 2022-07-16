import BaseService from '../core/service';

class AuthService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actSignin = ({ username, password }) => {
    return this.post('/auth/login', { username, password });
  };

  actSignout = () => {
    return this.post('/auth/logout');
  };
}

export default AuthService;
