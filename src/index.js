const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/talker', async (_req, res) => {
  const data = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
    res.status(200).json(data);
  });

app.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const info = JSON.parse(fs.readFileSync('src/talker.json', 'utf8'));
    const obj = info.find((e) => e.id === Number(id));
  
    if (obj) return res.status(200).json(obj);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
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
