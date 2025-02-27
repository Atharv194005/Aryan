const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Enrollment must belong to a user']
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: [true, 'Enrollment must belong to a course']
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completionDate: {
        type: Date
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    amount: {
        type: Number,
        required: [true, 'Enrollment must have a payment amount']
    }
});

// Populate user and course details when querying
enrollmentSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: 'name email phone'
    }).populate({
        path: 'course',
        select: 'name price imageUrl category'
    });
    next();
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
