import { generateOrders, mutateOrders, accumulateLastQuotes } from '@/composables/orderGenerator';
import { OrderModel } from '@/models/OrderModel';
import formatThousandSeparator from '@/utils/formatter';

interface stateInt {
  displayBidQuotes: OrderModel[];
  displayAskQuotes: OrderModel[];
  webSocket: WebSocket;
  seqNum: number;
}

const state: stateInt = {
  displayBidQuotes: [],
  displayAskQuotes: [],
  webSocket: new WebSocket('wss://ws.btse.com/ws/oss/futures'),
  seqNum: 0,
};

const SUBSCRIBE_MESSAGE = { op: 'subscribe', args: ['update:BTCPFC'] };

export default {
  namespaced: true,
  state,
  mutations: {
    initWebsocket(state: stateInt) {
      state.webSocket = new WebSocket('wss://ws.btse.com/ws/oss/futures');

      state.webSocket.onopen = function () {
        state.webSocket.send(JSON.stringify(SUBSCRIBE_MESSAGE));
      };

      state.webSocket.onmessage = function (e: any) {
        const data = JSON.parse(e.data);

        if (data.prevSeqNum !== state.seqNum && state.seqNum !== 0) {
          console.log('you need to resubscribe');
          state.webSocket.send(JSON.stringify(SUBSCRIBE_MESSAGE));
        }
        state.seqNum = data.seqNum;

        switch (data.data?.type) {
          case 'snapshot':
            state.displayAskQuotes = generateOrders(data.data.asks);
            state.displayBidQuotes = generateOrders(data.data.bids);
            break;

          case 'delta':
            state.displayAskQuotes = mutateOrders(data.data.asks, state.displayAskQuotes);
            state.displayBidQuotes = mutateOrders(data.data.bids, state.displayBidQuotes);
            break;
        }
      };

      state.webSocket.onerror = function () {
        console.log('websocket error');
      };
      state.webSocket.close = function () {
        console.log('websocked closed');
      };
    },
  },
  getters: {
    asks: (state: stateInt) => {
      return accumulateLastQuotes(state.displayAskQuotes, 8, 'desc').map((item: OrderModel) => {
        return {
          ...item,
          quote: formatThousandSeparator(parseInt(item.quote)),
          size: formatThousandSeparator(item.size),
          total: formatThousandSeparator(item.total),
        };
      });
    },
    bids: (state: stateInt) => {
      return accumulateLastQuotes(state.displayBidQuotes, 8, 'asc').map((item: OrderModel) => {
        return {
          ...item,
          quote: formatThousandSeparator(parseInt(item.quote)),
          size: formatThousandSeparator(item.size),
          total: formatThousandSeparator(item.total),
        };
      });
    },
  },
  actions: {},
  modules: {},
};
