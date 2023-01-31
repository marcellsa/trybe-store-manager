const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const salesList = require('../mocks/salesList.json');
const salesService = require('../../../src/services/salesService');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const { expect } = chai;

describe('Sales Service', function () {
  describe('REQ-09 - Listar todas as vendas', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar todas as vendas', async function () {
      sinon.stub(salesModel, 'getSales').resolves([salesList]);
      
      const result = await salesService.getSales();
      expect(result).to.be.deep.equal([salesList]);
    });
  });

  describe('REQ-09 - Listar as vendas pelo ID', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar FALSE se a venda existir', async function () {
      const saleId = 2;

      sinon.stub(salesModel, 'getSalesById').resolves([]);
      
      const result = await salesService.getSalesById(saleId);
      expect(result.message).to.be.deep.equal({ message: 'Sale not found' });
    });

    it('Deverá retornar TRUE se a venda existir', async function () {
      const saleId = 2;

      sinon.stub(salesModel, 'getSalesById').resolves(salesList[2]);
      
      const result = await salesService.getSalesById(saleId);
      expect(result.message).to.be.deep.equal(salesList[2]);
    });
  });

});