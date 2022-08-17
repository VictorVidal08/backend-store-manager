const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

// codigo baseado no gabarito do dia 23.4

describe('Ao chamar o controller de findById', () => {
  describe('quando não existem produtos no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'findById')
        .resolves();
    });

    after(() => {
      productsService.findById.restore();
    });

    it('é chamado o método "status" passando 404', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o método "json" passando a mensagem "Product not found"', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith('Product not found')).to.be.equal(false);
    });

  });

  describe('quando existem produtos cadastrados no banco de dados', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = {
        id: 1,
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'findById')
        .resolves({
          id: 1,
          name: 'Martelo de Thor',
        });
    });

    after(() => {
      productsService.findById.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o método "json" passando um objeto', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});