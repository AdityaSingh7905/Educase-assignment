const express = require("express");
const {
  listSchoolsController,
} = require("../controllers/listSchools.controller");

const router = express.Router();

router.get("/", listSchoolsController);

module.exports = {
  listSchoolsRouter: router,
};
