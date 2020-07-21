import Joi from "@hapi/joi";

const validateCarAds = (inputData) => {
  const schema = Joi.object().keys({
    state: Joi.string().valid("new", "used").required(),
    price: Joi.number().required(),
    manufacturer: Joi.string(),
    model: Joi.string(),
    body_type: Joi.string(),
  });
  return schema.validate(inputData);
};
const validateCarPriceUpdate = (input) => {
  const schema = Joi.object().keys({
    price: Joi.number().required(),
  });
  return schema.validate(input);
};

const validateGettingAvailableCars = (input) => {
  const schema = Joi.object().keys({
    status: Joi.string().required(),
  });

  return schema.validate(input);
};
const validatePriceRange = (input) => {
  const schema = Joi.object().keys({
    status: Joi.string().required(),
    min_price: Joi.number().required(),
    max_price: Joi.number().required(),
  });
  return schema.validate(input);
};

export default {
  validateCarAds,
  validateCarPriceUpdate,
  validateGettingAvailableCars,
  validatePriceRange,
};
