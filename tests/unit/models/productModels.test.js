const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

// teste baseado no gabarito do dia 23.4

describe('Busca apenas um produto BD por seu ID', () => {
  before(async () => {
    const execute = [[]];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando não existe um produto com o ID informado', () => {
    it('retorna null', async () => {
      const response = await productsModel.findById();
      expect(response).to.be.equal(null);
    });
  });

  describe('quando existe um produto com o ID informado', () => {

    before(() => {
      sinon.stub(productsModel, 'findById')
        .resolves(
          {
            id: 1,
            name: 'Martelo de Thor',
          }
        );
    });

    after(() => {
      productsModel.findById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.findById(1);

      expect(response).to.be.an('object');
    });

    it('o objeto não está vazio', async () => {
      const response = await productsModel.findById(1);

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui as propriedades: "id" e "name"', async () => {
      const item = await productsModel.findById(1);

      expect(item).to.include.all.keys('id', 'name');
    });
  });
});