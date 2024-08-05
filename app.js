/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const app = express();
const cors = require("cors");
const Job = require("./models/Job");
require("dotenv").config();
const port = process.env.PORT;

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => res.send("Welcome to JOB APIs !!!"));

//GET ALL JOBS
app.get("/api/jobs", (req, res) => {
  Job.findAll({})
    .then((data) => {
      if (!data) {
        console.log(data);
        return;
      }
      return res.json(data);
    })
    .catch((e) => console.log(e));
});

//GET USER BY ID
app.get("/api/job/:id", (req, res) => {
  const id = req.params.id;
  Job.findAll({
    where: {
      id,
    },
  })
    .then((data) => {
      if (!data) {
        console.log(data);
        return;
      }
      return res.json(data);
    })
    .catch((e) => console.log(e));
});

//POST CREATE A JOB
app.post("/api/job", (req, res) => {
  try {
    const body = req.body;
    Job.create({ ...body });
    return res.json({ isCreated: true });
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

//UPDATE A PARTICULAR JOB
app.patch("/api/job/:id", (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    Job.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    )
      .then((data) => {
        if (!data) {
          console.log(data);
          return;
        }
        return res.json({ id, isUpdated: true });
      })
      .catch((e) => console.log(e));
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

//DELETE A PARTICULAR JOB
app.delete("/api/job/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    Job.destroy({
      where: {
        id,
      },
    })
      .then((data) => {
        if (!data) {
          console.log(data);
          return;
        }
        return res.json({ isDeleted: true });
      })
      .catch((e) => console.log(e));
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

sequelize
  .sync()
  .then((res) => {
    console.log(`MYSQL Server up and running`);
  })
  .catch((err) => console.log(err));
app.listen(port, () => console.log(`Server listening on port ${port}`));
