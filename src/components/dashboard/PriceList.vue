<script setup lang="ts"></script>

<template>
  <div class="wrapper">
    <div class="box header">hEADER</div>

    <div class="box table-head price-table-head">TEST 1</div>
    <div class="box table-head size-table-head">TEST 2</div>
    <div class="box table-head total-table-head">TEST 3</div>

    <div class="box price-content buy-quote">A</div>
    <div class="box size-content">Content</div>
    <div class="box total-content">Content</div>
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
    color: #FF5B5A;
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

.header {
  grid-area: header;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px 120px 120px;
  grid-template-areas:
    "header header  header"
    "price-table-head size-table-head total-table-head"
    "price-content size-content total-content";
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
