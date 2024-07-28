/* eslint-disable no-undef */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const fs = require("fs");
const jobs = require("./MOCK_DATA.json");
require("dotenv").config();
const port = process.env.PORT;

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//GET ALL JOBS
app.get("/api/jobs", (req, res) => {
  return res.json(jobs);
});

//GET USER BY ID
app.get("/api/job/:id", (req, res) => {
  const id = req.params.id;
  return res.json(jobs.find((job) => job.id === id));
});

//POST CREATE A JOB
app.post("/api/job", (req, res) => {
  try {
    const body = req.body;
    const lastId = Number(jobs[jobs.length - 1].id);
    console.log(body);
    jobs.push({ ...body, id: String(lastId + 1) });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(jobs), (err, data) => {
      return res.json({ id: lastId, isCreated: true });
    });
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

//UPDATE A PARTICULAR JOB
app.patch("/api/job/:id", (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;
    const index = jobs.indexOf(jobs.find((job) => job.id === id));
    jobs[index] = { ...body, id };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(jobs), (err, data) => {
      return res.json({ id, isUpdated: true });
    });
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

//DELETE A PARTICULAR JOB
app.delete("/api/job/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleteIndex = jobs.indexOf(jobs.find((job) => job.id === id));
    jobs.splice(deleteIndex, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(jobs), (err, data) => {
      return res.json({ isDeleted: true });
    });
  } catch (e) {
    res.status(404).json({ error: "SOMETHING WENT WRONG" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
