<script setup lang="ts">
  import { useWebSocket } from '@vueuse/core';
  import { ref, computed } from 'vue';
  import type { OrderInterface } from '@/interfaces/OrderInterface';
  const { status, data, send, open, close } = useWebSocket('wss://ws.btse.com/ws/oss/futures');

  send(JSON.stringify({ op: 'subscribe', args: ['update:BTCPFC'] }));
  console.log(data);
  const snapshot = ref();

  const list = computed(() => {
    const formattedData = JSON.parse(data.value);
    const bids = formattedData.data.bids;
    const asks = formattedData.data.asks;
    const type = formattedData.data.type;
    console.log(type);
    if (type === 'snapshot') {
      snapshot.value = bids;
    }
    return {
      bids,
      asks,
      type,
    };
  });
</script>

<template>
  <div class="wrapper">
    <div class="box header">{{ status }}</div>

    <div class="box table-head price-table-head">Price (USD)</div>
    <div class="box table-head size-table-head">Size</div>
    <div class="box table-head total-table-head">Total</div>

    <div class="box price-content buy-quote">buy</div>
    <div class="box size-content">size</div>
    <div class="box total-content">total</div>

    <div class="box accumulate-content">1234455</div>
  </div>
</template>

<style scoped>
  .header {
    color: white;
  }

  .table-head {
    color: #8698aa;
  }

  .buy-quote {
    color: #00b15d;
  }

  .sell-quote {
    color: #ff5b5a;
  }

  .price-table-head {
    grid-area: price-table-head;
  }

  .size-table-head {
    grid-area: size-table-head;
  }

  .total-table-head {
    grid-area: total-table-head;
  }

  .price-content {
    grid-area: price-content;
  }

  .size-content {
    grid-area: size-content;
  }

  .total-content {
    grid-area: total-content;
  }

  .accumulate-content {
    grid-area: accumulate-content;
    color: #00b15d;
  }

  .header {
    grid-area: header;
  }

  .wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 120px 120px 120px;
    grid-template-areas:
      'header header header'
      'price-table-head size-table-head total-table-head'
      'price-content size-content total-content'
      'accumulate-content accumulate-content accumulate-content';
    background-color: #131b29;
    color: #f0f4f8;
    text-align: left;
    padding: 10px;
  }

  /* .box {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
  } */
</style>
