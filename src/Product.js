const Collection = require('./Collection.js');

class Product extends Collection {
    constructor(axios, shopId) {
        super(axios, "products", shopId);
    }

    publish(id, payload, handle) {
        this.client.post(`/shops/${this.shopId}/${this.endpoint}/${id}/publish.json`, payload)
            .then(res => res.json())
            .then(data => {
                if (res.status === 200) {
                    return this.client(`/shops/${this.shopId}/${this.endpoint}/${id}/publishing_succeeded.json`, {
                        external: {
                            id,
                            handle
                        }
                    });
                } else {
                    return this.client(`/shops/${this.shopId}/${this.endpoint}/${id}/publishing_failed.json`, {
                        reason: `Server responded with status ${res.status}`
                    });
                }
            })
            .catch(err => {
                return this.client(`/shops/${this.shopId}/${this.endpoint}/${id}/publishing_failed.json`, {
                    reason: `${err.message}`
                });
            })
    }
}


module.exports = Product;