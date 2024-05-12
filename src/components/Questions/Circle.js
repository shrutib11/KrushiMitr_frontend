import React from 'react';

const Circle = ({ username }) => {
    const initials = username.charAt(0).toUpperCase();
    const color = '#799b6e';

    return (
        <div className="circle" style={{ backgroundColor: color, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ffffff' }}>
            {initials}
        </div>
    );
};

export default Circle;