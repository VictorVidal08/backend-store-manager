const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
    'any.required': '"name" is required',
  }),
});

const validation = (req, res, next) => {
  const { name } = req.body;
  const isValid = productsSchema.validate({ name });
  console.log('validation', isValid);

  switch (true) {
    case (!isValid.error):
      break;      
    case isValid.error.details[0].type === 'string.min': {
      return res.status(422).json({ message: isValid.error.message });
    }
    case isValid.error.details[0].type === 'any.required': {
      return res.status(400).json({ message: isValid.error.message });
    }
    default: {
      console.log('validation error');
    }
  }

  next();
};

module.exports = { validation };
