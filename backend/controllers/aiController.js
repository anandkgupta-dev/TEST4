const axios = require('axios');
const Employee = require('../models/Employee');

exports.getRecommendation = async (req, res) => {
    try {
        const { employeeId } = req.body;
        
        let employee;
        if (employeeId) {
            employee = await Employee.findById(employeeId);
            if (!employee) return res.status(404).json({ error: 'Employee not found' });
        } else {
            // Or get all if multiple
            employee = await Employee.find();
        }

        const prompt = `
        You are an expert HR AI assistant. Analyze the following employee data and provide:
        1. Promotion Recommendation
        2. Employee Ranking (if multiple)
        3. Training Suggestions based on missing/current skills
        4. Performance Feedback
        
        Employee Data: ${JSON.stringify(employee)}
        
        Please format the output in Markdown with clear sections.
        `;

        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'openai/gpt-3.5-turbo', // Or a compatible model available in OpenRouter
                messages: [{ role: 'user', content: prompt }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5000',
                    'Content-Type': 'application/json'
                }
            }
        );

        res.status(200).json({ recommendation: response.data.choices[0].message.content });

    } catch (err) {
        console.error("AI Error:", err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Failed to generate recommendation' });
    }
};
