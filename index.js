const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { addSchoolRouter } = require("./routes/addSchool.router");
const { listSchoolsRouter } = require("./routes/listSchools.router");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/addSchool", addSchoolRouter);
app.use("/listSchools", listSchoolsRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running at the Port ${PORT}`);
});
