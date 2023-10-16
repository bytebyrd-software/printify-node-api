const { EventEmitter } = require('events');
const { createHmac } = require('crypto')
const { raw } = require('express');
const axios = require('axios');
const Product = require('./Product.js');
const Order = require('./Order.js');
const Webhook = require('./Webhook.js');
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
        let index = Printify.prototype.controlledInstances.findIndex(instance => instance.shopId === shopId);
        if (index === -1) {
            super();
            if (!options.version) {
                options.version = "v1";
            }
            this.instanceNonce = Math.random();
            this.shopId = shopId;
            this.client = axios.create({
                baseURL: `https://api.printify.com/${options.version}`,
                headers: { "Authorization": `Bearer ${options.authKey}` }
            })
            this.products = new Product(this.client, shopId);
            this.orders   = new Order(this.client, shopId);
            this.webhooks = new Webhook(this.client, shopId);

            const _eventReceived = (event) => {
                if (options.mode === 'debug') {
                    console.debug(`Emit event ${event.type}`)
                }
                this.emit(event.type, event)
            }

            const webhookHandler = (secret) => (req, res, next) => {
                const sig = req.headers['x-pfy-signature'];
                const payload = req.body;

                //Verify payload
                const hmac = createHmac('sha256', secret, { encoding: 'utf-8' });
                hmac.update(payload, 'utf-8');

                let hash = 'sha256=' + hmac.digest('hex');
                if (hash !== sig) {
                    return res.status(401).end();
                }
                //if payload is verified, emit the event
                const event = JSON.parse(payload.toString('utf-8'));
                // console.log(event)
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
                app.post(webhookURL, webhookHandler(endpointSecret));
            }
        } else {
            return Printify.prototype.controlledInstances[index];
        }

    }
    // This tool support Multiton Pattern, one Singleton for each different shop to ensure the events are
    // correctly received
    /**
     * 
     * @param {*} shopId 
     * @param {*} options 
     * @returns {Printify} a Printify instance for the given shop Id
     */
    static getInstance(shopId, options) {
        debugger;
        let index = Printify.prototype.controlledInstances.findIndex(instance => instance.shopId === shopId);
        if (index === -1) {
            let instance = new Printify(shopId, options)
            Printify.prototype.controlledInstances.push(instance);
            return instance;
        } else {
            return Printify.prototype.controlledInstances[index];
        }
    }
}
Printify.prototype.controlledInstances = [];
module.exports = Printify;