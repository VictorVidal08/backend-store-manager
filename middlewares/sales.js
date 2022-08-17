const Joi = require('joi');

const salesSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}));

const validation = (req, res, next) => {
  const products = req.body;
  const { error } = salesSchema.validate(products);
  // console.log(isValid);

  if (error) {
    const newMessage = error.details[0].message.split('.');
    if (error.details[0].type === 'any.required') {
      return res.status(400).json({ message: `"${newMessage[1]}` });
    }
    if (error.details[0].type === 'number.min') {
      return res.status(422).json({ message: `"${newMessage[1]}` });
  }

  /* switch (true) {
    case (isValid.error):
      return 
    case isValid.error.details[0].type === 'string.min': {
      return res.status(422).json({ message: isValid.error.message });
    }
    case isValid.error.details[0].type === 'any.required': {
      return res.status(400).json({ message: isValid.error.message });
    }
    default: {
      console.log('validation error');
    } */
  }

  next();
};

module.exports = { validation };