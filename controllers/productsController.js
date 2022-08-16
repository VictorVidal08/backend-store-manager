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
};
