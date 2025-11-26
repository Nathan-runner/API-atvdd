const { Product, Category } = require('../models');

class ProductController {
  // Criar produto
  static async create(req, res) {
    try {
      const { name, description, price, categoryId } = req.body;

      // Validações básicas
      if (!name || !price || !categoryId) {
        return res.status(400).json({ 
          error: 'Nome, preço e categoryId são obrigatórios' 
        });
      }

      // Verificar se a categoria existe
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      const product = await Product.create({
        name,
        description,
        price,
        categoryId
      });

      // Buscar produto com dados da categoria
      const productWithCategory = await Product.findByPk(product.id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      });

      return res.status(201).json(productWithCategory);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar produto', details: error.message });
    }
  }

  // Listar todos os produtos
  static async findAll(req, res) {
    try {
      const products = await Product.findAll({
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }],
        order: [['name', 'ASC']]
      });
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produtos', details: error.message });
    }
  }

  // Buscar produto por ID
  static async findOne(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      });

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      return res.json(product);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar produto', details: error.message });
    }
  }

  // Atualizar produto
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, categoryId } = req.body;

      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      // Se categoryId foi fornecido, verificar se existe
      if (categoryId) {
        const category = await Category.findByPk(categoryId);
        if (!category) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
      }

      await product.update({
        name: name || product.name,
        description: description !== undefined ? description : product.description,
        price: price || product.price,
        categoryId: categoryId || product.categoryId
      });

      // Buscar produto atualizado com categoria
      const updatedProduct = await Product.findByPk(id, {
        include: [{
          model: Category,
          as: 'category',
          attributes: ['id', 'name']
        }]
      });

      return res.json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar produto', details: error.message });
    }
  }

  // Deletar produto
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await product.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto', details: error.message });
    }
  }
}

module.exports = ProductController;