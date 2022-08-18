const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const resultado = await salesService.getAll();
  return res.status(200).json(resultado);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sales = await salesService.findById(id);

  if (!sales) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sales);
};

const create = async (req, res) => {
  try {
    const products = req.body;
    // console.log('products', products);
    const insert = await salesService.create(products);
    // console.log('insert sales', insert);
    if (insert.message) {
      return res.status(404).json({ message: insert.message });
    }
    return res.status(201).json(insert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Houve um problema (ver arquivo salesController)' });
  }
};

const deleteId = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteId(id);
  // console.log('controller', result);
  if (!result) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).json('teste');
};

module.exports = {
  getAll,
  findById,
  create,
  deleteId,
};