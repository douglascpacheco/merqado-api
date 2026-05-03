const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../resources/swagger.json');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);
app.use('/movimentacoes', movimentacaoRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error handler
app.use((err, req, res, next) => {
  if (err.status) return res.status(err.status).json({ error: err.message });
  res.status(500).json({ error: 'Erro interno.' });
});

module.exports = app;
