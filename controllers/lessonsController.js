// controllers/lessonController.js
const { getLessonsCollection } = require('../config/db');
const cors = require('cors');

// Fetch all lessons from the database
exports.getLessons = async(req, res) => {
    try {
        const lessonsCollection = getLessonsCollection();
        // Retrieve all lessons
        const lessons = await lessonsCollection.find({}).toArray();

        if (!lessons.length) {
            return res.status(404).json({ message: 'No lessons found' });
        }
        // Return the lessons in the response
        res.status(200).json(lessons);
    } catch (err) {
        // Handle any errors that occur
        res.status(500).json({ message: 'Error fetching lessons', error: err.message });
    }
};