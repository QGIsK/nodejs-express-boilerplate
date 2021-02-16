"use strict";

require("dotenv").config();
require("module-alias/register");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");

const handleErrors = require("@middleware/handleErrors");

require("@db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

app.use("/", require("./router/"));

app.use(handleErrors);

module.exports = app;
