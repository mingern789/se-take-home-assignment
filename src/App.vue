<script setup>
//import components for use 
import PendingOrders from './components/PendingOrders.vue'
import CompleteOrders from './components/CompleteOrders.vue'
import BotKitchen from './components/BotKitchen.vue'
import CustomerPanel from './components/CustomerPanel.vue'
</script>

<template>
  <PendingOrders />
  <CompleteOrders />
  <BotKitchen />
  <CustomerPanel />
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

button {
  background-color: white; /* Green */
  border: none;
  color: black;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>
