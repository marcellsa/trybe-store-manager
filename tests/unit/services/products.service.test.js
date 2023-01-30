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

    it('Deverá retornar FALSE se o produto existir', async function () {
      const productId = 2;

      sinon.stub(productsModel, 'getProductsById').resolves(undefined);
      
      const result = await productsService.getProductsById(productId);
      expect(result.message).to.be.deep.equal({ message: 'Product not found' });
    });

    it('Deverá retornar TRUE se o produto existir', async function () {
      const productId = 2;

      sinon.stub(productsModel, 'getProducts').resolves(productsList[1]);
      
      const result = await productsService.getProductsById(productId);
      expect(result.message).to.be.deep.equal(productsList[1]);
    });
  });

  // describe('REQ-03 - Criar novo produto', function () {
  //   afterEach(() => {
  //     sinon.restore();
  //   });

  //   it('Deverá retornar o novo ID de produto', async function () {
  //     const newProduct = {
  //       name: 'Product X',
  //     }

  //     sinon.stub(connection, 'execute').resolves([{ insertId: 4}]);
      
  //     const result = await productsModel.createProduct(newProduct);
  //     expect(result).to.be.deep.equal(4);
  //   });
  // });

});