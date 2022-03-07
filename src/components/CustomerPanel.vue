<script setup>
import { ref } from 'vue'
import { usePendingOrdersStore } from '../stores/pending-orders'


defineProps({
  msg: String
})

const orders = usePendingOrdersStore()
const count = ref(0)

function addOrder() {
    orders.addOrder();
}

function addVipOrder() {
    orders.addVipOrder();
}
</script>

<template>
  <h1>{{ msg }}</h1>
<button @click="addOrder">New Normal Order</button>
<button @click="addVipOrder">New VIP Order</button>

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
