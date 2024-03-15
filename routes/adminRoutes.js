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
