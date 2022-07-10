import { createStore } from 'vuex';
import formatThousandSeparator from '@/utils/formatter';

interface stateInt {
  data: Object;
  lastPrice: number;
  lastPriceDirection: string;
  lastPriceWebSocket: WebSocket;
}

const state: stateInt = {
  data: {},
  lastPrice: 0,
  lastPriceDirection: '',
  lastPriceWebSocket: new WebSocket('wss://ws.btse.com/ws/futures'),
};

export default {
  namespaced: true,
  state,
  mutations: {
    initWebsocket(state: stateInt) {
      state.lastPriceWebSocket = new WebSocket('wss://ws.btse.com/ws/futures');

      state.lastPriceWebSocket.onopen = function () {
        state.lastPriceWebSocket.send(
          JSON.stringify({ op: 'subscribe', args: ['tradeHistoryApi:BTCPFC'] }),
        );
      };

      state.lastPriceWebSocket.onmessage = function (e: any) {
        const data = JSON.parse(e.data);
        if (data.topic === 'tradeHistoryApi') {
          state.lastPriceDirection =
            state.lastPrice === data.data[0].price
              ? state.lastPriceDirection
              : state.lastPrice > data.data[0].price
              ? 'down'
              : 'up';
          state.lastPrice = data.data[0].price;
        }
      };

      state.lastPriceWebSocket.onerror = function () {
        console.log('websocket error');
      };
      state.lastPriceWebSocket.close = function () {
        console.log('websocked closed');
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
