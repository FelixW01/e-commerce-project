const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
/*
GET http://localhost:3001/api/categories/
GET http: //localhost:3001/api/categories/:id
POST http: //localhost:3001/api/categories/ => {category_name}
DELETE http: //localhost:3001/api/categories/:id
*/
router.use('/products', productRoutes);
/*
GET http://localhost:3001/api/products/
GET http: //localhost:3001/api/products/:id
POST http: //localhost:3001/api/products/ => {product_name, price, stock, category_id}
DELETE http: //localhost:3001/api/products/:id
*/
router.use('/tags', tagRoutes);
/*
GET http://localhost:3001/api/tags/
GET http: //localhost:3001/api/tags/:id
POST http: //localhost:3001/api/tags/ => {tag_name}
DELETE http: //localhost:3001/api/tags/:id
*/

module.exports = router;