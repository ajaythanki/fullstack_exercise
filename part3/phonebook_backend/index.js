//============================================================
//============================================================
/*
Exercises 3.1.-3.6.
Exercise: 3.1: Phonebook backend step1
Exercise: 3.2: Phonebook backend step2
Exercise: 3.3: Phonebook backend step3
Exercise: 3.4: Phonebook backend step4
Exercise: 3.5: Phonebook backend step5
Exercise: 3.6: Phonebook backend step6
*/
//============================================================
//============================================================

const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info/", (req, res) => {
  let date = new Date().toString("en-US", {
    timeZoneName: "short",
    timeZoneName: "long",
  });
  res.send(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${date}</p>
  `);
});
app.get("/api/persons/:id", (req, res) => {
  const person = persons.find((p) => p.id === Number(req.params.id));
  if (person) res.json(person);
  else res.status(404).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }
  isAlreadyExist = persons.find((p) => p.name === body.name);
  if (isAlreadyExist) {
    return res.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
