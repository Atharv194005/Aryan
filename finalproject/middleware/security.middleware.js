const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

// Rate limiting
const limiter = rateLimit({
    max: 100, // limit each IP to 100 requests per windowMs
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});

// Security middleware configuration
const configSecurity = (app) => {
    // Set security HTTP headers
    app.use(helmet());

    // Rate limiting
    app.use('/api', limiter);

    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Data sanitization against XSS
    app.use(xss());

    // Prevent parameter pollution
    app.use(hpp({
        whitelist: [
            'duration',
            'price',
            'level',
            'category'
        ]
    }));

    // CORS configuration
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'GET, POST, PUT, DELETE, PATCH, OPTIONS'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        );
        next();
    });
};

module.exports = configSecurity;
