const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: 'Course',
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completedModules: [{
        moduleId: {
            type: mongoose.Schema.ObjectId
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    certificate: {
        issued: {
            type: Boolean,
            default: false
        },
        issuedDate: Date,
        certificateUrl: String
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    },
    lastAccessedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
