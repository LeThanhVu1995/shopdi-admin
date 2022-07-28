import BaseService from '../core/service';

class HiddenPriceService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actPostHiddenPriceSetting = (params) => {
    return this.post('/hiddenprice/setting', params);
  };

  actGetHiddenPriceHistoryBySkd = (sku, params) => {
    return this.get(`/hiddenprice/history/${sku}`, params);
  };

  actGetHiddenPriceHistoryDetailById = (id, params) => {
    return this.get(`/hiddenprice/history/detail/${id}`, params);
  };

  actGetHiddenPriceTransactions = ({ page, pageSize, keyword }) => {
    return this.get('/hiddenprice/transactions', { page, pageSize, keyword });
  };
}

export default HiddenPriceService;
