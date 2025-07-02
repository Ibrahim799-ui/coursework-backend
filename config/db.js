// config/db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://iadamu799:JZZ9PKbroO6XO9y7@cluster0.6mq6lib.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

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