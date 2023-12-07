"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema definition for the Product model
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    ratings: [{ rating: { type: Number }, remarks: { type: String }, username: { type: String } }],
    // Add more fields as needed
});
// Create and export the Product model based on the schema
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=product.model.js.map