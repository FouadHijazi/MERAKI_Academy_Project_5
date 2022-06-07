const connection = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users WHERE email=?`;
  const data = [email];
  connection.query(query, data, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (err) res.json(err);
        if (response) {
          const payload = {
            userId: result[0].id,
            role: result[0].role_id,
          };
          const secret = process.env.SECRET;
          const token = jwt.sign(payload, secret);

          res
            .status(200)
            .json({ success: true, message: "welcome", token, result });
        } else {
          res.status(403).json({
            success: false,
            message: `The password you’ve entered is incorrect`,
          });
        }
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "The email doesn't exist" });
    }
  });
};

module.exports = {
  login,
};
