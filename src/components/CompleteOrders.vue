<script setup>
import { ref } from 'vue'
import { useCompleteOrdersStore } from '../stores/complete-orders'


defineProps({
  msg: String
})

const orders = useCompleteOrdersStore()
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <p>{{orders.orders}}</p>

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
