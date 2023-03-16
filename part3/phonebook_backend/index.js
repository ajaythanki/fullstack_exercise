/*
============================================================
============================================================
Exercises 3.1.-3.6.
Exercise: 3.1: Phonebook backend step1
Exercise: 3.2: Phonebook backend step2
Exercise: 3.3: Phonebook backend step3
Exercise: 3.4: Phonebook backend step4
Exercise: 3.5: Phonebook backend step5
Exercise: 3.6: Phonebook backend step6

Exercises 3.7.-3.8.
Exercise: 3.7: Phonebook backend step7
Exercise: 3.8: Phonebook backend step8

Exercises 3.9.-3.11.
Exercise: 3.9 phonebook backend step9
Exercise: 3.10 phonebook backend step10
Exercise: 3.11 phonebook full stack

Exercises 3.13.-3.14.
3.13: Phonebook database, step1
3.14: Phonebook database, step2

Exercises 3.15.-3.18.
3.15: Phonebook database, step3
3.16: Phonebook database, step4
3.17*: Phonebook database, step5
3.18*: Phonebook database step6

Exercises 3.19.-3.21.
3.19*: Phonebook database, step7
3.20*: Phonebook database, step8
3.21 Deploying the database backend to production

Exercise 3.22.
3.22: Lint configuration
============================================================
============================================================
*/
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
app.use(express.static("build"));
// eslint-disable-next-line no-unused-vars
morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.json());
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find()
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => console.log(error));
});
app.get("/info/", (req, res) => {
  Person.find()
    .then((persons) => {
      let date = new Date().toString("en-US", {
        timeZoneName: "short",
        // eslint-disable-next-line no-dupe-keys
        timeZoneName: "long",
      });

      res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
    `);
    })
    .catch((error) => console.log(error));
});
app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;
  let isAlreadyExist = false;
  Person.find({ name: body.name })
    .then(() => {
      isAlreadyExist = true;
    })
    .catch((error) => console.log(error));

  console.log(isAlreadyExist);
  if (isAlreadyExist) {
    return res.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((error) => next(error));
});
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((deletedPerson) => {
      console.log(deletedPerson);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError")
    return res.status(400).json({ error: error.message });

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
