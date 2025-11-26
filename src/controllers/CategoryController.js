const { Category, Product } = require('../models');

class CategoryController {
  // Criar categoria
  static async create(req, res) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Nome da categoria é obrigatório' });
      }

      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar categoria', details: error.message });
    }
  }

  // Listar todas as categorias
  static async findAll(req, res) {
    try {
      const categories = await Category.findAll({
        include: [{
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'price']
        }],
        order: [['name', 'ASC']]
      });
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar categorias', details: error.message });
    }
  }

  // Buscar categoria por ID
  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id, {
        include: [{
          model: Product,
          as: 'products',
          attributes: ['id', 'name', 'description', 'price']
        }]
      });

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar categoria', details: error.message });
    }
  }

  // Atualizar categoria
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      await category.update({ name });
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar categoria', details: error.message });
    }
  }

  // Deletar categoria
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      // Verificar se existem produtos associados
      const productsCount = await Product.count({ where: { categoryId: id } });
      if (productsCount > 0) {
        return res.status(400).json({ 
          error: 'Não é possível excluir categoria com produtos associados' 
        });
      }

      await category.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar categoria', details: error.message });
    }
  }
}

module.exports = CategoryController;
