import BaseService from '../core/service';

class UserService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actGetUsers = () => {
    return this.get('/users');
  };

  actGetPaymentUsers = ({ type, pageSize, pageIndex }) => {
    return this.get('/users/payment', { type, pageSize, pageIndex });
  };

  actGetUsersToPup = ({ phone, amount }) => {
    return this.get('/users/topup', { phone, amount });
  };

  actPostUserProfile = ({ name, birthDay, gender, email, id }) => {
    return this.post('/users/profile', { name, birthDay, gender, email, id });
  };

  actPostUserAdmin = (params) => {
    return this.post('/users/admin', params);
  };
}

export default UserService;
