<script setup>
import { ref, computed, watch } from 'vue'
import { usePendingOrdersStore } from '../stores/pending-orders'
import { useBotStore } from '../stores/bots'


defineProps({
  msg: String
})

const orders = usePendingOrdersStore();
const bot = useBotStore();
const count = ref(0);

const ordersArr = computed({
  // getter
  get() {
    return orders.orders
  },
})

// watch for changes to the pending orders
watch(ordersArr.value, async () => {
  if(bot.bots.length && ordersArr.value.length) {
    bot.getToWork(orders.orders[0]);
  }
})
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>{{ordersArr}}</p>

  <!-- <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
