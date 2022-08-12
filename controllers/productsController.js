const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const resultado = await productsService.getAll();
  return res.status(200).json(resultado);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await productsService.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

module.exports = {
  getAll,
  findById,
};
