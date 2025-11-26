const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.create);
router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
