const { MongoClient } = require('mongodb');

let db;

const connectDB = async () => {
    try {
        const client = new MongoClient(process.env.MONGO_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true // TEMP: bypass certificate validation issues
        });
        await client.connect();
        db = client.db(); // db name comes from URI (coursework)
        connectDB.client = client;
        console.log('MongoDB Connected (native driver)');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

const getDb = () => {
    if (!db) {
        throw new Error('Database not initialised. Call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDb };