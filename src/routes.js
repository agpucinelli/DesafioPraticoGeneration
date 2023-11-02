const express = require('express');
const router = express.Router();

const CarroController = require('./controllers/alunoController');

router.get('/alunos', CarroController.buscarTodos);
router.get('/alunos/:id', CarroController.buscarUm);
router.post('/alunos', CarroController.inserir);
router.put('/alunos/:id', CarroController.alterar);
router.delete('/alunos/:id', CarroController.excluir);

module.exports = router;

