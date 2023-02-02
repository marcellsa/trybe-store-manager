const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const productsList = require('../mocks/productsList.json');
const productsService = require('../../../src/services/productsService');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

describe('Products Service', function () {
  describe('REQ-02 - Listar todos os produtos', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar todos os produtos', async function () {
      sinon.stub(productsModel, 'getProducts').resolves([productsList]);
      
      const result = await productsService.getProducts();
      expect(result).to.be.deep.equal([productsList]);
    });
  });

  describe('REQ-02 - Listar produto pelo ID', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar NOT FOUND se o produto existir', async function () {
      const productId = 2;

      sinon.stub(productsModel, 'getProductsById').resolves(undefined);
      
      const result = await productsService.getProductsById(productId);
      expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    });

    it('Deverá retornar o produto se existir', async function () {
      const productId = 2;

      sinon.stub(productsModel, 'getProductsById').resolves(productsList[1]);
      
      const result = await productsService.getProductsById(productId);
      expect(result.message).to.be.deep.equal(productsList[1]);
    });
  });

  describe('REQ-03 - Criar novo produto', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar o novo ID de produto', async function () {
      const newProduct = {
        name: 'Product X',
      }

      const newId = 4;

      sinon.stub(productsModel, 'createProduct').resolves(newId);
      
      const result = await productsService.createProduct(newProduct);
      expect(result).to.be.deep.equal({ id: newId, ...newProduct});
    });

    // it('Deverá retornar name is required', async function () {
    //   const newProduct = {};
      
    //   sinon.stub(productsModel, 'createProduct').resolves({ status: 404, message: 'Product not found' });
      
    //   const result = await productsService.createProduct(newProduct);
    //   expect(result.message).to.be.deep.equal({ "message": "\"name\" is required" });
      

      
    // });

  });

});