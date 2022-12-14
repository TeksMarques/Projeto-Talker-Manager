const express = require('express');
const fs = require('fs');
const { geraToken, validaPassword, validaEmail } = require('../middlewares/login');
const { validaToken } = require('../middlewares/validaToken');
const { validaName } = require('../middlewares/validaName');
const { validaAge } = require('../middlewares/validaAge');
const { validaTalk } = require('../middlewares/validaTalker');

const talker = 'src/talker.json';

const app = express();
app.use(express.json());

// GET
app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync(talker, 'utf-8'));
    res.status(200).json(data);
  });

// GET
app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const info = JSON.parse(fs.readFileSync(talker, 'utf8'));
    const obj = info.find((e) => e.id === Number(id));
  
    if (obj) return res.status(200).json(obj);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  });

// POST
app.post('/login', validaEmail, validaPassword, geraToken);

// POST
app.post('/talker',
  validaToken, validaName, validaAge, validaTalk,
  (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = JSON.parse(fs.readFileSync(talker));

  const addTalker = { id: talkers.length + 1, name, age, talk };

  talkers.push(addTalker);
  fs.writeFileSync(talker, JSON.stringify(talkers));
  res.status(201).json(addTalker);
  // req 05 concluído com ajuda do Alan Foster
});

// PUT 
app.put('/talker/:id',
  validaToken,
  validaName, validaAge, validaTalk,
  (req, res) => {
  const id = Number(req.params.id);
  const talkers = JSON.parse(fs.readFileSync(talker));

  talkers.filter((e) => e.id !== id);
  const update = { id, ...req.body };

  talkers.push(update);
  fs.writeFileSync(talker, JSON.stringify(talkers));

  console.log(talkers);
  res.status(200).json(update);
});

// DELETE
app.delete('/talker/:id',
  validaToken,
  (req, res) => {
  const id = Number(req.params.id);
  const talkers = JSON.parse(fs.readFileSync(talker));

  const newArr = talkers.filter((e) => e.id !== id);
  fs.writeFileSync(talker, JSON.stringify(newArr));
  res.status(204).json();
});

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
