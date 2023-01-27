const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

module.exports = router;