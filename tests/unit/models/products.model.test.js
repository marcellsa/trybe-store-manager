const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const { connection } = require('../../../src/models/connection');
const productsList = require('../mocks/productsList.json');
const { expect } = chai;


describe('Products Model', function () {
  describe('REQ-02 - Listar todos os produtos', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);
      
      const result = await productsModel.getProducts();
      expect(result).to.be.deep.equal(productsList);
    });
  });

  describe('REQ-02 - Listar produto pelo ID', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar o produto solicitado', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[1]]]);
      
      const result = await productsModel.getProductsById(2);
      expect(result).to.be.deep.equal(productsList[1]);
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

      sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
      
      const result = await productsModel.createProduct(newProduct);
      expect(result).to.be.deep.equal(4);
    });
  });

});