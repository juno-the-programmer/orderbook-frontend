/* eslint-disable */
import formatThousandSeparator from '@/utils/formatter';

const SUBSCRIBE_MESSAGE = { op: 'subscribe', args: ['tradeHistoryApi:BTCPFC'] };
const LASTPRICE_WSS = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LASTPRICE_URL}`;
interface stateInt {
  data: Object;
  lastPrice: number;
  lastPriceDirection: string;
  lastPriceWebSocket: WebSocket | null;
}

const state: stateInt = {
  data: {},
  lastPrice: 0,
  lastPriceDirection: '',
  lastPriceWebSocket: null,
};

export default {
  namespaced: true,
  state,
  mutations: {
    initWebsocket(state: stateInt) {
      state.lastPriceWebSocket = new WebSocket(LASTPRICE_WSS);

      state.lastPriceWebSocket.onopen = () => {
        state.lastPriceWebSocket?.send(JSON.stringify(SUBSCRIBE_MESSAGE));
      };

      state.lastPriceWebSocket.onmessage = (e: any) => {
        const data = JSON.parse(e.data);
        if (data.topic === 'tradeHistoryApi') {
          if (state.lastPrice !== data.data[0].price) {
            if (state.lastPrice > data.data[0].price) {
              state.lastPriceDirection = 'down';
            } else {
              state.lastPriceDirection = 'up';
            }
          }
          state.lastPrice = data.data[0].price;
        }
      };
    },
  },
  getters: {
    lastPrice: (state: stateInt) => formatThousandSeparator(state.lastPrice.toFixed(1)),
    lastPriceDirection: (state: stateInt) => state.lastPriceDirection,
  },
  actions: {},
  modules: {},
};
