// controllers/lessonController.js
const Lesson = require('../models/Lesson');
const cors = require('cors');

// Fetch all lessons from the database
exports.getLessons = async(req, res) => {
    try {
        // Retrieve all lessons
        const lessons = await Lesson.find();

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

        // Find the lesson by ID
        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }

        // Return the lesson in the response
        res.status(200).json(lesson);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching lesson', error: err.message });
    }
};