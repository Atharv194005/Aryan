module.exports = {
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/tests/'
    ],
    coverageReporters: ['text', 'lcov', 'clover'],
    testMatch: [
        '**/tests/**/*.test.js'
    ],
    setupFiles: ['./tests/setup.js']
};
