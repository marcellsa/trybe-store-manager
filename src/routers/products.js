const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.createProduct);

module.exports = router;