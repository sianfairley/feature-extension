const db = require("../model/helper");
var express = require("express");
var router = express.Router();
require("dotenv").config();

// var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
// const supersecret = process.env.SUPER_SECRET;

/* GET home page. */
router.get("/", async (req, res) => {
  try {
    let result = await db("SELECT * FROM table_volunteers");
    res.status(200).send(result.data); // send data to client.
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/********* SIGNUP  *********/

router.post("/signup", async (req, res) => {
  // The request's body is available in req.body. done with object destructuring.
  const { first_name, last_name, email, phone_number, password } = req.body;
  try {
    // encrypt password (⇒ `bcrypt.hash()`)
    const encryptedPass = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO table_volunteers (first_name, last_name, email, phone_number, password)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}', '${encryptedPass}')`
    );
    //3. respond with ok
    res.send({ message: "New user registered" });
  } catch (err) {
    res.status(400).send(err);
  }
});

/********* LOGIN  *********/

//Checks database for user with corresponding email
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    //Get user from email
    let response = await db(
      `SELECT * from table_volunteers WHERE email = "${email}"`
    );
    console.log(response);
    let user = response.data[0];

    //If email found, compare the password with the hashed version
    if (user) {
      let doMatch = await bcrypt.compare(password, user.password);
      console.log("Password check:", doMatch);
      if (doMatch) {
        console.log({ message: "Login successful" });
      }
      //Or send error
      else {
        res.status(401).send({ error: "Password does not match" });
      }
    } else {
      res.status(401).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
