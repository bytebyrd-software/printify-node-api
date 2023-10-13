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
        return this.client.post()
    }
}


module.exports = Order;
