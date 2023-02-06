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

  describe('REQ-15 - Criando nova venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar uma venda', async function () {
      const newSale = {
        productId: 1,
        quantity: 999
      };

      const newId = 5;

      sinon.stub(salesModel, 'createSale').resolves({ id: newId, itemsSold: newSale });
      
      const result = await salesService.createSale([newSale]);
      expect(result).to.be.deep.equal({ id: newId, itemsSold: newSale });
    });

    it('Deverá retornar uma mensagem de error', async function () {
      const newSale = {
        quantity: 999
      };

      const newId = 5;

      // sinon.stub(salesModel, 'createSale').resolves({ id: newId, itemsSold: newSale });
      
      try {
        await salesService.createSale([newSale]);
        expect(true).to.be.false()
      } catch (error) {
        console.log(error);
        expect(error.message).to.be.deep.equal("\"productId\" is required" );        
      }
    });

    // it('REPENSAR Deverá retornar producId is reuired', async function () {
    //   const newSale = {
    //     quantity: 999
    //   };

    //   const newId = 5;

    //   sinon.stub(salesService, 'createSale').resolves({ "message": "\"productId\" is required" });
      
    //   const result = await salesModel.createSale(newSale);
    //   expect(result).to.be.deep.equal({ "message": "\"productId\" is required" });
    // });   

  });

  describe('REQ-15 - Deletar um venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Deverá retornar TRUE para um venda existente', async function () {
      const removeId = 5;

      sinon.stub(salesModel, 'getSalesById').resolves(true);
      
      const result = await salesService.deleteSale(removeId);
      expect(result).to.be.true;
    });

    it('Deverá retornar FALSE para um venda inexistente', async function () {
      const removeId = 5;

      sinon.stub(salesModel, 'getSalesById').resolves(false);
      
      const result = await salesModel.getSalesById(removeId);
      expect(result).to.be.false;
    });
  });

});