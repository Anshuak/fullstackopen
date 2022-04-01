const express = require("express");
const app = express();
const PORT = 3001;

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

app.get("/api/persons", (req, res) => res.json(persons));

app.get("/info", (req, res) =>
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date().toUTCString()}</p>`)
);

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => {
    return p.id === id;
  });
  if (person) return res.json(person);
  return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number)
    return res.status(400).json({ error: "name or number missing" });

  const isContactPresent = persons.find((p) => p.name === body.name);
  if (isContactPresent)
    return res.status(400).json({ error: "name must be unique" });
  persons = [
    ...persons,
    { id: generateId(), name: body.name, number: body.number },
  ];
  res.json(persons);
});

app.listen(PORT, () =>
  console.log(`Listening to server http://localhost:${PORT}/`)
);
