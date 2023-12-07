"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const authMiddleware_1 = require("./middlewares/authMiddleware/authMiddleware");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const errorHandler_1 = require("./utils/errorHandler");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Express application
const app = (0, express_1.default)(); // Use Express type directly
//Connect to the database
(0, database_1.default)();
// Middleware for JSON parsing
app.use(express_1.default.json());
app.use("/api/products", authMiddleware_1.authMiddleware);
app.use("/api/orders", authMiddleware_1.authMiddleware);
// // Set up Swagger
// const res = swaggerSetup(app);
// // Define routes
app.use('/api/products', productRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
// Error handling middleware
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(err, req, res, next);
});
// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app; // Export the Express app
//# sourceMappingURL=app.js.map