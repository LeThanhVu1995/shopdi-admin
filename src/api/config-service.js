import BaseService from '../core/service';

class ConfigService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actGetConfigById = (key) => {
    return this.get(`/configs/${key}`);
  };

  actPostConfigs = ({ id, key, value, createdAt, updatedAt, deletedAt }) => {
    return this.post('/configs', {
      id,
      key,
      value,
      createdAt,
      updatedAt,
      deletedAt,
    });
  };

  actPutConfigById = ({ id, key, value, createdAt, updatedAt, deletedAt }) => {
    return this.put(`/configs/${key}`, {
      id,
      key,
      value,
      createdAt,
      updatedAt,
      deletedAt,
    });
  };

  actDeleteConfigById = (key) => {
    return this.delete(`/configs/${key}`);
  };
}

export default ConfigService;
