const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true,
        maxlength: [100, 'Course title cannot exceed 100 characters']
    },
    slug: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description']
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: [true, 'Please provide a course category'],
        enum: ['Web Development', 'Data Science', 'Cybersecurity', 'Mobile Development']
    },
    level: {
        type: String,
        required: [true, 'Please specify course level'],
        enum: ['Beginner', 'Intermediate', 'Advanced']
    },
    price: {
        type: Number,
        required: [true, 'Please provide course price']
    },
    thumbnail: {
        type: String,
        default: 'default-course.jpg'
    },
    duration: {
        type: Number,
        required: [true, 'Please specify course duration in weeks']
    },
    modules: [{
        title: String,
        description: String,
        content: String,
        duration: Number,
        resources: [{
            title: String,
            type: String,
            url: String
        }]
    }],
    enrolledStudents: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    ratings: [{
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        review: String,
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating cannot exceed 5']
    },
    totalStudents: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Calculate average rating before saving
courseSchema.pre('save', function(next) {
    if (this.ratings.length > 0) {
        this.averageRating = this.ratings.reduce((acc, item) => item.rating + acc, 0) / this.ratings.length;
    }
    next();
});

module.exports = mongoose.model('Course', courseSchema);
