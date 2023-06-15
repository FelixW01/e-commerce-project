const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  //references product.id as foreign key
  product_id: {
    type: DataTypes.INTEGER,
  },
  //references tag.id as foreign key
  tag_id: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'product_tag',
});

module.exports = ProductTag;