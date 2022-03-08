<script setup>
import { usePendingOrdersStore } from "../stores/pending-orders";

const orders = usePendingOrdersStore();

//calls the addOrder function from the pending orders store
function addOrder() {
  orders.addOrder();
}

//calls the addVipOrder function from the pending orders store
function addVipOrder() {
  orders.addVipOrder();
}
</script>

<template>
  <h1>Order here</h1>
  <button @click="addOrder">New Normal Order</button>
  <button @click="addVipOrder">New VIP Order</button>
</template>

