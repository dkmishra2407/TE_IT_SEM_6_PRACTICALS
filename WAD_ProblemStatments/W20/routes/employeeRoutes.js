const express = require('express');
const router = express.Router();
const {
    createEmployee,
    getAllEmployees,
    updateEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

// Create a new employee
router.post('/', createEmployee);

router.get('/', getAllEmployees);

router.put('/:id', updateEmployee);

router.delete('/:id', deleteEmployee);

module.exports = router; 