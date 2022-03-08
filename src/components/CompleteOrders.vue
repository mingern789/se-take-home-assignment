<script setup>
import { useCompleteOrdersStore } from '../stores/complete-orders'

const orders = useCompleteOrdersStore()

</script>

<template>
  <h1>Completed Orders</h1>

  <p>{{orders.orders}}</p>

</template>
