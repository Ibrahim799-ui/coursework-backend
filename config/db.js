// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const connectDB = async() => {
    try {
        await client.connect();
        console.log('✅ MongoDB Connected');
        await client.db('admin').command({ ping: 1 });
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        process.exit(1);
    }
};

// 👇 export properly
module.exports = {
    connectDB,
    client,
    getLessonsCollection: () => client.db('coursework').collection('lessons'),
    getOrdersCollection: () => client.db('coursework').collection('orders')
};