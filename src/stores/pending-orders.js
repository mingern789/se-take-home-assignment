import { defineStore, acceptHMRUpdate } from "pinia";
import { useCompleteOrdersStore } from "../stores/complete-orders";

export const usePendingOrdersStore = defineStore({
  id: "pending-orders",
  state: () => ({
    orders: [],
    regId: 1, //ID to keep track of regular orders
    vipId: 1, //ID to keep track of vip orders
  }),
  getters: {},
  actions: {
    /**
     * Add a regular order
     */
    addOrder() {
      this.orders.push({ name: `Regular ${this.regId}`, status: "waiting" });
      this.regId++;
    },

    /**
     * Add a vip order
     */
    addVipOrder() {
      //Situation 1: Moves vip orders to the front if there are only regular orders in the list.
      if (this.orders.length && !this.orders[0].name.includes("VIP")) {
        this.orders.unshift({ name: `VIP ${this.vipId}`, status: "waiting" });
        this.vipId++;
      }
      //Situation 2: Simply pushes the vip order if list is empty
      else if (!this.orders.length) {
        this.orders.push({
          name: `VIP ${this.vipId}`,
          status: "waiting",
        });
        this.vipId++;
      } else if (
      /** Situation 3: Vip and regular orders already exist in the list, so new vip orders
       * should be then added in front of regular orders but behind existing vip orders.
       **/
        this.orders.filter((e) => e.name.includes("Regular")).length > 0
      ) {
        for (let i = 0; i < this.orders.length; i++) {
          //Searches for the first regular order then places the vip order in front of them.
          if (this.orders[i].name.includes("Regular")) {
            this.orders.splice(i, 0, {
              name: `VIP ${this.vipId}`,
              status: "waiting",
            });
            this.vipId++;
            break;
          }
        }
      }
      //Simply pushes to the list if only vip orders exist.
      else {
        this.orders.push({
          name: `VIP ${this.vipId}`,
          status: "waiting",
        });
        this.vipId++;
      }
    },

    //move order to from pending to completed.
    completeOrder(order) {
      const completeStore = useCompleteOrdersStore();
      completeStore.addOrder(order);
      this.orders.splice(
        this.orders.findIndex((item) => item.name === order),
        1
      );
    },
  },
});
