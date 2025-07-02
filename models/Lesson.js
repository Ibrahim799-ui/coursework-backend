const mongoose = require('mongoose');

// Define the lesson schema
const lessonSchema = new mongoose.Schema({
    sn: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    spaces: {
        type: Number,
        required: true
    }
}, {
    collection: 'collection' // Specify the collection name explicitly
});

// Create the Lesson model
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;