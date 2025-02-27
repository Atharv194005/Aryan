const API_URL = 'http://localhost:5000/api';

const endpoints = {
    auth: {
        register: `${API_URL}/auth/register`,
        login: `${API_URL}/auth/login`
    },
    courses: {
        list: `${API_URL}/courses`,
        single: (id) => `${API_URL}/courses/${id}`,
        create: `${API_URL}/courses`,
        update: (id) => `${API_URL}/courses/${id}`,
        delete: (id) => `${API_URL}/courses/${id}`
    },
    enrollments: {
        list: `${API_URL}/enrollments`,
        myEnrollments: `${API_URL}/enrollments/my-enrollments`,
        create: `${API_URL}/enrollments`,
        updateStatus: (id) => `${API_URL}/enrollments/${id}`,
        updateProgress: (id) => `${API_URL}/enrollments/${id}/progress`
    },
    users: {
        list: `${API_URL}/users`,
        profile: `${API_URL}/users/profile`,
        updateProfile: `${API_URL}/users/profile`,
        updateRole: (id) => `${API_URL}/users/${id}/role`,
        delete: (id) => `${API_URL}/users/${id}`
    }
};
