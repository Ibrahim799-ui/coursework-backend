const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await getDb()
            .collection('orders')
            .aggregate([
                {
                    $lookup: {
                        from: 'lessons',
                        localField: 'lessonId',
                        foreignField: '_id',
                        as: 'lesson'
                    }
                },
                { $unwind: '$lesson' }
            ])
            .toArray();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { lessonId, customerName, email, phone } = req.body;
        const orderDoc = {
            lessonId: new ObjectId(lessonId),
            customerName,
            email,
            phone,
            date: new Date()
        };
        const result = await getDb().collection('orders').insertOne(orderDoc);
        res.status(201).json({ _id: result.insertedId, ...orderDoc });
    } catch (err) {
        res.status(500).json({ message: 'Error creating order', error: err });
    }
};