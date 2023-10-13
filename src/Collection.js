class Collection {
    constructor(axios, endpoint, shopId) {
        this.client = axios;
        this.endpoint = endpoint;
        this.shopId = shopId;
    } 
    /**
     * Creates a new enitity of the given collection by sending a POST Request to the Printity API
     * @param {*} payload 
     * @returns {Promise<AxiosResponse>}
     */
    create(payload) {
        return this.client.post(`shops/${this.shopId}/${this.endpoint}.json`, payload);
    }
    /**
     * @description Returns all entities of the given collection
     * @returns {Promise<AxiosResponse>}
     */
    getAll() {
        return this.client.get(`shops/${this.shopId}/${this.endpoint}.json`);
    }
    /**
     * 
     * @param {String} id the id of the entity to fetch 
     * @returns {Promise<AxiosResponse>}
     */
    getById(id) {
        return this.client.get(`shops/${this.shopId}/${this.endpoint}/${id}.json`);
    }
    update(id, payload) {
        return this.client.put(`shops/${this.shopId}/${this.endpoint}/${id}.json`, payload);
    }
    /**
     * Deletes an entity of the given collection
     * @param {String} id 
     * @returns {Promise<AxiosResponse<T, any>>}
     */
    delete(id) {
        return this.client.delete(`shops/${this.shopId}/${this.endpoint}/${id}.json`);
    }
}


module.exports = Collection;


