<script setup>
import { useBotStore } from "../stores/bots";
import { usePendingOrdersStore } from "../stores/pending-orders";

const bots = useBotStore();
const orders = usePendingOrdersStore();

//calls the addbot function from the bot store
function addBot() {
  bots.addBot();
}

//calls the removebot function from the bot store
function removeBot() {
  bots.removeBot();
}
</script>

<template>
  <h1>Bot Kitchen</h1>
  <button @click="addBot">+ Bot</button>
  <button @click="removeBot">- Bot</button>
  <p>{{ bots.bots }}</p>
</template>
