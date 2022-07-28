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
}

export default UserService;
