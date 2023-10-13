const Product = require('./Product.js');
const Order = require('./Order.js');
const Webhook = require('./Webhook.js');
const { EventEmitter } = require('events');
const { raw } = require('express');
const axios = require('axios');

/**
 * @class Printify
 * @property {Product} registerWebhookEndpoint 
 */
class Printify extends EventEmitter {
    /**
     * 
     * @param {string} shopId Your printify shop id 
     * @param {} options 
     */
    constructor(shopId, options = { version: "v1" }) {
        super();
        if (!options.version) {
            options.version = "v1";
        }

        this.client = axios.create({
            baseURL: `https://api.printify.com/${options.version}`,
            headers: { "Authorization": `Bearer ${options.authKey}` }
        })
        this.products = new Product(this.client, shopId);
        this.orders = new Order(this.client, shopId);
        this.webhooks = new Webhook(this.client, shopId);

        const _eventReceived = (event) => {
            console.debug(`Emit event ${event.type}`)
            this.emit(event.type, event)
        }
        const webhookHandler = (req, res, next) => {
            const payload = req.body;
            //Verify payload
            

            //Verification via endpoint Secret
            
            const event = JSON.parse(payload.toString('utf-8'));
            console.log(event)
            _eventReceived(event)

            res.status(200).end();
           
        }
        /** Creates an endpoint for the printify webhooks and listens for incoming events
         * when an event is fired by prinitify an event with the name of event.type will be emitted
         
         * @type {Function}
         * @param {*} app 
         * @param {String} webhookURL 
         * @param {string} endpointSecret 
         * @returns {void}
         */
        this.registerWebhookEndpoint = function (app, webhookURL, endpointSecret) {
            //getServer
            app.use(webhookURL, raw({ type: 'application/json' }))
            app.post(webhookURL, webhookHandler);
        }
    }
}

module.exports = Printify;