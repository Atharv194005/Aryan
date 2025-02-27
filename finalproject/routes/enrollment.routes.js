const express = require('express');
const Enrollment = require('../models/enrollment.model');
const Course = require('../models/course.model');
const { protect } = require('./auth.routes');
const router = express.Router();

// Get all enrollments (Admin only)
router.get('/', protect, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view all enrollments'
            });
        }

        const enrollments = await Enrollment.find();
        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Get user's enrollments
router.get('/my-enrollments', protect, async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Create enrollment
router.post('/', protect, async (req, res) => {
    try {
        const course = await Course.findById(req.body.courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if user is already enrolled
        const existingEnrollment = await Enrollment.findOne({
            user: req.user._id,
            course: req.body.courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'You are already enrolled in this course'
            });
        }

        const enrollment = await Enrollment.create({
            user: req.user._id,
            course: req.body.courseId,
            amount: course.price
        });

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Update enrollment status
router.put('/:id', protect, async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Only admin or enrolled user can update
        if (req.user.role !== 'admin' && enrollment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this enrollment'
            });
        }

        enrollment.status = req.body.status;
        if (req.body.status === 'completed') {
            enrollment.completionDate = Date.now();
            enrollment.progress = 100;
        }

        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Update progress
router.put('/:id/progress', protect, async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        if (enrollment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this enrollment'
            });
        }

        enrollment.progress = req.body.progress;
        if (enrollment.progress === 100) {
            enrollment.status = 'completed';
            enrollment.completionDate = Date.now();
        }

        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
