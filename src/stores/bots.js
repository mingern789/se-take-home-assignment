import { defineStore, acceptHMRUpdate } from "pinia";
import { usePendingOrdersStore } from "../stores/pending-orders";

export const useBotStore = defineStore({
  id: "bots",
  state: () => ({
    bots: [], //active bots are stored in here
    id: 0, //unique id for each bot
  }),
  getters: {},
  actions: {
    /**
     * Add a bot
     */
    addBot() {
      this.bots.push({ botStatus: "AFK", id: this.id });
      this.id++;
      this.checkForPending(); //makes newly added bot to check for any orders on wait
    },

    /**
     * Remove a bot
     */
    removeBot() {
      //Will only run when bot list isn't empty
      if (this.bots.length > 0) {
        const orderStore = usePendingOrdersStore();
        this.bots.pop();
        //Below is the handler for any abandoned orders to be put back in the waiting queue
        for (let i of orderStore.orders) {
          if (
            i.status == "preparing" &&
            this.bots.filter((e) => e.id == i.assignedTo).length <= 0
          ) {
            i.status = "waiting";
            i.assignedTo = `abandoned by bot ${i.assignedTo}`;
          }
        }
      }
    },

    //Updates status to complete
    markAsComplete(id, order) {
      const orderStore = usePendingOrdersStore();
      for (let i of this.bots) {
        /** Matches available bots to assigned bot order id for completion, will only run when found,
         *  therefore timeout will not execute if bot with that id doesnt exist.
         **/
        if (i.id == id) {
          //Put the bot to rest after job is completed
          i.botStatus = "AFK";
          //Move the newly completed order to completed orders
          for (let e of orderStore.orders) {
            if (e.name == order.name) {
              orderStore.completeOrder(e.name);
            }
          }
          return;
        }
      }

      return;
    },

    //Starts the timer on the bots
    async getToWork(order) {
      const orderStore = usePendingOrdersStore();
      let botId;

      //searches for any afk bots to get them to do any orders on waiting
      if (this.bots.filter((e) => e.botStatus === "AFK").length > 0) {
        for (let i of this.bots) {
          if (i.botStatus == "AFK") {
            botId = i.id;
            break;
          }
        }

        //Will mark the ongoing order as completed once 10s mark is passed
        const timeout = setTimeout(this.markAsComplete, 10000, botId, order);

        //Put the bot in working mode
        for (let i of this.bots) {
          if (i.id == botId) {
            i.botStatus = `Preparing ${order.name}`;
          }
        }

        //Set the order as being prepared
        for (let i of orderStore.orders) {
          if (i.name == order.name) {
            i.status = "preparing";
            i.assignedTo = botId;
          }
        }
      } 
    },

    //checks if there are any pending orders available for bots to work on
    checkForPending() {
      const orderStore = usePendingOrdersStore();
      for (let i of orderStore.orders) {
        //checks for any order on waiting and also whether there are any bots available to handle the order
        if (
          i.status == "waiting" &&
          this.bots.filter((e) => e.botStatus == "AFK").length > 0
        ) {
          this.getToWork(i);
        }
      }
    },
  },
});
