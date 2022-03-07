<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import PendingOrders from './components/PendingOrders.vue'
import CompleteOrders from './components/CompleteOrders.vue'
import BotKitchen from './components/BotKitchen.vue'
import CustomerPanel from './components/CustomerPanel.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <PendingOrders msg="Pending Orders" />
  <CompleteOrders msg="Complete Orders" />
  <BotKitchen msg="Bot Kitchen" />
  <CustomerPanel msg="Order here" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
