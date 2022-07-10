<script setup lang="ts">
  import { onBeforeMount, computed } from 'vue';
  import { useStore } from 'vuex';
  import IconArrow from '@/components/icon/IconArrow.vue';

  const store = useStore();

  const initSocket = () => {
    store.commit('orderBookWs/initWebsocket');
    store.commit('lastPriceWs/initWebsocket');
  };

  onBeforeMount(() => {
    initSocket();
  });

  const getBidList = computed(() => store.getters['orderBookWs/bids']);
  const getAskList = computed(() => store.getters['orderBookWs/asks']);
  const lastPrice = computed(() => store.getters['lastPriceWs/lastPrice']);
  const lastPriceDirection = computed(() => store.getters['lastPriceWs/lastPriceDirection']);
</script>

<template>
  <div>
    <div class="table">
      <div class="title">Order Book</div>

      <div class="heading">Price (USD)</div>
      <div class="heading">
        <span class="size">Size</span>
      </div>
      <div class="heading">
        <span class="size">Total</span>
      </div>

      <div
        v-for="row in getAskList"
        :key="row"
        class="rowWrapper"
        :class="{ newAskRowAnimation: row.type === 'new' }"
      >
        <div class="row ask">
          <span>{{ row.quote }}</span>
        </div>
        <div
          class="row"
          :class="{ increase: row.sizeDiff === 'increase', decrease: row.sizeDiff === 'decrease' }"
        >
          <span class="size">{{ row.size }}</span>
        </div>
        <div class="row">
          <span class="total">{{ row.total }}</span>
        </div>
      </div>
    </div>
    <div class="table">
      <div
        class="title"
        :class="{
          currentPriceIncrease: lastPriceDirection === 'up',
          currentPriceDecrease: lastPriceDirection === 'down',
          currentUnchange: lastPriceDirection === 'none',
        }"
      >
        <div class="currentprice">
          {{ lastPrice }}
          <IconArrow :direction="lastPriceDirection" />
        </div>
      </div>

      <div
        v-for="row in getBidList"
        :key="row"
        class="rowWrapper"
        :class="{ newBidRowAnimation: row.type === 'new' }"
      >
        <div class="row bid">
          <span>{{ row.quote }}</span>
        </div>
        <div
          class="row"
          :class="{ increase: row.sizeDiff === 'increase', decrease: row.sizeDiff === 'decrease' }"
        >
          <span class="size">{{ row.size }}</span>
        </div>
        <div class="row">
          <span class="total">{{ row.total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .table {
    display: grid;
    grid-template-columns: [col-start] auto [col-end];
    grid-template-rows: [title-start] 50px [title-end header-start] auto [header-end row-start] auto [row-end];
    grid-auto-rows: auto;
    grid-auto-columns: auto;
    overflow: hidden;
    background: #131b29;
    color: #f0f4f8;
    width: 400px;
    font-weight: bold;
  }

  .table .row,
  .table .heading,
  .table .title {
    padding: 7px 30px 7px 30px;
    position: relative;
  }

  .currentprice {
    margin: auto;
    width: 50%;
    font-size: 25px;
  }

  .heading {
    color: #8698aa;
    grid-row: header;
    text-align: left;
  }

  .title {
    color: white;
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row: title;
    font-size: 25px;
    text-align: left;
  }

  .row span {
    position: relative;
    z-index: 2;
  }

  .size {
    float: right;
  }

  .total {
    float: right;
  }

  .rowWrapper {
    display: contents;
    text-align: left;
  }

  .rowWrapper:hover > div {
    background-color: #1e3059;
  }

  .bid {
    color: #00b15d;
  }

  .ask {
    color: #ff5b5a;
  }

  .newAskRowAnimation > div {
    -webkit-animation: redFlash 1s; /* Safari 4+ */
    -moz-animation: redFlash 1s; /* Fx 5+ */
    -o-animation: redFlash 1s; /* Opera 12+ */
    animation: redFlash 1s; /* IE 10+, Fx 29+ */
  }

  .newBidRowAnimation > div {
    -webkit-animation: greenFlash 1s; /* Safari 4+ */
    -moz-animation: greenFlash 1s; /* Fx 5+ */
    -o-animation: greenFlash 1s; /* Opera 12+ */
    animation: greenFlash 1s; /* IE 10+, Fx 29+ */
  }

  .increase {
    -webkit-animation: redFlash 1s; /* Safari 4+ */
    -moz-animation: redFlash 1s; /* Fx 5+ */
    -o-animation: redFlash 1s; /* Opera 12+ */
    animation: redFlash 1s; /* IE 10+, Fx 29+ */
  }

  .decrease {
    -webkit-animation: greenFlash 1s; /* Safari 4+ */
    -moz-animation: greenFlash 1s; /* Fx 5+ */
    -o-animation: greenFlash 1s; /* Opera 12+ */
    animation: greenFlash 1s; /* IE 10+, Fx 29+ */
  }

  @-webkit-keyframes redFlash {
    0%,
    49% {
      background-color: rgba(255, 91, 90, 0.5);
    }
    50%,
    100% {
      background-color: default;
    }
  }

  @-webkit-keyframes greenFlash {
    0%,
    49% {
      background-color: rgba(0, 177, 93, 0.5);
    }
    50%,
    100% {
      background-color: default;
    }
  }

  .newBidFlash {
    background: rgba(0, 177, 93, 0.5);
  }

  .currentPriceIncrease {
    color: #00b15d;
    background-color: rgba(16, 186, 104, 0.12);
  }

  .currentPriceDecrease {
    color: #ff5b5a;
    background-color: rgba(255, 90, 90, 0.12);
  }

  .currentUnchange {
    color: #f0f4f8;
    background-color: rgba(134, 152, 170, 0.12);
  }
</style>
