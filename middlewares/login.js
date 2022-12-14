const crypto = require('crypto');

const validaEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!regex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};

const validaPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' }); 
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }

  next();
};

const geraToken = (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token });
};

module.exports = {
  validaEmail,
  validaPassword,
  geraToken,
};