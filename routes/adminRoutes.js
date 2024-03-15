const db = require("../model/helper");
var express = require("express");
var router = express.Router();
require("dotenv").config();

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    let result = await db(
      "SELECT * FROM table_volunteers WHERE isAdmin = true"
    );
    res.status(200).send(result.data); // send data to client.
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/* ----- ADMIN LOGIN ------*/

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    //1. Check user - Get user from email
    let response = await db(
      `SELECT * from table_volunteers WHERE email = "${email}"`
    );
    console.log(response);
    let user = response.data[0];

    //2. If email found, compare the password with the hashed version
    if (user && user.isAdmin) {
      let doMatch = await bcrypt.compare(password, user.password);
      console.log("Password check:", doMatch);
      //3.1 If no passwords don't match, send error
      if (!doMatch) res.status(401).send({ error: "Password does not match" });
      //3.2 Else create token using id
      let token = jwt.sign({ userID: user.id }, supersecret);
      res.send({ token });
    }
    //4. If no user found, send error
    else {
      res.status(401).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
