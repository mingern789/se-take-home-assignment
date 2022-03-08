import { defineStore, acceptHMRUpdate } from "pinia";
import { usePendingOrdersStore } from "../stores/pending-orders";

export const useBotStore = defineStore({
  id: "bots",
  state: () => ({
    bots: [],
    id:0 //unique id for each bot
  }),
  getters: {},
  actions: {
    /**
     * Add a bot
     */
    addBot() {
      this.bots.push({ botStatus: "AFK", id:this.id });
      this.id++;
      this.checkForPending();
    },

    /**
     * Remove a bot
     */
    removeBot() {
      if (this.bots.length > 0) {
        const orderStore = usePendingOrdersStore();
        this.bots.pop();
        for (let i of orderStore.orders) {
          if(i.status == 'preparing' && this.bots.filter(e => e.id == i.assignedTo).length <= 0) {
            i.status = 'waiting';
            i.assignedTo = `abandoned by bot ${i.assignedTo}`
          }
        }
      }
    },

    //Updates status to complete
    markAsComplete(id, order) {
      const orderStore = usePendingOrdersStore();
      for (let i of this.bots) {
          if(i.id == id) {
              i.botStatus = 'AFK';
              for (let e of orderStore.orders) {
                if (e.name == order.name) {
                  orderStore.completeOrder(e.name);
                }
              }
              return  
          }
      }
      //order abandon related fix WIP, should return nothing here and change status elsewhere
      for (let obj of orderStore.orders) {
        if (obj.name == order.name) {
          obj.status = "waiting";
        }
      }
    //   this.bots[index] = { botStatus: "AFK"};
      
    },

    //Starts the timer on the bots
    async getToWork(order) {
      const orderStore = usePendingOrdersStore();
      let botId;
      
      
      if (this.bots.filter(e => e.botStatus === 'AFK').length > 0) {
        for (let i of this.bots) {
            if(i.botStatus == 'AFK') {
                botId = i.id;
                break;
            }
        }  
        const timeout = setTimeout(this.markAsComplete, 10000, botId, order);

        // if (this.bots[0].progress != null) {
        //   setInterval(() => {
        //     this.bots[0].progress++;
        //   }, 1000);
        // }
        
        for (let i of this.bots) {
          if (i.id == botId) {
            i.botStatus = `Preparing ${order.name}`;
          }
        }

        // this.bots[0].botStatus = `Preparing ${order.name}`;

        // this.bots[0].orderObj = order;
        for (let i of orderStore.orders) {
          if (i.name == order.name) {
            i.status = "preparing";
            i.assignedTo = botId;
          }
        }
        // await this.delay(5000);

        // this.markAsComplete(0,order)
      } else {
        console.log("Insert logic for multiple bots here");
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
