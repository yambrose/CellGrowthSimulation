import React from 'react';

const MobileErrorPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Oops!</h1>
            <p>It looks like this application is not supported on mobile devices.</p>
            <p>Please use a desktop or laptop to access this application.</p>
        </div>
    );
};

export default MobileErrorPage;