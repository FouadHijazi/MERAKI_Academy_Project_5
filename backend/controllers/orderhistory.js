const connection = require("../models/db");

const order = (req, res) => {
  const user_id = req.token.userId;
  const orderhisory = req.body.orderhisory;
  const query = `INSERT INTO ORDERHISTORY
  ( user_id,ORDERhisory) VALUES (?,?)`;
  const data = [user_id, orderhisory];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        massage: "The email already exists",
        err,
      });
    }
    return res.status(200).json({
      success: true,
      massage: "Account Created Successfully",
      result,
    });
  });
};

module.exports = {
  order,
};
