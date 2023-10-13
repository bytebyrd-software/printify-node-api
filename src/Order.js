const Collection = require('./Collection.js');

class Order extends Collection {
    constructor(axios, shopId) {
        super(axios, "orders", shopId);
    }

    /**
     * 
     * @param {String} orderId 
     * @returns {Promise<AxiosResponse>} A Promise with the response from Printify
     */
    sendToProduction(orderId) {
        return this.client.post(`shops/${this.shopId}/orders/${orderId}/send_to_production.json`)
    }

    calculateShipping(payload){
        return this.client.post(`shops/${this.shopId}/orders/shipping.json`, payload)
    }

    cancel(orderId){
        return this.client.post(`shops/${this.shopId}/orders/${orderId}/cancel.json`)
    }
}


module.exports = Order;
