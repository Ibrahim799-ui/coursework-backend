// controllers/lessonsController.js
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

// Fetch all lessons from the database
exports.getLessons = async (req, res) => {
    try {
        const lessons = await getDb().collection('lessons').find({}).toArray();

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

// Fetch a specific lesson by ID
exports.getLessonById = async(req, res) => {
    try {
        const lessonId = req.params.id;

        const lesson = await getDb()
            .collection('lessons')
            .findOne({ _id: new ObjectId(lessonId) });

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Return the lesson in the response
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching lesson', error: err.message });
    }
};