const chai = require('chai');
const sinon = require('sinon');
const salesList = require('../mocks/salesList.json');
const salesService = require('../../../src/services/salesService');
const salesController = require('../../../src/controllers/salesController');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

describe('Sales Controller', function () {
  describe('REQ-09 - Listar todas as vendas', function () {
    const req = {};
    const res = {};

    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar a response com status 200 e todoas as vendas', async function () {
      sinon.stub(salesService, 'getSales').resolves([salesList]);
      
      await salesController.getSales(req, res);
      expect(res.status).to.has.been.calledWith(200);
      expect(res.json).to.have.been.calledWithExactly([salesList]);
    });
  });

});