/* eslint-disable */
import { generateOrders, mutateOrders, accumulateLastQuotes } from '@/composables/orderGenerator';
import { OrderModel } from '@/models/OrderModel';
import formatThousandSeparator from '@/utils/formatter';

interface stateInt {
  displayBidQuotes: OrderModel[];
  displayAskQuotes: OrderModel[];
  webSocket: WebSocket | null;
  seqNum: number;
}

const state: stateInt = {
  displayBidQuotes: [],
  displayAskQuotes: [],
  webSocket: null,
  seqNum: 0,
};

const SUBSCRIBE_MESSAGE = { op: 'subscribe', args: ['update:BTCPFC'] };

export default {
  namespaced: true,
  state,
  mutations: {
    initWebsocket(state: stateInt) {
      state.webSocket = new WebSocket('wss://ws.btse.com/ws/oss/futures');

      state.webSocket.onopen = () => {
        state.webSocket?.send(JSON.stringify(SUBSCRIBE_MESSAGE));
      };

      state.webSocket.onmessage = (e: any) => {
        const data = JSON.parse(e.data);

        if (data.prevSeqNum !== state.seqNum && state.seqNum !== 0) {
          state.webSocket?.send(JSON.stringify(SUBSCRIBE_MESSAGE));
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

          default:
            break;
        }
      };
    },
  },
  getters: {
    asks: (state: stateInt) =>
      accumulateLastQuotes(state.displayAskQuotes, 8, 'desc').map((item: OrderModel) => {
        return {
          ...item,
          quote: formatThousandSeparator(item.quote),
          size: formatThousandSeparator(item.size),
          total: formatThousandSeparator(item.total),
        };
      }),
    bids: (state: stateInt) =>
      accumulateLastQuotes(state.displayBidQuotes, 8, 'asc').map((item: OrderModel) => {
        return {
          ...item,
          quote: formatThousandSeparator(item.quote),
          size: formatThousandSeparator(item.size),
          total: formatThousandSeparator(item.total),
        };
      }),
  },
  actions: {},
  modules: {},
};
