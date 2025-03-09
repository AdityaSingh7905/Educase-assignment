const express = require("express");
const { addSchoolController } = require("../controllers/addSchool.controller");

const router = express.Router();

router.post("/", addSchoolController);

module.exports = {
  addSchoolRouter: router,
};
