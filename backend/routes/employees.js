const express = require('express');
const router = express.Router();
const { addEmployee, getEmployees, searchEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/search', authMiddleware, searchEmployees);
router.post('/', authMiddleware, addEmployee);
router.get('/', authMiddleware, getEmployees);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
