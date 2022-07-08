<script setup lang="ts">
  import { useWebSocket } from '@vueuse/core';
  import { ref, computed } from 'vue';
  import type { OrderInterface } from '@/interfaces/OrderInterface';
  const { status, data, send, open, close } = useWebSocket('wss://ws.btse.com/ws/oss/futures');

  send(JSON.stringify({ op: 'subscribe', args: ['update:BTCPFC'] }));
  console.log(data);
  const snapshot = ref();

  // const list = computed(() => {
  //   const formattedData = JSON.parse(data.value);
  //   const bids = formattedData.data.bids;
  //   const asks = formattedData.data.asks;
  //   const type = formattedData.data.type;
  //   console.log(type);
  //   if (type === 'snapshot') {
  //     snapshot.value = bids;
  //   }
  //   return {
  //     bids,
  //     asks,
  //     type,
  //   };
  // });
</script>

<template>
  <div class="table">
    <div class="heading">Title 1</div>
    <div class="heading">Title 2</div>
    <div class="heading">Title 3</div>

    <div class="rowWrapper" v-for="row in 8" :key="row">
      <div class="row"><span>s {{ row }}</span></div>
      <div class="row"><span>s {{ row }}</span></div>
      <div class="row"><span>s {{ row }}</span></div>
    </div>

    <div class="rowWrapper" v-for="row in 8" :key="row">
      <div class="row"><span>b {{ row }}</span></div>
      <div class="row"><span>b {{ row }}</span></div>
      <div class="row"><span>b {{ row }}</span></div>
    </div>

  </div>
</template>

<style scoped>
  .table {
    display: grid;
    grid-template-columns: [col-start] auto [col-end];
    grid-template-rows: [header-start] 50px [header-end row-start] auto [row-end];
    grid-auto-rows: auto;
    grid-auto-columns: auto;
    overflow: hidden;
    background: #131B29;
    color: #F0F4F8;
  }

  .table .row,
  .table .heading {
    padding: 10px;
    position: relative;
  }

  .heading {
    color: #8698aa;
    grid-row: header;
  }

  .row span {
    position: relative;
    z-index: 2;
  }

  .rowWrapper {
    display: contents;
  }

  .rowWrapper:hover > div {
    background-color: #1E3059;
  }
</style>
