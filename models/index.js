// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
})
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
})
// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, {
  through: {
    model: product_tag,
    unique: false
  },
  as: 'product_tags'
});
// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, {
  through: {
    model: product_tag,
    unique: false
  },
  as: 'tags_for_products'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};