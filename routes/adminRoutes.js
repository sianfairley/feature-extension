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
    let result = await db("SELECT * FROM table_volunteers");
    res.status(200).send(result.data); // send data to client.
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

function allUsers(req, res) {
  db("SELECT * FROM table_volunteers ORDER BY id DESC;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}

function getAllEvents(req, res) {
  db("SELECT * FROM events ORDER BY id DESC")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
}

/* --- GET ALL EVENTS --- */
router.get("/allevents", getAllEvents);

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

/* ------ TOGGLE USER ROLE ------*/
router.put("/setRole/:id", async (req, res) => {
  let userId = req.params.id;

  try {
    await db(
      `UPDATE table_volunteers SET isAdmin = NOT isAdmin WHERE id="${userId}";`
    );
    allUsers(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* --- ADD EVENT --- */
router.post("/addevent", async (req, res) => {
  let { date, shift, volunteers_registered, is_active, admin_comment } =
    req.body;
  try {
    let results = await db(
      `INSERT INTO events (date, shift, volunteers_registered, is_active, admin_comment) VALUES ('${date}', '${shift}', '${volunteers_registered}', '${is_active}', '${admin_comment}')`
    );
    res.send({ message: "New event added" });

    console.log(results);
  } catch (err) {
    res.status(400).send(err);
  }
});

/* --- TOGGLE COMPLETE EVENT ---*/

router.put("/setcomplete/:id", async (req, res) => {
  let eventId = req.params.id;

  try {
    await db(
      `UPDATE events SET is_active = NOT is_active WHERE id="${eventId}";`
    );
    getAllEvents(req, res);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* --- GET USERS REGEISTERED FOR EVENTS --- */
router.get("/eventvolunteers/:eventID", async (req, res) => {
  let { eventID } = req.params;
  try {
    let results = await db(
      `SELECT table_volunteers.*, events.* FROM table_volunteers INNER JOIN event_volunteers ON table_volunteers.id = event_volunteers.volunteerID INNER JOIN events ON event_volunteers.eventID = events.id WHERE event_volunteers.eventID = "${eventID}"`
    );
    res.send(results);
    console.log(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
