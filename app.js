const cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var userRoutes = require("./routes/userRoutes");
var adminRoutes = require("./routes/adminRoutes");

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

module.exports = app;
