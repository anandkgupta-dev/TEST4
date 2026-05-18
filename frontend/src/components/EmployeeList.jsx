import React from 'react';
import { Trash2, UserCircle, Target, Award, BrainCircuit } from 'lucide-react';
import axios from 'axios';

const EmployeeList = ({ employees, fetchEmployees, onGetRecommendation }) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/employees/${id}`);
            fetchEmployees();
        } catch (err) {
            console.error('Failed to delete employee', err);
        }
    };

    return (
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {employees.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    No employees found. Add one to get started.
                </div>
            ) : (
                employees.map(emp => (
                    <div key={emp._id} className="employee-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <UserCircle size={40} style={{ color: 'var(--primary-color)' }} />
                                <div>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{emp.name}</h3>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{emp.department}</div>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(emp._id)} style={{ color: 'var(--danger-color)', background: 'transparent' }} title="Delete">
                                <Trash2 size={20} />
                            </button>
                        </div>
                        
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                                <Award size={16} style={{ color: 'var(--success-color)' }} />
                                <span>Performance: <strong>{emp.performanceScore}/100</strong></span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                <Target size={16} style={{ color: '#f59e0b' }} />
                                <span>Experience: <strong>{emp.experience} yrs</strong></span>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>SKILLS</div>
                            <div className="skills-container">
                                {emp.skills.map((skill, i) => (
                                    <span key={i} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <button 
                            className="btn-primary" 
                            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary-color)', color: '#818cf8' }}
                            onClick={() => onGetRecommendation(emp._id)}
                        >
                            <BrainCircuit size={18} />
                            Get AI Insights
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default EmployeeList;
