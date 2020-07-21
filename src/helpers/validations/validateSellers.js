import Joi from "@hapi/joi";

const validateSellers = (inputData) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().min(6).required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    contact: Joi.string().required(),
  });
  return schema.validate(inputData);
};

const validateSellerLogin = (loginInfo) => {
  const schemma = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schemma.validate(loginInfo);
};

export default {
  validateSellers,
  validateSellerLogin,
};
