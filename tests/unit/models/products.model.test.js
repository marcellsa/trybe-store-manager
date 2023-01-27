const chai = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/productsModel');
const { connection } = require('../../../src/models/connection');
const productsList = require('../mocks/productsList.json');
const { expect } = chai;


describe('02 - Products Model', function () {
  describe('Listar todos os produtos', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar todos os produtos', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);
      
      const result = await productsModel.getProducts();
      expect(result).to.be.deep.equal(productsList);
    });
  });

  describe('Listar produto pelo ID', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar o produto solicitado', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[1]]]);
      
      const result = await productsModel.getProductsById(2);
      expect(result).to.be.deep.equal(productsList[1]);
    });
  });

})