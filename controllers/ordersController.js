// controllers/orderController.js
const { getOrdersCollection } = require('../config/db');

// Get all orders
exports.getOrders = async(req, res) => {
    try {
        const ordersCollection = getOrdersCollection();
        const orders = await ordersCollection.find({}).toArray();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
};

// Create a new order
exports.createOrder = async(req, res) => {
    try {
        const ordersCollection = getOrdersCollection();
        const order = req.body;
        const result = await ordersCollection.insertOne(order);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err });
    }
};