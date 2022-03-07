import { defineStore, acceptHMRUpdate } from 'pinia'

export const useCompleteOrdersStore = defineStore({
    id: 'complete-orders',
    state: () => ({
      orders: [],
    }),
    getters: {
    },
    actions: {
      /**
       * Add item to the cart
       * @param {string} name
       */
      addItem(name) {
        this.rawItems.push(name)
      },
  
      /**
       * Remove item from the cart
       * @param {string} name
       */
      removeItem(name) {
        const i = this.rawItems.lastIndexOf(name)
        if (i > -1) this.rawItems.splice(i, 1)
      },

      // add new completed order to the list
      addOrder(order) {
        this.orders.push(order)
      }
  
    },
  })