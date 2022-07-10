<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
  direction?: string;
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'down',
});

const color = computed(() => (props.direction === 'down' ? '#FF5B5A' : '#00b15d'));
const rotate = computed(() => (props.direction === 'down' ? 'rotate(0)' : 'rotate(180)'));
</script>
<template>
  <span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="presentation"
      :fill="color"
      fill-rule="nonzero"
      :stroke="color"
      stroke-width="4"
      stroke-linecap="round"
      stroke-linejoin="round"
      :transform="rotate"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  </span>
</template>

<style lang="scss" scoped></style>
