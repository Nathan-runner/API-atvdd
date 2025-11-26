const express = require ('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

router.post('/', CategoryController.create);
router.get('/', CategoryController.findAll);
router.get('/:id', CategoryController.findOne);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);

module.exports = router;
