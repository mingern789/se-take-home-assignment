<script setup>
import { ref, watch } from 'vue'
import { useBotStore } from '../stores/bots'
import { usePendingOrdersStore } from '../stores/pending-orders'


defineProps({
  msg: String
})

const bots = useBotStore();
const orders = usePendingOrdersStore();
const count = ref(0)

function addBot() {
    bots.addBot();
}

function removeBot() {
    bots.removeBot();
}

// watch for bot progress
// watch(bots.bots, async () => {
//   bots.bots.forEach(el => {
//       if(el.progress == 5) {
//           bots.markAsComplete(bots.bots.indexOf(el),el.orderObj);
//       }
//   });
// })

</script>

<template>
  <h1>{{ msg }}</h1>
<button @click="addBot">+ Bot</button>
<button @click="removeBot">- Bot</button>
  <p>{{bots.bots}}</p>

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
