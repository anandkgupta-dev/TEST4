const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;

        if (performanceScore === undefined || performanceScore === null) {
            return res.status(400).json({ error: 'Performance score is required' });
        }

        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(400).json({ error: 'Employee with this email already exists' });
        }

        const employee = new Employee({ name, email, department, skills, performanceScore, experience });
        await employee.save();

        res.status(201).json({ message: 'Employee stored successfully', employee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        let query = {};
        if (department) {
            query.department = new RegExp(department, 'i');
        }
        
        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
