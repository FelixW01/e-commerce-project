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
          model: Category,
          attributes: ['id', 'category_name']
        },
        {
          model: Tag,
          attributes: ['id', 'tag_name'],
          through: 'ProductTag',
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
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create({
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
      category_id: req.body.category_id,
      tagIds: req.body.tag_id
    })
    .then((product) => {
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
      res.status(200).json(createdProduct);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      res.status(500).json(err)
    });
});

// update product
router.put('/:id', (req, res) => {
  /*example
  http: //localhost:3001/api/products/5
  "product_name": "socks",
	"price": 150.00,
	"stock": 3,
	"category_id": 3,
	"tagIds": [1, 2, 3, 4]
  */
  // update product data
  Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    .then((product) => {
      return ProductTag.findAll({
        where: {
          product_id: req.params.id
        },
      });
    })
    .then((productTags) => {
      //list of current tagIds
      const productTagIds = productTags.map(({
        tag_id
      }) => tag_id);
      //filtered list of new tagIds
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // product tags to be removed
      const productTagsToRemove = productTags
        .filter(({
          tag_id
        }) => !req.body.tagIds.includes(tag_id))
        .map(({
          id
        }) => id);
      // destroy the productTagsToRemove, bulkCreate the new product tags
      return Promise.all([
        ProductTag.destroy({
          where: {
            id: productTagsToRemove
          }
        }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(500).json(err)
    });
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