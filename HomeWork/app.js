const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let employees = [];
let idCounter = 1;

// Create a new employee
app.post('/employees', (req, res) => {
    const { name, position } = req.body;
    if (!name || !position) {
        return res.status(400).json({ message: 'Name and position are required' });
    }
    const newEmployee = { id: idCounter++, name, position };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Read all employees
app.get('/employees', (req, res) => {
    res.json(employees);
});

// Read a single employee by ID
app.get('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
    const employee = employees.find(e => e.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    const { name, position } = req.body;
    if (name) employee.name = name;
    if (position) employee.position = position;
    res.json(employee);
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const index = employees.findIndex(e => e.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    employees.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
