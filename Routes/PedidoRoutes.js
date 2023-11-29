const express = require('express');
const router  = express.Router();
const PedidoController = require('../Controllers/PedidoController')

router.get('/pedido', PedidoController.Get);
router.post('/pedido/:id', PedidoController.Post);

module.exports = router;
