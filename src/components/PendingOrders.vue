<script setup>
import { computed, watch } from "vue";
import { usePendingOrdersStore } from "../stores/pending-orders";
import { useBotStore } from "../stores/bots";

const orders = usePendingOrdersStore();
const bot = useBotStore();

const ordersArr = computed({
  // getter
  get() {
    return orders.orders;
  },
});

/** Watch for changes to the pending orders, whenever there's a change this function will 
then determine whether to send bots to work**/
watch(ordersArr.value, async () => {
  if (
    bot.bots.length &&
    ordersArr.value.length &&
    bot.bots.filter((e) => e.botStatus == "AFK").length > 0
  ) {
    for (let i = 0; i < orders.orders.length; i++) {
      if (orders.orders[i].status == "waiting") {
        bot.getToWork(orders.orders[i]);
      }
    }
  }
});
</script>

<template>
  <h1>Pending orders</h1>

  <p>{{ ordersArr }}</p>
</template>
