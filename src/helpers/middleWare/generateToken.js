import jwt from "jsonwebtoken";
// import config from "config";

const generateToken = (userid, email, is_admin) => {
  const token = jwt.sign(
    {
      userid,
      email,
      is_admin,
    },
    "secretTempKey"
  );
  return token;
};

export default generateToken;
