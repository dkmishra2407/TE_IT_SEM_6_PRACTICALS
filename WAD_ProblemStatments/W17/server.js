const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to get all employees
app.get('/api/employees', (req, res) => {
  try {
    const employeesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'employees.json'), 'utf8'));
    res.json(employeesData);
  } catch (error) {
    res.status(500).json({ error: 'Error reading employee data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 