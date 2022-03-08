import { defineStore, acceptHMRUpdate } from "pinia";

export const useCompleteOrdersStore = defineStore({
  id: "complete-orders",
  state: () => ({
    orders: [],
  }),
  getters: {},
  actions: {
    
    // add new completed order to the list
    addOrder(order) {
      this.orders.push(order);
    },
  },
});
