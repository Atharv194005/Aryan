const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide course name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide course description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide course price']
    },
    imageUrl: {
        type: String,
        required: [true, 'Please provide course image']
    },
    category: {
        type: String,
        required: [true, 'Please provide course category'],
        enum: ['Web Development', 'Data Science', 'Algorithms', 'Cybersecurity']
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Course must have an instructor']
    },
    duration: {
        type: Number,
        required: [true, 'Please provide course duration in weeks']
    },
    level: {
        type: String,
        required: [true, 'Please provide course level'],
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Course', courseSchema);
