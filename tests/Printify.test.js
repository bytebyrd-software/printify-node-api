const axios = require('axios');
const Printify = require('../src/index');
const products = require('./fixtures/products');

jest.mock('axios');


let printify;
let get = jest.fn();
let post = jest.fn();
beforeAll(() => {
    axios.create.mockImplementation( () => ({
        get,
        post
        // put: jest.fn(),
        // delete: jest.fn(),
    }))
    printify = new Printify('12345');
})

describe("Testing the products collection" , () => {
    test('should fetch a list of products', async () => {
        get.mockResolvedValueOnce(products);
        const result =  await printify.products.getAll()
        expect(get).toHaveBeenCalled();
        expect(result).toEqual(products)
      })

      test('should fetch a single product', async () => {
        get.mockResolvedValueOnce(products.data[0]);
        const result = await printify.products.getById(products.data[0].id);
        expect(result.title).toBe('Mug 11oz')
      })
})
