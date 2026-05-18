import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import SearchFilter from '../components/SearchFilter';
import RecommendationDisplay from '../components/RecommendationDisplay';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recommendation, setRecommendation] = useState(null);
    const [aiLoading, setAiLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
        } else if (user) {
            fetchEmployees();
        }
    }, [user, authLoading, navigate]);

    const fetchEmployees = async (searchTerm = '') => {
        try {
            const url = searchTerm 
                ? `${API_URL}/api/employees/search?department=${searchTerm}`
                : `${API_URL}/api/employees`;
            const res = await axios.get(url);
            setEmployees(res.data);
        } catch (err) {
            console.error('Failed to fetch employees', err);
        } finally {
            setLoading(false);
        }
    };

    const handleGetRecommendation = async (employeeId) => {
        setAiLoading(true);
        try {
            const res = await axios.post(`${API_URL}/api/ai/recommend`, { employeeId });
            setRecommendation(res.data.recommendation);
        } catch (err) {
            console.error('Failed to get recommendation', err);
            alert('Failed to get AI recommendation. Make sure the backend and OpenRouter API are working.');
        } finally {
            setAiLoading(false);
        }
    };

    if (authLoading || loading) return <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}><div className="loader"></div></div>;

    return (
        <div className="container">
            <h1 className="page-title">Employee Performance Analytics</h1>
            
            <div className="dashboard-grid">
                <div>
                    <EmployeeForm fetchEmployees={fetchEmployees} />
                </div>
                <div>
                    <SearchFilter onSearch={fetchEmployees} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.25rem' }}>Employee Roster</h2>
                        {employees.length > 1 && (
                            <button 
                                className="btn-primary" 
                                onClick={() => handleGetRecommendation(null)}
                                disabled={aiLoading}
                                style={{ background: 'linear-gradient(to right, #c084fc, #818cf8)', border: 'none', color: 'white' }}
                            >
                                {aiLoading ? 'Analyzing...' : 'Rank All Employees with AI'}
                            </button>
                        )}
                    </div>
                    {aiLoading && <div style={{ textAlign: 'center', margin: '2rem 0' }}><div className="loader"></div><div style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>AI is analyzing data...</div></div>}
                    {!aiLoading && <EmployeeList employees={employees} fetchEmployees={fetchEmployees} onGetRecommendation={handleGetRecommendation} />}
                </div>
            </div>

            <RecommendationDisplay recommendation={recommendation} onClose={() => setRecommendation(null)} />
        </div>
    );
};

export default Dashboard;
