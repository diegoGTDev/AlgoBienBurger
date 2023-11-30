const express = require('express')
const router = express.Router();
const ReporteController = require('../Controllers/ReporteController')
router.get('/reporte', ReporteController.Get)
roouter.post('/reporte', ReporteController.Post)
module.exports = router;