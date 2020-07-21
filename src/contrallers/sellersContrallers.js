import _ from "lodash";
import bcrypt from "bcrypt";

import SellerModel from "../database/models/sellersModel";
import validate from "../helpers/validations/validateSellers";
import generatePassHash from "../helpers/middleWare/passwordHash";
import generateToken from "../helpers/middleWare/generateToken";

const SellersContrals = {
  async registerSeller(req, res) {
    const seller = _.pick(req.body, [
      "email",
      "first_name",
      "last_name",
      "password",
      "address",
      "contact",
    ]);
    const { error } = await validate.validateSellers(seller);
    if (error)
      return res
        .status(400)
        .send({ status: 400, error: error.details[0].message });

    seller.password = await generatePassHash(seller.password, seller.email);

    const sellerRegistered = await SellerModel.getSpecificSeller(seller.email);
    if (sellerRegistered.length)
      return res
        .status(400)
        .send({ status: 400, message: "Seller already exists" });

    const register = await SellerModel.registerSellers(seller);
    const { seller_id, email, is_admin } = register;
    const token = generateToken(seller_id, email, is_admin);
    return res.status(201).send({
      status: 201,
      token,
      data: _.pick(register, [
        "email",
        "first_name",
        "last_name",
        "contact",
        "addresss",
      ]),
      message: `Hello ${seller.first_name} your account is registered successfully`,
    });
  },
  async signInSeller(req, res) {
    const loginInfo = _.pick(req.body, ["email", "password"]);

    const { error } = await validate.validateSellerLogin(loginInfo);
    if (error)
      return res
        .status(400)
        .send({ status: 400, error: error.details[0].message });

    const findSeller = await SellerModel.getSpecificSeller(loginInfo.email);
    if (!findSeller)
      return res.status(400).send({ status: 400, message: "wrong Email" });
    const { seller_id, email, is_admin, password } = findSeller[0];

    const checkPassword = await bcrypt.compare(loginInfo.password, password);
    if (!checkPassword)
      return res
        .status(400)
        .send({ status: 400, message: "wrong email or password" });

    const token = await generateToken(seller_id, email, is_admin);

    return res
      .status(200)
      .send({ status: 200, token, data: _.omit(findSeller[0], ["password"]) });
  },
};

export default SellersContrals;
