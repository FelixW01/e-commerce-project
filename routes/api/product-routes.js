const router = require('express').Router();
const {
  Product,
  Category,
  Tag,
  ProductTag
} = require('../../models');

// The `/api/products` endpoint
// get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: 'ProductTag',
        },
        {
          model: Category,
          attributes: ['id', 'category_name']
        }
      ]
    })
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: 'ProductTag',
        },
        {
          model: Category,
          attributes: ['id', 'category_name']
        }
      ]
    });
    if (!productData) {
      res.status(404).json({
        message: 'No product with this id!'
      });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err)
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const createProduct = await Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tag_id
    });
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        }
      })
      return ProductTag.bulkCreate(productTagIdArr)
    }
    //if no product tags, respond.
    res.status(200).json(createProduct);
  } catch (err) {
    res.status(500).json(err)
  }
});

// update product
router.put('/:id', (req, res) => {
  // update product data

});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedProduct) {
      res.status(404).json({
        message: "Can't find product with that id!"
      })
    }
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;