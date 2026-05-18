const Employee = require('../models/Employee');

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, department, skills, performanceScore, experience } = req.body;

        if (performanceScore === undefined || performanceScore === null) {
            return res.status(400).json({ error: 'Performance score is required' });
        }

        const existingEmployee = await Employee.findOne({ email, user: req.user.id });
        if (existingEmployee) {
            return res.status(400).json({ error: 'You have already added an employee with this email' });
        }

        const employee = new Employee({ user: req.user.id, name, email, department, skills, performanceScore, experience });
        await employee.save();

        res.status(201).json({ message: 'Employee stored successfully', employee });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const { department } = req.query;
        let query = { user: req.user.id };
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
        const updatedEmployee = await Employee.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, req.body, { new: true });
        if (!updatedEmployee) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deleted) return res.status(404).json({ error: 'Employee not found' });
        res.status(200).json({ message: 'Employee removed successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
