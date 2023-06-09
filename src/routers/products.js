const { Router } = require('express');

const productsController = require('../controllers/productsController');

const router = Router();

router.get('/search', productsController.searchProduct);

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;