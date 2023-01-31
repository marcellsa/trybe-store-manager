const chai = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/salesModel');
const { connection } = require('../../../src/models/connection');
const salesList = require('../mocks/salesList.json');
const { expect } = chai;


describe('Sales Model', function () {
  describe('REQ-09 - Listar todas as vendas', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesList]);
      
      const result = await salesModel.getSales();
      expect(result).to.be.deep.equal(salesList);
    });
  });

  describe('REQ-09 - Listar venda por ID', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar a venda solicitada', async function () {
      sinon.stub(connection, 'execute').resolves([[salesList[2]]]);
      
      const result = await salesModel.getSalesById(2);
      expect(result).to.be.deep.equal([salesList[2]]);
    });
  });

});