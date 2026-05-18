import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchFilter = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div style={{ marginBottom: '2rem', position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
            <input 
                type="text" 
                placeholder="Search by Department..." 
                value={searchTerm}
                onChange={handleSearch}
                style={{ paddingLeft: '3rem' }}
            />
        </div>
    );
};

export default SearchFilter;
