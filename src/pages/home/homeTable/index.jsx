import React, { useState } from 'react';

const ArtGalleryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMedium, setSelectedMedium] = useState('');

  const categories = [
    'PAINTINGS',
    'DRAWINGS', 
    'PRINTS',
    'PHOTOGRAPHY',
    'LIMITED EDITIONS',
    'HANDICRAFTS',
    'SCULPTURES',
    'ARTISTIC GIFTS',
    'FRAMING',
    'MIXED MEDIA'
  ];

  const mediums = [
    'Oil Paint',
    'Acrylic Paint',
    'Charcoal',
    'Digital',
    'Ink',
    'Tempera'
  ];

  const mixedMediaTypes = [
    'Mosaic',
    'Collage',
    'Digital art'
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleMediumClick = (medium) => {
    setSelectedMedium(medium === selectedMedium ? '' : medium);
  };

  return (
    <div className="container-fluid" style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', padding: '20px' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="text-center mb-4">
            <h2 style={{ 
              color: '#ff9500', 
              fontFamily: 'Arial, sans-serif',
              fontSize: '24px',
              fontWeight: 'normal',
              letterSpacing: '2px',
              marginBottom: '30px'
            }}>
              SELECT YOUR CHOICE BY
            </h2>
          </div>
          <div style={{ 
            border: '3px solid #007bff', 
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            padding: '0'
          }}>
            <div className="row" style={{ 
              backgroundColor: '#333', 
              margin: '0',
              borderBottom: '2px solid #007bff'
            }}>
              <div className="col-2 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>PRODUCTS</span>
              </div>
              <div className="col-2 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>ARTISTS</span>
              </div>
              <div className="col-2 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>PRICE IN USD</span>
              </div>
              <div className="col-2 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>SIZE IN CM</span>
              </div>
              <div className="col-1 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>COLOR</span>
              </div>
              <div className="col-1 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>STYLE</span>
              </div>
              <div className="col-1 p-3 text-center" style={{ borderRight: '1px solid #555' }}>
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>MEDIUM</span>
              </div>
              <div className="col-1 p-3 text-center">
                <span style={{ color: '#ff4444', fontSize: '14px', fontWeight: 'bold' }}>SUBJECT</span>
              </div>
            </div>

            <div className="row" style={{ margin: '0', minHeight: '400px' }}>
              <div className="col-2 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 15px' }}>
                  {categories.map((category, index) => (
                    <div 
                      key={index}
                      className="mb-3"
                      style={{ 
                        cursor: 'pointer',
                        padding: '8px 0',
                        color: selectedCategory === category ? '#007bff' : '#ffffff',
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif',
                        transition: 'color 0.3s'
                      }}
                      onClick={() => handleCategoryClick(category)}
                      onMouseEnter={(e) => e.target.style.color = '#007bff'}
                      onMouseLeave={(e) => e.target.style.color = selectedCategory === category ? '#007bff' : '#ffffff'}
                    >
                      {category}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-2 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 15px' }}>
                  
                </div>
              </div>

              <div className="col-2 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 15px' }}>
                  
                </div>
              </div>

              <div className="col-2 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 15px' }}>
                  
                </div>
              </div>

              <div className="col-1 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 10px' }}>
                  
                </div>
              </div>

              <div className="col-1 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 10px' }}>
                  
                </div>
              </div>

              <div className="col-1 p-0" style={{ borderRight: '1px solid #555' }}>
                <div style={{ padding: '20px 10px' }}>
                  {mediums.map((medium, index) => (
                    <div 
                      key={index}
                      className="mb-3"
                      style={{ 
                        cursor: 'pointer',
                        padding: '5px 0',
                        color: selectedMedium === medium ? '#007bff' : '#ffffff',
                        fontSize: '12px',
                        fontFamily: 'Arial, sans-serif',
                        transition: 'color 0.3s'
                      }}
                      onClick={() => handleMediumClick(medium)}
                      onMouseEnter={(e) => e.target.style.color = '#007bff'}
                      onMouseLeave={(e) => e.target.style.color = selectedMedium === medium ? '#007bff' : '#ffffff'}
                    >
                      {medium}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-1 p-0">
                <div style={{ padding: '20px 10px' }}>
                  
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4" style={{ 
            border: '3px solid #007bff', 
            backgroundColor: '#2a2a2a',
            borderRadius: '8px',
            padding: '20px'
          }}>
            <div style={{ 
              color: '#ffffff', 
              fontSize: '16px', 
              fontFamily: 'Arial, sans-serif',
              marginBottom: '15px'
            }}>
              Mixed Media Types:
            </div>
            <div className="row">
              {mixedMediaTypes.map((type, index) => (
                <div key={index} className="col-4 mb-2">
                  <div style={{ 
                    color: '#ffffff', 
                    fontSize: '14px', 
                    fontFamily: 'Arial, sans-serif',
                    cursor: 'pointer',
                    padding: '8px 0'
                  }}>
                    {type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtGalleryFilter;