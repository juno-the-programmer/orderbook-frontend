import { createStore } from 'vuex';
import lastPriceWs from './lastPriceWs';
import orderBookWs from './orderBookWs';

export default createStore({
  modules: {
    lastPriceWs,
    orderBookWs,
  },
});
