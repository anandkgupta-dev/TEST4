import React from 'react';
import { Sparkles, X } from 'lucide-react';

const RecommendationDisplay = ({ recommendation, onClose }) => {
    if (!recommendation) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000,
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', color: 'var(--text-secondary)' }}>
                    <X size={24} />
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                    <Sparkles style={{ color: '#c084fc' }} size={28} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        AI Insights & Recommendations
                    </h2>
                </div>

                <div className="ai-response">
                    {recommendation}
                </div>
            </div>
        </div>
    );
};

export default RecommendationDisplay;
