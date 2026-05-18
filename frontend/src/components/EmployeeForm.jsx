import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = ({ fetchEmployees }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        skills: '',
        performanceScore: '',
        experience: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
                performanceScore: Number(formData.performanceScore),
                experience: Number(formData.experience)
            };

            await axios.post('http://localhost:5000/api/employees', payload);
            setFormData({ name: '', email: '', department: '', skills: '', performanceScore: '', experience: '' });
            if (fetchEmployees) fetchEmployees();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add employee');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel">
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Add Employee</h2>
            {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <input type="text" name="department" value={formData.department} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Skills (comma separated)</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Node.js, MongoDB" required />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                        <label>Performance Score (0-100)</label>
                        <input type="number" name="performanceScore" value={formData.performanceScore} onChange={handleChange} min="0" max="100" required />
                    </div>
                    <div className="form-group">
                        <label>Experience (Years)</label>
                        <input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" required />
                    </div>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Employee'}
                </button>
            </form>
        </div>
    );
};

export default EmployeeForm;
