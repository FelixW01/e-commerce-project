const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product
      }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: 'ProductTag',
      }]
    });
    if (!tagData) {
      res.status(404).json({
        message: 'No tags with this id!'
      });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
      id: req.params.id,
      tag_name: req.body.tag_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedTag[0]) {
      res.status(404).json({
        message: "Can't find tag with that id!"
      })
    }
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(404).json({
        message: "Can't find tag with that id!"
      })
    }
    res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;