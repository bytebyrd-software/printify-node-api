
const Collection = require('./Collection.js');
class Webhook extends Collection {
    constructor(axios, shopId) {
        super(axios, "webhooks", shopId);
    }
}
module.exports = Webhook;