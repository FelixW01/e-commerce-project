const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  //references product.id as foreign key
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'product',
      key: 'id',
    }
  },
  //references tag.id as foreign key
  tag_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'tag',
      key: 'id',
    }
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;