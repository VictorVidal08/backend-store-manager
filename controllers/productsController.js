const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const resultado = await productsService.getAll();
  return res.status(200).json(resultado);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const sale = await productsService.findById(id);
  if (!sale) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).json(sale);
};

const deleteId = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.deleteId(id);
  // console.log('controller', result);
  if (!result) return res.status(404).json({ message: 'Product not found' });
  return res.status(204).json('teste');
};

const create = async (req, res) => {
  try {
    const { name } = req.body;
    const insert = await productsService.create(name);
    // console.log('insert', insert);
    return res.status(201).json(insert);
  } catch (error) {
    res.status(500).json({ message: 'Houve um problema (ver arquivo productsController)' });
  }
};

module.exports = {
  getAll,
  findById,
  create,
  deleteId,
};
