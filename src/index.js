const express = require('express');
const fs = require('fs');
const { geraToken, validaPassword, validaEmail } = require('../middlewares/login');
const { validaToken } = require('../middlewares/validaToken');
const { validaName } = require('../middlewares/validaName');
const { validaAge } = require('../middlewares/validaAge');
const { validaTalk } = require('../middlewares/validaTalker');

const app = express();
app.use(express.json());

// GET
app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
    res.status(200).json(data);
  });

// GET
app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const info = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
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
  const talkers = JSON.parse(fs.readFileSync('src/talker.json'));

  const addTalker = { id: talkers.length + 1, name, age, talk };

  talkers.push(addTalker);
  fs.writeFileSync('src/talker.json', JSON.stringify(talkers));
  res.status(201).json(addTalker);
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
