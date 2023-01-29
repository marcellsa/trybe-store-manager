const chai = require('chai');
const sinon = require('sinon');
const productsList = require('../mocks/productsList.json');
const productsService = require('../../../src/services/productsService');
const productsController = require('../../../src/controllers/productsController');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

describe('Products Controller', function () {
  describe('REQ-02 - Listar todos os produtos', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar a response com status 200 e todos os produtos', async function () {
      sinon.stub(productsService, 'getProducts').resolves([productsList]);
      
      await productsController.getProducts(req, res);
      expect(res.status).to.has.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly([productsList]);
    });
  });

  

});