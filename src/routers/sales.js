const { Router } = require('express');

const salesController = require('../controllers/salesController');

const router = Router();

router.get('/', salesController.getSales);

router.get('/:id', salesController.getSalesById);

router.post('/', salesController.createSale);

router.delete('/:id', salesController.deleteSale);

router.put('/:id', salesController.updateSale);

module.exports = router;