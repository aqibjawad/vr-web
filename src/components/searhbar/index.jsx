import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    // Add your search logic here
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 20px',
    width: '100%'
  };

  const wrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: '12px' // Added gap between input and button
  };

  const inputContainerStyle = {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: '2px solid #e0e0e0',
    borderRadius: '8px', // Made fully rounded since it's now separate
    padding: '0 16px',
    height: '48px',
    transition: 'border-color 0.3s ease'
  };

  const iconStyle = {
    color: '#666666',
    marginRight: '12px'
  };

  const inputStyle = {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '16px',
    color: '#333333',
    width: '100%',
    height: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const buttonStyle = {
    backgroundColor: '#ff9500',
    color: 'white',
    border: 'none',
    borderRadius: '8px', // Made fully rounded since it's now separate
    padding: '0 24px',
    height: '48px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    flexShrink: 0 // Prevent button from shrinking
  };

  const [isHovered, setIsHovered] = useState(false);

  const hoverButtonStyle = {
    ...buttonStyle,
    backgroundColor: isHovered ? '#e6850a' : '#ff9500'
  };

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        <div style={inputContainerStyle}>
          <Search style={iconStyle} size={20} />
          <input
            type="text"
            placeholder="Enter search term..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            style={inputStyle}
          />
        </div>
        <button 
          style={hoverButtonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;