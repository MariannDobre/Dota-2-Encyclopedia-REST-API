require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('node:fs');
const path = require('node:path');

const dataFilePath = path.join(__dirname, 'data', 'heroes.json');

// Import the data
const data = require('./data/heroes.json');

const app = express();

app.use(cors());
app.use(express.json());

// Testing connection routes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'The API is working!',
  });
});

// Routes
// Get the data about all heroes
app.get('/api/heroes', (req, res) => {
  if (!data) {
    return res.status(404).json({
      message: 'No heroes found.',
    });
  }

  let results = [...data];

  // Filtering
  if (req.query.attack_type) {
    results = results.filter(
      (item) =>
        item.attack_type.toLowerCase() === req.query.attack_type.toLowerCase()
    );
  }

  if (req.query.primary_attr) {
    results = results.filter(
      (item) =>
        item.primary_attr.toLowerCase() === req.query.primary_attr.toLowerCase()
    );
  }

  // Sorting
  if (req.query.sortBy === 'asc') {
    results = results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (req.query.sortBy === 'desc') {
    results = results.sort((a, b) => b.name.localeCompare(a.name));
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = results.slice(startIndex, endIndex);

  res.status(200).json({
    currentPage: page,
    currentLimit: limit,
    totalItems: results.length,
    totalPages: Math.ceil(results.length / limit),
    heroes: paginatedData,
  });
});

// Get the data about one hero
app.get('/api/heroes/:heroName', (req, res) => {
  const { heroName } = req.params;

  if (!heroName) {
    return res.status(400).json({
      message: 'Hero name is required.',
    });
  }

  // Fuzzy search (case-insensitive, substring)
  const hero = data.find((hero) =>
    hero.localized_name.toLowerCase().includes(heroName.toLowerCase())
  );

  if (!hero) {
    return res.status(404).json({ message: 'Hero not found.' });
  }

  res.status(200).json(hero);
});

// Update existing hero
app.put('/api/heroes/:id', (req, res) => {
  const { id } = req.params;
  const heroIndex = data.findIndex((hero) => hero.id === Number(id));

  console.log('Data coming from the frontned on form sub:');
  console.log(req.body);

  data[heroIndex] = { ...data[heroIndex], ...req.body };

  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  res.status(200).json(data[heroIndex]);
});

// Create new hero
app.post('/api/create-hero', (req, res) => {
  console.log(req);

  const newHero = {
    id: data.length + 1,
    name: req.body.name,
    localized_name: req.body.localized_name,
    primary_attr: req.body.primary_attr,
    attack_type: req.body.attack_type,
    roles: req.body.roles,
    base_health: req.body.base_health,
    base_mana: req.body.base_mana,
    base_armor: req.body.base_armor,
    attack_range: req.body.hero_attack_range,
  };

  console.log(newHero);

  // Add the object in the memory
  data.push(newHero);

  // Save the object to the file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  //
  res.status(201).json(newHero);
});

// Delete existing hero
app.delete('/api/heroes/:id', (req, res) => {
  const { id } = req.params;
  const heroIndex = data.findIndex((hero) => hero.id === Number(id));

  if (heroIndex === -1)
    return res.status(404).json({
      message: 'Hero not found',
    });

  // Deleted in the memory
  const [deletedHero] = data.splice(heroIndex, 1);

  // Save updated heroes array to file
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

  // Return deleted hero
  res.status(200).json({
    message: 'Hero deleted successfully',
    deletedHero,
  });
});

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
