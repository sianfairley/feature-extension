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
// router.get("/", async (req, res) => {
//   try {
//     let result = await db("SELECT * FROM table_volunteers");
//     res.status(200).send(result.data); // send data to client.
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

/********* NEW USER SIGNUP  *********/

router.post("/signup", async (req, res) => {
  // The request's body is available in req.body. done with object destructuring.
  const { first_name, last_name, email, phone_number, password } = req.body;
  try {
    // encrypt password (⇒ `bcrypt.hash()`)
    const encryptedPass = await bcrypt.hash(password, saltRounds);

    await db(
      `INSERT INTO table_volunteers (first_name, last_name, email, phone_number, password, isAdmin)
    VALUES ('${first_name}', '${last_name}', '${email}', '${phone_number}', '${encryptedPass}', false)`
    );
    //3. respond with ok
    res.send({ message: "New user registered" });
  } catch (err) {
    res.status(400).send(err);
  }
});

/********* USER LOGIN  *********/

//Checks database for user with corresponding email
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
    if (user) {
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

/*--- GET USER DATA ---*/
router.get("/userdata", async (req, res) => {
  let authHeader = req.headers["authorization"];
  let [str, token] = authHeader.split(" ");

  try {
    let payload = jwt.verify(token, supersecret);
    let result = await db(
      `SELECT * FROM table_volunteers WHERE id = ${payload.userID}`
    );
    res.send(result.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

/* --- GET ALL ACTIVE EVENTS ---*/
router.get("/activeevents", async (req, res) => {
  try {
    let result = await db("SELECT * FROM events WHERE is_active = 1");
    res.status(200).send(result.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

/* --- GET EVENTS USER SIGNUP UP FOR -- */
router.get("/usersevents/:userID", async (req, res) => {
  let { userID } = req.params;
  try {
    let results = await db(
      `SELECT events.* FROM events INNER JOIN event_volunteers ON events.id = event_volunteers.eventID WHERE event_volunteers.volunteerID = ${userID}`
    );
    res.send(results);
    console.log(results);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/* --- SIGNUP FOR EVENT --- */
router.post("/eventsignup", async (req, res) => {
  let { eventID, userID } = req.body;
  try {
    await db(`INSERT INTO event_volunteers (volunteerID, eventID)
    VALUES ('${userID}','${eventID}')`);

    //Update value of volunteers_registered in events table

    await db(
      `UPDATE events SET volunteers_registered = volunteers_registered + 1 WHERE id = ${eventID}`
    );
    //respond with ok
    res.send({ message: "Success: Volunteer signed up for event" });
  } catch (error) {
    res.status(500).send({ error: "Could not signup for event" });
  }
});
module.exports = router;
