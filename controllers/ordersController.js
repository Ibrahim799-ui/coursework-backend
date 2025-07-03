const Order = require('../models/Order');

// Get all orders
exports.getOrders = async(req, res) => {
    try {
        const orders = await Order.find().populate('lessonId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
};

// Create a new order
exports.createOrder = async(req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err });
    }
};