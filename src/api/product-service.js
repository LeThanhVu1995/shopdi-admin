import BaseService from '../core/service';

class ProductService extends BaseService {
  constructor(props = {}) {
    super(props);
  }

  actGetProducts = ({ keyword, sortBy, page, pageSize }) => {
    return this.get('/products', { keyword, sortBy, page, pageSize });
  };
}

export default ProductService;
