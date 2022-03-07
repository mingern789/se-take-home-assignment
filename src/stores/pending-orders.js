import { defineStore, acceptHMRUpdate } from "pinia";
import { useCompleteOrdersStore } from '../stores/complete-orders'

export const usePendingOrdersStore = defineStore({
  id: "pending-orders",
  state: () => ({
    orders: [],
    regId: 1,
    vipId: 1,
  }),
  getters: {},
  actions: {
    /**
     * Add a regular order
     * @param {string} name
     */
    addOrder() {
      this.orders.push({name:`Regular ${this.regId}`,status:'waiting'});
      this.regId++;
    },

    /**
     * Add a vip order
     */
    addVipOrder() {
      if (!this.orders.length || !this.orders[0].name.includes("VIP")) {
        this.orders.unshift({name:`VIP ${this.vipId}`,status:'waiting'});
        this.vipId++;
      } else {
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].name.includes("Regular")) {
            this.orders.splice(i, 0, {name:`VIP ${this.vipId}`,status:'waiting'});
            this.vipId++;
            break;
          }
        }
        // alert('VIP exists')
      }
    },

    //move order to completed
    completeOrder(order) {
      const completeStore = useCompleteOrdersStore();
      completeStore.addOrder(order);
      this.orders.splice(this.orders.findIndex(item => item.name === order), 1);

    //   this.orders = this.orders.filter(function( obj ) {
    //     return obj.name != order;
    // });
    },

  },
});
