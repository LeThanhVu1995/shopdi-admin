import BaseService from '../core/service';

class BcVoucherService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actGetBcVouchers() {
    return this.get('/bcvouchers');
  }

  actGetBcVoucher(id) {
    return this.get(`/bcvouchers/${id}`);
  }

  actPostBcVouchers({ amount, expiredDate, phoneOrEmail, value }) {
    return this.post('/bcvouchers', {
      amount,
      expiredDate,
      phoneOrEmail,
      value,
    });
  }

  actPostBcVouchersGenerator({ signature, publicKey, data }) {
    return this.post('/bcvouchers/generator', {
      signature,
      publicKey,
      data,
    });
  }

  actPostBcVouchersGenModel({ amount, expiredDate, phoneOrEmail, value }) {
    return this.post('/bcvouchers/gen_model', {
      amount,
      expiredDate,
      phoneOrEmail,
      value,
    });
  }

  actPutBcVoucher({ id, amount, value, expiredDate, phoneOrEmail }) {
    return this.put(`/bcvouchers/${id}`, {
      amount,
      value,
      expiredDate,
      phoneOrEmail,
    });
  }

  actDeleteBcVoucher({ id }) {
    return this.delete(`/bcvouchers/${id}`);
  }
}

export default BcVoucherService;
