const express = require('express');
const router = express.Router();
const controller = require('../controllers/produtoController');
const { authenticate } = require('../middleware/auth');

router.post('/', authenticate, controller.create);
router.get('/', authenticate, controller.list);
router.get('/:id', authenticate, controller.get);
router.put('/:id', authenticate, controller.update);

module.exports = router;
